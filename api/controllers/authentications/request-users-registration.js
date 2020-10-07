/**
 *  req   : email,first_name, last_name, date_of_birth,password,
 *  chake : if age if less then 13 year -> your age is not elegeble for socal network
 *  chake : if email is registered -> alrady register user for gate password to reset password
 *  chake : if email register but is not verified -> email is register but not verified we have we have sented a verifition link
 *  pass  : if all abobe condition satiesfy add user and send email verifirion link -> user added successfullly pleace verrify email
 **/

//COMPLETE                                         


//CODE import dependences
const bcrypt = require("bcrypt");
const authenticationsDB = require("../../models/authentications");
const usersDB = require("../../models/users");

//CODE request and responce
exports.post_request_users_registration = (req, res, next) => {
  console.log("[DEBUG 15]\t" + "post_request_users_registration");
  console.log("[DEBUG 16]\t" + JSON.stringify(req.body));

  //CODE  check if date format is correct
  let date = Date.parse(req.body.date_of_birth);
  console.log("[DEBUG 22]\t" + date);
  if (isNaN(date)) {
    let err = new Error("date format is not acerptablr");
    err.status = 406;
    return next(err);
  } else {
    //CODE check if age is grate then 13
    let dob = new Date(req.body.date_of_birth);
    let today = new Date();
    console.log("[DEBUG 32]\t" + today + dob);
    let age = today.getFullYear() - dob.getFullYear();
    if (age < 13) {
      let err = new Error(
        "your age is not eligible in socal network minimum age limt is 13 year"
      );
      err.status = 406;
      return next(err);
    } else {
      //CODE check if email is alrady present authentications database
      authenticationsDB
        .find({
          email: req.body.email,
        })
        .then((result) => {
          console.log("[DEBUG 48]\t" + result.length);
          if (result.length) {
            let err = new Error(
              "email is alrady register use resolve-forgot-password if you forgot password"
            );
            err.status = 409;
            next(err);
          } else {
            //CODE hash the password unsing bcrypt
            bcrypt
              .hash(req.body.password, (saltRounds = 10))
              .then((hash) => {
                //CODE create users opject
                const users = new usersDB({
                  _id: mongoose.Types.ObjectId(),
                  users_name: Math.floor(Math.random() * 1000000) + Date.now(),
                  first_name: req.body.first_name,
                  last_name: req.body.last_name,
                  email: req.body.email,
                  date_of_birth: req.body.date_of_birth,
                });
                //CODE saveing users document in users
                users
                  .save()
                  .then((result) => {
                    if (result) {
                      console.log("[DEBUG 72]\t" + JSON.stringify(result));

                      //CODE create authentications opject
                      const authentications = new authenticationsDB({
                        _id: mongoose.Types.ObjectId(),
                        _users_id: result._id,
                        email: req.body.email,
                        date_of_birth: req.body.date_of_birth,
                        password:hash,
                      });

                      //CODE save authentications docment
                      authentications
                        .save()
                        .then((result1) => {
                          console.log("[DEBUG 87]\t" + result1);
                          res.status(201).json({
                            massage:
                              "users registration succesfull. Please verify your email address.",
                          });
                        })
                        .catch((error) => {
                          console.log("[ERROR 90]\t" + "");
                          error.status = 502;
                          return next(error);
                        });
                    }
                  })
                  .catch((error) => {
                    console.log("[ERROR 97]\t" + "");
                    error.status = 502;
                    return next(error);
                  });
              })
              .catch((error) => {        
              console.log("[ERROR 104]\t" + "");
              error.status = 502;
              return next(error);});
          }
        })
        .catch((error) => {
          console.log("[ERROR 104]\t" + "");
          error.status = 502;
          return next(error);
        });
    }
  }
};


