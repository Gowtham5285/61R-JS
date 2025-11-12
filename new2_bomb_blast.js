let count=10
let timer=document.getElementById("timer")
let image=document.getElementById("image")
let time=setInterval(function(){
    count--
    timer.textContent= "Time left: "+count
    if (count<=3){
        timer.style.color="red"
    }
    if(count==0){
        clearInterval(time)
        timer.textContent="Bomb Blasted"
        image.src="https://cdn.vectorstock.com/i/1000v/51/59/exploding-bomb-dynamic-explosion-vector-1165159.jpg"
    }
},1000)