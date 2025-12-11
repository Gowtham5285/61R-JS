let container = document.getElementById("container")
function getData(){
fetch("http://localhost:3000/quotes")
.then(res=> res.json())
.then(res=>{
    // console.log(res)
    for(let item of res){
        let div = document.createElement("div")
        let h1 = document.createElement("h1")
        let h3=document.createElement("h3")
        let p = document.createElement("p")
        let btn=document.createElement("button")
        h1.textContent=item.id
        h3.textContent=item.author
        p.textContent=item.quote
        btn.textContent="Delete"
        div.append(h1,h3,p,btn)
        container.appendChild(div)

    }
})
}
getData()