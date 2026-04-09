const adminAuth=(req,res,next)=>{
    const token="xyz"
    const isadminAuth= token==="xyz";
    if(!isadminAuth){
        res.status(401).send("user not authourized")
    }else{
        next()
    }
}

module.exports={
    adminAuth,
}