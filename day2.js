function getData(){
    fetch("http://localhost:3000/quotes")
    .then(res=>{
        if(res.ok){
            return res.json()
            // print(res.json())
        }else{
            throw new Error("Not coming any data");
        }
    })
    .then(res=>console.log(res[0]))
}
// getData()

function crud_D(id){
    fetch(`http://localhost:3000/quotes/${id}`,{
        method:"DELETE"
    })
    .then(res=>{
        if (res.ok){
            console.log(`${id} is deleted`)
        }
    })

}
// crud_D(11)
function postData(id){
    fetch("http://localhost:3000/quotes",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            quote:"SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
            author:"Rahul",
            id:id
        })
    }).then(res=>{
        if (res.ok){
            console.log(`${id} is added in the API`)
        }
    }
    )
}
// postData(39)
let obj={"user":"Ram","age":22}
console.log(obj)
console.log(JSON.stringify(obj))
let obj2=JSON.stringify(obj)
print(obj2)
