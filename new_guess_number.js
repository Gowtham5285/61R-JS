let random=Math.ceil(Math.random()*100);
let input=document.getElementById("input");
let result=document.getElementById("result");
let chances=document.getElementById("chances");
let count=0;
console.log(random)
function guess(){
    if (input.value==random){
        result.textContent="Congrats. your guess is correct."
        result.style.color="green";
        chances.textContent="No of chances: "+count;
    }
    else if (input.value<random){
        result.textContent="Oops! Your guess is too low."
        result.style.color="orange";
        count++
    }
    else{
        result.textContent="Oops! Your guess is too high."
        result.style.color="red";
        count++
    }
}