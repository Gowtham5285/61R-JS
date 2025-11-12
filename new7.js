let count=Number(localStorage.getItem("count"))
let display =document.getElementById("display")
display.textContent=count
function incbtn(){
    count++
    display.textContent=count
    localStorage.setItem("count",count)
}
function decbtn(){
    count--
    display.textContent=count
    localStorage.setItem("count",count)
}
function resetbtn(){
    count=0;
    display.textContent=count
    localStorage.setItem("count",count)
}