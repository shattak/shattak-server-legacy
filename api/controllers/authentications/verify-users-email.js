/**
 * req   : email address
 * chake : if email is not register -> your email is not register
 * pass  : verifition link send -> chake your email inbox with sub: shattak verifition code for first_name last_name 
 * 
 **/


exports.post_verify_users_email = (req,res,next)=>{
    console.log("[ DEBUG 10 ] verify_users_email");
    res.status(200).json({
        mag :"suc"
    })
    next()
}