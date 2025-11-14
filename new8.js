let table = document.getElementById("table")
let username = document.getElementById("username")
let age = document.getElementById("age")
let city = document.getElementById("city")
let arr = JSON.parse(localStorage.getItem("data"));
let del=document.getElementById("del")
// console.log(arr)

function createTableHeader() {
    let tr = document.createElement("tr")
    table.appendChild(tr)
    let th1 = document.createElement("th")
    th1.textContent = "UserName"
    tr.appendChild(th1)
    let th2 = document.createElement("th")
    th2.textContent = "Age"
    tr.appendChild(th2)
    let th3 = document.createElement("th")
    th3.textContent = "City"
    tr.appendChild(th3)
}
createTableHeader()
for (let i of arr) {
    createTableData(i["username"], i["age"], i["city"])
}

function createTableData(username, age, city) {
    let tr = document.createElement("tr")
    table.appendChild(tr)

    let td1 = document.createElement("td")
    td1.textContent = username
    tr.appendChild(td1)

    let td2 = document.createElement("td")
    td2.textContent = age
    tr.appendChild(td2)

    let td3 = document.createElement("td")
    td3.textContent = city
    tr.appendChild(td3)
}

function addBtn() {
    if (username.value == "" || age.value == "" || city.value == "") {
        alert("Please enter the valid inputs");
        return
    }
    let newData = {
        "username": username.value,
        "age": age.value,
        "city": city.value
    }
    arr.push(newData)
    localStorage.setItem("data", JSON.stringify(arr))
    // console.log(arr)
    createTableData(username.value, age.value, city.value)
    username.value = "";
    age.value = "";
    city.value = "";
}

function deleteBtn(){
    if(del.value==""){
        alert("Please Enter the value to delete")
        return
    }
    let indexValue;
    for(let i of arr){
        if(i["username"]==del.value){
            indexValue=arr.indexOf(i)
        }
    }
    if(indexValue==undefined){
        alert("Username is not found")
        del.value=""
        return
    }
    arr.splice(indexValue,1)
    localStorage.setItem("data",JSON.stringify(arr))
    table.textContent="";
    createTableHeader();
    for(let i of arr){
        createTableData(i["username"],i["age"],i["city"])
    }
    del.value=""
    
}
