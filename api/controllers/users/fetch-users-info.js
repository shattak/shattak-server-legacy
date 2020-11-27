/**
 *
 * req      users id
 * res      users info
 *
 */

const usersDB = require("../../models/users");
const jwt = require("jsonwebtoken");
exports.post_fetch_users_info = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_fetch_users_info");


  var token = JSON.stringify(req.headers.authorization.split(" ")[1]);
  token = token.slice(1, -1);
  var decoded = jwt.decode(token, { complete: true });

  usersDB
    .find({
      _id: decoded.payload._user_id,
    })
    .exec()
    .then((result) => {
      console.log("[DEBUG 14]\t" + JSON.stringify(result));
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({
        massage: error,
      });
    });
};

// exports.get_getUserInfo = (req, res) => {
//   console.log(" |4 Debug |    /profile/face -- rought ");
//   console.log(
//     " |6 Debug |  JSON.stringify(req.body) >>>" + JSON.stringify(req.body)
//   );
// };
