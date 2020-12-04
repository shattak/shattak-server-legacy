/**
 * req   : email address
 * chake : if email is not register -> your email is not register
 * pass  : verifition link send -> chake your email inbox with sub: shattak verifition code for first_name last_name
 *
 **/

const authenticationsDB = require("../../models/authentications");
const usersDB = require("../../models/users");

const nodemailer = require("../../helpers/nodemailer");


exports.post_verify_users_email = (req, res, next) => {
  var email = req.body.email;

  authenticationsDB
    .find({
      email: email,
    })
    .then((result) => {
      "use strict";
      console.log(result);
      if(result.length == 0){
        const err = new Error("email is not registeres") 
        err.status = 404
        return next(err)
      }


      if (result[0].email_verified ) {
        res.status().json({
          massage: "You are already verified",
        });
      } else {
        console.log("------------------==++++++++++++++");

        nodemailer(result[0].email)
     
      }
    })
    .catch((error) => {
      error.status = 404;
      next(error);
    });
};
