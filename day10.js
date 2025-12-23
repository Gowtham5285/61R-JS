/*
 array methos in js 
 ------------------
 push()
 */
// let str="Hello World!..234"
// // console.log(str.match(/\d+/))
// // console.log(typeof null)
// let out=[...str.matchAll(/z/g)]
// console.log(out)

// Push - Mutable
// arr.push() will return the length of the array
// let a=[1,2,3,4,5]
// a.push(6)
// console.log(a)
// console.log(a.push(8))

// Pop - Mutable
//  It will return the removed item 
// console.log(a.pop())

// shift - Mutable
// It removes the element in the first onwards. There is no use of adding data in the shift.
// console.log(a.shift())
// console.log(a)

// unshift - Mutable
// It returns length of an array
// console.log(a.unshift(9))

// let a2=[7,8,9,0,[6,4],[222, [45,6]],[33,4]]
// let str="ram"
// Concat - Mutable
// Add the two arrays or more
// console.log(str.concat(a))


// Flat - Mutable
// in this we get the levels of the array
//  console.log(a2.flat(2))

// Slice
// let arr=["Ram","Shyam","Dham"]
// console.log(arr.slice(-2))

// Splice
// console.log(arr.splice(0,1,"Orange","raghav",{"age":20}))
// console.log(arr)

// console.log(arr.indexOf("ad"))

// console.log(arr.sort((a,b)=>a-b))

// Project details
// local, sessionStorage, json server-> public-->glitch 
// SQL,firebase

/*
static
register.html
login.html
Home.html
Contact.html
Cart.html
sucess.html

give me in a functional format.
 */

/**
 map()
 filter()
 reduce()
 forEach()
 arr.method(callback)
 function (element,index,array){}
 */

//  Map()
// it returns a new array
// // It has the call back with parameters (element, index, array)
// let arr = [1, 2, 3, 4, 5]
// let add = arr.map((ele, ind, arr) => {
//     return `3 X ${ele} = ${ele * 3}`
// })
// console.log(add)
// forEach()--> it doesn't return any new array
// arr.forEach((ele,ind,arr)=>{
//     console.log(ele)
// })
// let a = 10;
// let b = 20;

// [a, b] = [b, a]

// console.log(a)
// console.log(b)


// Filter
// it is condition based execution
// Return new array
let numbers = [1, 2, 3, 4, 5, 6];

let evenNumbers = numbers.filter(num => num % 2 === 0);

console.log(evenNumbers); // [2, 4, 6]

// Reduce()
// it returns the single value
// array.reduce((accumulator, currentValue, index, array) => {
//   return updatedAccumulator;
// }, initialValue);
let acc=numbers.reduce((acc,ele,ind,arr)=>{
    return acc+ele
})

console.log(acc)