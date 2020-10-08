/**
 *
 * req      users id
 * res      users info
 *
 */

const usersDB = require("../../models/users");

exports.get_fetch_users_info_by_id = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_fetch_users_info");

  usersDB
    .find({
      _id: req.body._users_id,
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
