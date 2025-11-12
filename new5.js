// let arr=[1,2,3,4,5,6]
// for(let i=0;i<=arr.length;i++){
//     console.log(arr[i])
// }
// for(let i of arr){
//     console.log(i)
// }
let fruits=["apple","orange","grapes","water melon","musk melon","banana","dragon fruit"]
let ul=document.getElementById("ul")
let text=document.getElementById("text")
// let li=document.createElement("li");

// li.textContent=fruits[0]
// ul.appendChild(li)
for(let i of fruits){
    let li=document.createElement("li");
    li.textContent=i
    ul.appendChild(li)
}
function addBtn(){
    if(text.value=="" || text.value==" "){
        alert("invalid input")
        return 
    }
    let li=document.createElement("li")
    li.textContent=text.value
    ul.appendChild(li)
    text.value="";
} 