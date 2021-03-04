const usersDB = require("../../models/users");

exports.post_fetch_users_info_by_id = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_fetch_users_info");

  usersDB
    .find({
      _id: req.body.users_id,
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
