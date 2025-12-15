document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoItems = document.getElementById("todo-items");

    // Load todos when page loads
    Getdata();

    form.addEventListener("submit", addTask);

    function addTask(e) {
        e.preventDefault();

        const taskcontent = todoInput.value.trim();
        if (taskcontent === "") return;

        fetch("http://localhost:3000/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: taskcontent,
                completed: false
            })
        })
        .then(res => res.json())
        .then(() => {
            todoInput.value = "";
            // Getdata(); 
        })
        .catch(err => console.error(err));
    }

    function Getdata() {
        todoItems.innerHTML = "";

        fetch("http://localhost:3000/todo")
            .then(res => res.json())
            .then(data => {
                data.forEach(item => {
                    const li = document.createElement("li");
                    li.className = "task";

                    if (item.completed) {
                        li.classList.add("completed");
                    }

                    const p = document.createElement("p");
                    p.textContent = item.text;

                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";

                    deleteBtn.addEventListener("click", () => {
                        deleteTodo(item.id);
                    });

                    li.append(p, deleteBtn);
                    todoItems.appendChild(li);
                });
            })
            .catch(err => console.error(err));
    }

    function deleteTodo(id) {
        fetch(`http://localhost:3000/todo/${id}`, {
            method: "DELETE"
        }).then(() => Getdata());
    }
});
