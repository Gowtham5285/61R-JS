
let seconds=0
let minutes=0
let display=document.getElementById("display")
function startBtn(){
    // console.log("clicked")
   intervialbyId= setInterval(function(){
        seconds++
        if (seconds==60){
            minutes+=1
            seconds=0
        }
        let min;
        let sec;
        if(minutes<10){
            min="0"+minutes
        }
        else{
            min=minutes;
        }
        if(seconds<10){
            sec="0"+seconds
        }
        else{
            sec=seconds
        }
        display.textContent=min+":"+sec
    },1000)
}
function stopBtn(){
    clearInterval(intervialbyId)
    intervialbyId=null
}
function resetBtn(){
    clearInterval(intervialbyId)
    intervialbyId=null
    seconds=0
    min=0
    display.textContent="0"+minutes+":"+"0"+seconds
}