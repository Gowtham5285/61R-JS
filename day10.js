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
let a=[1,2,3,4,5]
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
let arr=["Ram","Shyam","Dham"]
// console.log(arr.slice(-2))

// Splice
// console.log(arr.splice(0,1,"Orange","raghav",{"age":20}))
// console.log(arr)

console.log(arr.indexOf("ad"))

console.log(arr.sort((a,b)=>a-b))