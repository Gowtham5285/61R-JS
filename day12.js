/**
 * call(), apply() and bind()
 * these three methods are used to control the values of "this" inside the function
 * functionName().call(thisarg,arg, ....)
 * functionName().apply(thisarg,[arg, ....])
 * let bind=functionName().bind(thisarg,arg, ....) and bind()
 * 
 */
document.querySelector(".main-container").addEventListener("click",()=>{
    console.log("Main container started")
},true)
document.querySelector(".sub-container").addEventListener("click",()=>{
    console.log("Sub container started")
},{once:true})
document.querySelector(".child-container").addEventListener("click",()=>{
    console.log("Child container called")
},true)
document.querySelector("button").addEventListener("click",()=>{
    console.log("Button called")
},true)

let stu={
    "name":"Ram",
    "age":2020
}
function showData(loc){
    console.log(this.age,this.name,loc)
}
showData.call(stu,"Hyd")
showData.apply(stu,["abc"])
let a=showData.bind(stu,"ramana")
a()