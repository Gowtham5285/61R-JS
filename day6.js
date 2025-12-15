/**
 Promise in js
 --------------
Phases
  1. .then() - it will return the resolve data- result
  2. .catch() - it will throw the rejected data- error
  3. .finally()- it will return the final message with resove or reject but message will return 

 */

console.log("a")
setTimeout(function(){
    console.log("b")
},1001)
function pro(){
    return new Promise(function(resolve,reject){
        resolve("d")
    })
}
pro().then((res)=>console.log(res))
console.log("c")

