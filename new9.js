let btns=document.getElementsByClassName("btn")
let display=document.getElementById("display")
let str=""
for(let i of btns){
    i.onclick=function(){
        if(i.textContent=="⌫"){
            str=str.substring(0,str.length-1)
            
        }
        else if(i.textContent=="C"){
            str=""
            
        }
        else if(i.textContent=="="){
            str=eval(str)
            
        }
        else{
            str+=i.textContent;
        }
        if(str=="")
        {
            display.textContent="0"
        }
        else{
            display.textContent=str
        }
        
    }
}