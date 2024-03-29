/**
 * req      : email,password
 * chake    : if email is register
 * chake    : if email is verified
 * chake    : password is match
 * respons  : refresh token only access token
 */

const authenticationsDB = require("../../models/authentications");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.post_request_users_login = (req, res, next) => {
  console.log("[DEBUG 2]\t request_users_login");

  //CODE chake if email is registered
  authenticationsDB
    .find({ email: req.body.email })
    .populate({
      path: "_users_id",
      select: "_id users_name email",
    })
    .then((result) => {
      console.log("[DEBUG 3]\t" + result);
      //CODE chake if accoun exist 
      if (result.length == 0) {
        err = Error("Email is not registered")
        return next(err);
      } else {
        //CODE cahke if email is verified
        //FIXME  if it not verified it will be an error use "!" on if() block || use : if (!result[0].email_verified)
        if (result[0].email_verified) {
          console.log("Email NOT Verified");
          err = new Error("Email NOT Verified");
          err.status = 401;
          return next(err);
        } else {
          //CODE chake the passwordd matches or not
          bcrypt
            .compare(req.body.password, result[0].password)
            .then((passwd) => {
              console.log("[DEBUG 4]\t" + passwd);
              if (!passwd) {
                const err = new Error("password not match");
                err.status = 401;
                next(err);
              }

              //CODE responce JWT Access token and refreash token
              let payload = {
                email: result[0].email,
                _user_id: result[0]._users_id._id,
                users_name: result[0]._users_id.users_name,
              };

              let accessSignOptions = {
                issuer: "shattak",
                audience: "http://shattak.com",
                expiresIn: "10d",
              };
              let refreshSignOptions = {
                issuer: "shattak",
                audience: "http://shattak.com",
                expiresIn: "30d",
              };
              //CODE singing tokens
              try {
                const access = jwt.sign(
                  payload,
                  process.env.ACCESS,
                  accessSignOptions
                );
                const refresh = jwt.sign(
                  payload,
                  process.env.REFRESH,
                  refreshSignOptions
                );
                //CODE responce token and credentials
                res.status(200).json({
                  massage: "login succesfull",
                  access,
                  refresh,
                  _users_id: result[0]._users_id._id,
                  users_name: result[0]._users_id.users_name,
                });
              } catch (err) {
                console.log("[ERROR 10]\t" + err);
                err.status = 502;
                return next(err);
              }
            })
            .catch((error) => {
              console.log("[ERROR 104]\t" + error);
              error.status = 502;
              return next(error);
            });
        }
      }
    })
    .catch((error) => {
      console.log("[ERROR 96]\t" + error);
      error.status = 502;
      return next(error);
    });
};
