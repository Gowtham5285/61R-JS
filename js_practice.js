function p_one(){
    return new Promise((res,rej)=>{
        if(false){
            res("p_one is called")
        }else{
            rej("p_one is rejected")
        }
    })
}
async function abc(){
    try{
        let aaa=await p_one()
        console.log(aaa)
    }
    catch(err){
        console.error(err)
    }
}
abc()