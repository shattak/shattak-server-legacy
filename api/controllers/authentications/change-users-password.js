exports.put_change_users_password = (req,res,next)=>{
    console.log("[ DEBUG 10 ] change_users_password"); 
    res.status(200).json({
        mag :"suc"
    })
    next()
}