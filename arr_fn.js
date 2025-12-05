let upper=(a)=>{
     var res=""
    for(let i=0;i<a.length;i++){
        if (i===3){
            res+=a[i].toUpperCase()
        }
    }
    console.log(res)
}
upper("ramana")