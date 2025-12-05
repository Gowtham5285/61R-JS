// get elements
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const notes = document.getElementById("notes");
const themeToggle = document.getElementById("themeToggle");

// ---------------- LOCAL STORAGE SAVE ----------------
function saveData() {
    localStorage.setItem("tasks", taskList.innerHTML);
    localStorage.setItem("notes", notes.value);
    localStorage.setItem("theme", document.body.classList.contains("dark"));
}

// ---------------- LOAD LOCAL STORAGE ----------------
function loadData() {
    const savedTasks = localStorage.getItem("tasks");
    const savedNotes = localStorage.getItem("notes");
    const savedTheme = localStorage.getItem("theme");

    if (savedTasks) taskList.innerHTML = savedTasks;
    if (savedNotes) notes.value = savedNotes;

    if (savedTheme === "true") {
        document.body.classList.add("dark");
        themeToggle.textContent = "☀️";
    }
}

loadData();

// ---------------- ADD TASK ----------------
addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);
    taskInput.value = "";

    saveData();
});

// ---------------- TASK CLICK EVENTS ----------------
taskList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.classList.toggle("done");
    }

    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
    }

    saveData();
});

// ---------------- NOTES SAVE ----------------/* Premium Productivity Dashboard - Frontend only
   - Data is stored as JSON in localStorage under "prodash_data"
   - Features: tasks (objects), reorder (drag & drop), categories, priorities, due date, edit, pomodoro, goal, stats, sticky notes, markdown preview
*/

// ---------- Utils ----------
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2,8);
const nowISODate = (d=new Date()) => d.toISOString().slice(0,10);

// Basic markdown -> HTML (very small subset: **bold**, *italic*, - list)
function mdToHtml(md){
  if(!md) return '';
  let out = md
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>');
  // lists (lines starting with -)
  out = out.split('\n').map(line=>{
    if(line.trim().startsWith('- ')) return '<li>'+line.trim().slice(2)+'</li>';
    return '<p>'+line+'</p>';
  }).join('');
  // wrap consecutive <li> into <ul>
  out = out.replace(/(<p><\/p>)+/g,'');
  out = out.replace(/(?:<\/p>)(<li>)/g,'</p><ul>$1');
  out = out.replace(/(<li>.*<\/li>)(?!.*<li>)/g,'$1</ul>');
  // remove stray </ul> if not opened
  out = out.replace(/<\/ul><\/p>/g,'</ul>');
  return out;
}

// ---------- State ----------
const STORAGE_KEY = "prodash_data_v1";
let state = {
  tasks: [], // {id,title,category,priority,dueISO,done,createdAt,order}
  completedToday: 0,
  totalCompleted: 0,
  goal: {title:'', target:3, progress:0},
  stickies: [] // {id, text, color, x,y,w,h}
};

function loadState(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(raw){
    try{ state = JSON.parse(raw); }
    catch(e){ console.warn("bad state json",e); }
  }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); renderAll(); }

// ---------- Init UI refs ----------
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskCategory = document.getElementById('taskCategory');
const taskDue = document.getElementById('taskDue');
const taskPriority = document.getElementById('taskPriority');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');

const filterCategory = document.getElementById('filterCategory');
const filterPriority = document.getElementById('filterPriority');
const taskFilterText = document.getElementById('taskFilterText');

const statToday = document.getElementById('statToday');
const statTotal = document.getElementById('statTotal');
const statPct = document.getElementById('statPct');

const mdInput = document.getElementById('mdInput');
const mdPreview = document.getElementById('mdPreview');

const dailyGoalInput = document.getElementById('dailyGoalInput');
const goalTarget = document.getElementById('goalTarget');
const goalProgressBar = document.getElementById('goalProgressBar');
const goalCheck = document.getElementById('goalCheck');
const goalReset = document.getElementById('goalReset');

const workMin = document.getElementById('workMin'), breakMin = document.getElementById('breakMin');
const pomTime = document.getElementById('pomTime'), pomStart = document.getElementById('pomStart'), pomPause = document.getElementById('pomPause'), pomReset = document.getElementById('pomReset');

const themeSelect = document.getElementById('themeSelect');
const addStickyBtn = document.getElementById('addStickyBtn');
const stickiesContainer = document.getElementById('stickiesContainer');

const exportBtn = document.getElementById('exportBtn'), importBtn = document.getElementById('importBtn');
const importModal = document.getElementById('importModal'), importArea = document.getElementById('importArea');
const runImport = document.getElementById('runImport'), cancelImport = document.getElementById('cancelImport');
const clearAllBtn = document.getElementById('clearAllBtn');

// ---------- Load & render ----------
loadState();
renderAll();
renderFilters();
renderStickies();
updateStats();

// ---------- Task functions ----------
function addTask(obj){
  const task = Object.assign({
    id: uid(), title:'', category:'Other', priority:'medium',
    dueISO: null, done:false, createdAt: new Date().toISOString(), order: state.tasks.length
  }, obj);
  state.tasks.push(task);
  saveState();
}
function updateTask(id, patch){
  const t = state.tasks.find(x=>x.id===id);
  if(!t) return;
  Object.assign(t, patch);
  saveState();
}
function deleteTask(id){
  state.tasks = state.tasks.filter(x=>x.id!==id);
  saveState();
}
function completeTask(id){
  const t = state.tasks.find(x=>x.id===id);
  if(!t || t.done) return;
  t.done = true;
  state.completedToday = (state.completedToday||0)+1;
  state.totalCompleted = (state.totalCompleted||0)+1;
  saveState();
}
function uncompleteTask(id){
  const t = state.tasks.find(x=>x.id===id);
  if(!t || !t.done) return;
  t.done = false;
  saveState();
}

// ---------- Render functions ----------
function renderAll(){
  renderTasks();
  renderFilters();
  updateStats();
  renderGoal();
  renderStickies();
  mdPreview.innerHTML = mdToHtml(mdInput.value);
}

function renderTasks(){
  // sort by order
  state.tasks.sort((a,b)=> (a.order||0)-(b.order||0));
  // apply filters
  const filterCat = filterCategory.value || 'all';
  const filterPri = filterPriority.value || 'all';
  const text = (taskFilterText.value||'').toLowerCase();

  taskList.innerHTML = '';
  state.tasks.forEach(task=>{
    if(filterCat!=='all' && task.category!==filterCat) return;
    if(filterPri!=='all' && task.priority!==filterPri) return;
    if(text && !(task.title||'').toLowerCase().includes(text)) return;

    const li = document.createElement('li');
    li.className = 'task-item';
    li.draggable = true;
    li.dataset.id = task.id;

    // due soon highlight
    if(task.dueISO){
      const due = new Date(task.dueISO + 'T23:59:59');
      const diff = (due - new Date())/ (1000*60*60);
      if(diff <= 24 && diff >= -24) li.classList.add('due-soon');
    }

    if(task.done) li.classList.add('done');

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" class="chk" ${task.done ? 'checked' : ''}/>
        <div style="min-width:0">
          <span class="title">${escapeHtml(task.title)}</span>
          <div class="small task-meta">
            <span class="badge ${task.priority}">${task.priority}</span>
            <span>${task.category}</span>
            <span>${task.dueISO ? dateLabel(task.dueISO) : ''}</span>
          </div>
        </div>
      </div>
      <div class="task-actions">
        <button class="icon-btn edit">Edit</button>
        <button class="icon-btn del">Delete</button>
      </div>
    `;

    // events
    li.querySelector('.chk').addEventListener('change', e=>{
      if(e.target.checked) completeTask(task.id); else updateTask(task.id,{done:false});
      renderAll();
    });
    li.querySelector('.edit').addEventListener('click', ()=> openEditPrompt(task));
    li.querySelector('.del').addEventListener('click', ()=> { deleteTask(task.id); });

    // drag events
    li.addEventListener('dragstart', (ev)=>{
      li.classList.add('dragging');
      ev.dataTransfer.setData('text/plain', task.id);
    });
    li.addEventListener('dragend', ()=>{ li.classList.remove('dragging'); saveState(); });

    li.addEventListener('dragover', ev=> ev.preventDefault());
    li.addEventListener('drop', ev=>{
      ev.preventDefault();
      const fromId = ev.dataTransfer.getData('text/plain');
      const toId = task.id;
      reorderTasks(fromId,toId);
    });

    // double click to edit title inline
    li.querySelector('.title').addEventListener('dblclick', e=>{
      const span = e.target;
      const input = document.createElement('input');
      input.value = task.title;
      input.style.width = '100%';
      span.replaceWith(input);
      input.focus();
      input.addEventListener('blur', ()=>{
        updateTask(task.id,{title:input.value});
      });
      input.addEventListener('keydown', ke=>{
        if(ke.key==='Enter') input.blur();
      });
    });

    taskList.appendChild(li);
  });
}

// helpers
function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function dateLabel(iso){ if(!iso) return ''; const d = new Date(iso); return d.toLocaleDateString(); }

function reorderTasks(fromId, toId){
  const fromIndex = state.tasks.findIndex(x=>x.id===fromId);
  const toIndex = state.tasks.findIndex(x=>x.id===toId);
  if(fromIndex<0 || toIndex<0) return;
  const [item] = state.tasks.splice(fromIndex,1);
  state.tasks.splice(toIndex,0,item);
  // reassign order
  state.tasks.forEach((t,i)=> t.order = i);
  saveState();
}

// ---------- Filters rendering ----------
function renderFilters(){
  // categories
  const categories = Array.from(new Set(state.tasks.map(t=>t.category).concat(['Work','Personal','Study','Other'])));
  filterCategory.innerHTML = '<option value="all">All categories</option>'+categories.map(c=>`<option value="${c}">${c}</option>`).join('');
}

// ---------- Edit prompt (simple) ----------
function openEditPrompt(task){
  const newTitle = prompt("Edit title", task.title);
  if(newTitle===null) return;
  const newCat = prompt("Category", task.category) || task.category;
  const newDue = prompt("Due date (YYYY-MM-DD)", task.dueISO || '') || null;
  const newPri = prompt("Priority (low,medium,high)", task.priority) || task.priority;
  updateTask(task.id, {title:newTitle,category:newCat,dueISO:newDue,priority:newPri});
}

// ---------- Form submit ----------
taskForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  addTask({
    title: taskTitle.value.trim(),
    category: taskCategory.value,
    dueISO: taskDue.value ? taskDue.value : null,
    priority: taskPriority.value
  });
  // animate
  taskTitle.value=''; taskDue.value=''; renderAll();
});

// ---------- Search / filter events ----------
taskFilterText.addEventListener('input', renderAll);
filterCategory.addEventListener('change', renderAll);
filterPriority.addEventListener('change', renderAll);

// ---------- Stats & Goal ----------
function updateStats(){
  const today = new Date().toISOString().slice(0,10);
  // completed today: tasks that have done true and createdAt same day? we'll use state.completedToday for manual increments
  statToday.textContent = state.completedToday || 0;
  statTotal.textContent = state.totalCompleted || 0;
  const totalTasks = state.tasks.length||0;
  const done = state.tasks.filter(t=>t.done).length;
  statPct.textContent = totalTasks ? Math.round(done/totalTasks*100)+'%' : '0%';
}

function renderGoal(){
  dailyGoalInput.value = state.goal.title || '';
  goalTarget.value = state.goal.target || 3;
  const pct = Math.min(100, Math.round((state.goal.progress / (state.goal.target||1)) * 100));
  goalProgressBar.style.width = pct + '%';
}

goalCheck.addEventListener('click', ()=>{
  state.goal.progress = (state.goal.progress||0)+1;
  if(state.goal.progress > (state.goal.target||1)) state.goal.progress = state.goal.target;
  saveState();
});
goalReset.addEventListener('click', ()=>{ state.goal.progress = 0; saveState(); });

dailyGoalInput.addEventListener('input', ()=>{ state.goal.title = dailyGoalInput.value; saveState(); });
goalTarget.addEventListener('change', ()=>{ state.goal.target = Number(goalTarget.value)||1; saveState(); });

// ---------- Markdown notes ----------
mdInput.addEventListener('input', ()=>{
  mdPreview.innerHTML = mdToHtml(mdInput.value);
  // persist small note
  state.md = mdInput.value;
  saveState();
});
if(state.md) mdInput.value = state.md;

// ---------- Sticky notes ----------
function createSticky(opt){
  const s = Object.assign({id:uid(), text:'', color:'#fff7b2', x:0,y:0,w:220,h:140}, opt);
  state.stickies.push(s);
  saveState();
}
function renderStickies(){
  stickiesContainer.innerHTML = '';
  state.stickies.forEach(st=>{
    const div = document.createElement('div');
    div.className='sticky';
    div.style.width = (st.w||220)+'px';
    div.style.height = (st.h||140)+'px';
    div.style.background = st.color || '#fff7b2';
    div.innerHTML = `
      <div class="sticky-top">
        <strong>Note</strong>
        <div>
          <button class="del-sticky">✕</button>
        </div>
      </div>
      <textarea class="sticky-text">${escapeHtml(st.text)}</textarea>
    `;
    // delete
    div.querySelector('.del-sticky').addEventListener('click', ()=>{
      state.stickies = state.stickies.filter(x=>x.id!==st.id); saveState();
    });
    // text change
    const ta = div.querySelector('.sticky-text');
    ta.addEventListener('input', ()=>{ st.text = ta.value; saveState(); });
    // color palette simple: right click to cycle color
    div.addEventListener('contextmenu', e=>{
      e.preventDefault();
      const colors = ['#fff7b2','#ffd6cc','#ccf7ff','#d6f5d6','#f0f0f0'];
      const next = colors[(colors.indexOf(st.color || '#fff7b2')+1)%colors.length];
      st.color = next; saveState();
    });

    // drag by pointer (simple)
    div.style.position = 'relative';
    stickiesContainer.appendChild(div);
  });
}

// add sticky
addStickyBtn.addEventListener('click', ()=>{ createSticky({text:'New note'}); });

// ---------- Export / Import ----------
exportBtn.addEventListener('click', ()=>{
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'prodash_export.json'; a.click();
  URL.revokeObjectURL(url);
});
importBtn.addEventListener('click', ()=>{ importModal.classList.remove('hidden'); importArea.value=''; });
cancelImport.addEventListener('click', ()=> importModal.classList.add('hidden'));
runImport.addEventListener('click', ()=>{
  try{
    const parsed = JSON.parse(importArea.value);
    state = parsed; saveState(); importModal.classList.add('hidden');
  }catch(e){ alert('Invalid JSON'); }
});
clearAllBtn.addEventListener('click', ()=>{
  if(confirm('Clear all app data?')){ state = {tasks:[], completedToday:0, totalCompleted:0, goal:{title:'',target:3,progress:0}, stickies:[] }; saveState(); }
});

// ---------- Clear localStorage helper ----------
function clearAllLocal(){ localStorage.removeItem(STORAGE_KEY); state = {tasks:[], completedToday:0, totalCompleted:0, goal:{title:'',target:3,progress:0}, stickies:[]}; renderAll(); }

// ---------- Simple sound for pomodoro -->
function beep(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type='sine'; o.frequency.value = 880;
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    o.start();
    setTimeout(()=>{ g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02); o.stop(); ctx.close(); }, 500);
  }catch(e){ console.log('beep failed', e); }
}

// ---------- Pomodoro ----------
let pom = {running:false,work:true,remaining:25*60,timerId:null};
function renderPomTime(){
  const mm = Math.floor(pom.remaining/60).toString().padStart(2,'0');
  const ss = (pom.remaining%60).toString().padStart(2,'0');
  pomTime.textContent = `${mm}:${ss}`;
}
function pomTick(){
  if(pom.remaining<=0){
    beep();
    pom.work = !pom.work;
    pom.remaining = (pom.work ? Number(workMin.value) : Number(breakMin.value))*60;
    // continue running
  } else {
    pom.remaining -= 1;
  }
  renderPomTime();
}
pomStart.addEventListener('click', ()=>{
  if(pom.running) return;
  pom.running = true;
  if(!pom.timerId) pom.timerId = setInterval(pomTick, 1000);
});
pomPause.addEventListener('click', ()=>{
  pom.running = false; if(pom.timerId){ clearInterval(pom.timerId); pom.timerId = null; }
});
pomReset.addEventListener('click', ()=>{
  pom.running=false; if(pom.timerId){ clearInterval(pom.timerId); pom.timerId=null; }
  pom.work = true; pom.remaining = Number(workMin.value)*60; renderPomTime();
});
workMin.addEventListener('change', ()=>{ if(pom.work) pom.remaining = Number(workMin.value)*60; renderPomTime();});
breakMin.addEventListener('change', ()=>{ if(!pom.work) pom.remaining = Number(breakMin.value)*60; renderPomTime();});
pomReset.click(); // init

// ---------- utility: mark task as completed increments goal progress if needed ----------
function checkCompletedAndGoal(taskId){
  // if a task is completed manually, we already increment completedToday & totalCompleted in completeTask()
  // optionally also increment daily goal progress
  state.goal = state.goal || {title:'',target:3,progress:0};
  if(state.goal.progress < state.goal.target) {
    state.goal.progress++;
  }
  saveState();
}

// Watch for changes to tasks (save uses renderAll). Also store createdAt for completedToday tracking
// Hook into saveState to update stats
// saveState already calls renderAll

// ---------- small helpers ----------
function dateDiffDays(a,b){ return Math.round((new Date(a)-new Date(b))/(1000*60*60*24)); }

// ---------- Escape on load ----------
if(!state.goal) state.goal = {title:'',target:3,progress:0};
if(!state.stickies) state.stickies = [];
if(state.md) mdInput.value = state.md; mdPreview.innerHTML = mdToHtml(mdInput.value);

// ---------- Initial demo data if empty (optional) ----------
if(state.tasks.length===0){
  addTask({title:'Welcome to ProdDash — double click a title to edit inline', category:'Personal', priority:'medium'});
  addTask({title:'Add due dates to see due highlighting', category:'Work', dueISO: nowISODate(), priority:'high'});
  saveState();
}

// ---------- helper to persist periodically (in case of tab close) ----------
window.addEventListener('beforeunload', ()=> saveState());

// ---------- small utility: escape in sticky initial text rendering handled above ----------

// ---------- END ----------

notes.addEventListener("input", saveData);

// ---------------- THEME SWITCH ----------------
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeToggle.textContent = document.body.classList.contains("dark")
        ? "☀️"
        : "🌙";

    saveData();
});
