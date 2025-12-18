/* 
str methods in js
-----------------
charAt(index)
charCodeAt(index)
at(index)
concat(str1,str2,...,strN)
includes(searchString, position)
indexOf(searchValue, fromIndex)
lastIndexOf(seachValue, fromIndex)
match(regex)
matchAll(regex)
padStart(targetLength, padString)
padEnd(targetLength, padString)
replace(searchValue, replaceValue)
replaceAll(searchValue, replaceValue)
search(index)
slice(start,end)
substring(start, end)
substr(start, length)(Deprecated)
split(seperator, limit)
startsWith(searchString, position)
endsWith(searchstring, length)
toLowerCase()/toUpperCase()
trim()
trimStart()/trimEnd()
*/
// let str="Ramana"
// let str2="Raghav"
// console.log(str.charAt(3)) // It cannot access the -ve values
// console.log(str.charCodeAt(4))// It will gives you the ascii character values
// console.log(str.at(-2))//it will give the values of an index
// console.log(str.concat(" ",str2))// concats the strings
// console.log(str.includes("a",3))// Checks if the given character is in the str with an index value also
// console.log(str2.lastIndexOf("a",5))// checks the last index value of the given char whivh gives index if it's not there gives you -1

// console.log(str.match(/n/)) // gives you details related to the char
// let str3=str2.matchAll(/n/g)
// console.log(str3)
// let num="91"
// console.log(num.padStart(3,"V"))
// console.log(num.padEnd(5,"."))

let str="Roverrr"
let str2="ram ran"
console.log(str.replace("R","r"))
console.log(str.replaceAll("r","R"))
console.log(str.slice(0,5))
console.log(str.substring(0,4))
console.log(str.substr(1,3))
console.log(str2.split(" "))
console.log(str2.startsWith("r",0))
console.log(str2.endsWith("r",0))