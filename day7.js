function login(User, Password) {
    return new Promise((res, rej) => {
        if (User === "sudheer" && Password === 1234) {
            console.log("Login Sucessfully")
            res(true)
        } else {
            console.log("Not Matched Credentials")
            rej(false)
        }
    })
}
function booking(isTrue) {
    return new Promise(function (res, rej) {
        if (isTrue) {
            console.log("You booked a Samsung TV")
            res(true)
        } else {
            console.log("Not Booked a TV")
            rej(false)
        }
    })
}
function shipping(isTrue) {
    return new Promise((res, rej) => {
        if (isTrue) {
            console.log("Your order is Shipped")
            res(true)
        }
        else {
            console.log("Your order is not shipped")
            rej(false)
        }
    })
}
function delivered(isTrue) {
    return new Promise((res, rej) => {
        if (isTrue) {
            console.log("Order is Delivered")
            res("Samsung TV Delivered")
        }
        else {
            console.log("Not Delivered")
            rej("Falied Delivery")
        }
    })
}
login("sudheer", 1234)
    .then(res => booking(res))
    .then(res => shipping(res))
    .then(res => delivered(res))
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => console.log("Thank You visit Again"))



    async function abc(){
        let a=await login("sudheer",12345)
        console.log(a)
    }