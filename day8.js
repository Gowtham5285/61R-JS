// Async and Await
// Await is a asynchronous item 
// async function abc(){
//     console.log("a")
//     console.log(await "b")
//     setTimeout(function(){
//         console.log("c")
//     })
//     console.log(await "d")
// }
// abc()
// async function API_fetch(){
//     let res=await fetch('https://dattebayo-api.onrender.com/characters')
//     let data=await res.json()
//     for (let i of data.characters){
//         console.log(i.name)
//     }
// }
// API_fetch()