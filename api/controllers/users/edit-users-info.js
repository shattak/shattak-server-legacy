const usersDB = require("../../models/users");
const jwt = require("jsonwebtoken");

exports.put_edit_users_info = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "put_edit_users_info");
  var token = JSON.stringify(req.headers.authorization.split(" ")[1]);
  token = token.slice(1, -1);
  var decoded = jwt.decode(token, { complete: true });
  console.log("[DEBUG 7]\t" + "user id " + decoded.payload._user_id);

  usersDB
    .findOneAndUpdate(
      { _id: decoded.payload._user_id },
      {
        $set: {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          users_name: req.body.users_name,
          email: req.body.email,
          gender: req.body.gender, //["male","female","others"]
          phone_number: req.body.phone_number,
          date_of_birth: req.body.date_of_birth,
        },
      },
      { runValidators: true }
    )
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((error) => {
      return next(error);
    });
};
