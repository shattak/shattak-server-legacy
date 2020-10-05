exports.post_request_users_logout = (req,res,next)=>{
    console.log("[ DEBUG 10 ] request_users_logout");
    res.status(200).json({
        mag :"suc"
    })
    next()
}