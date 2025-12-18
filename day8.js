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
let div = document.getElementById("div");

async function abc() {
    const url = 'https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'YOUR_API_KEY',
            'x-rapidapi-host': 'anime-db.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const result = await response.json();

        if (!result.data || !Array.isArray(result.data)) {
            console.error("Invalid data format:", result);
            return;
        }

        let ul = document.createElement("ul");

        result.data.forEach(i => {
            let li = document.createElement("li");
            li.innerHTML = `
                <h3>${i.title}</h3>
                <img src="${i.image}" width="150" />
            `;
            ul.appendChild(li);
        });

        div.appendChild(ul);

    } catch (error) {
        console.error("Error:", error.message);
    }
}

abc();
