// Hoisting
// let, var, const , named functions
//  console.log(a)
// var a=20;
abc()

console.log(a)
var a=20
function abc(){
    var c=35;
    console.log(c)
    console.log("Hello World!")
}
let c=function(){
    console.log("Hii")
}
c()