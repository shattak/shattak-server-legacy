const followDB = require("../../models/follow");
const jwt = require("jsonwebtoken");

exports.post_users_following = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "post_users_following");

  followDB
    .find({
      _follower_id: req.body._follower_id,
    })
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((error) => {
      res.status(200).json({
        error,
      });
    });
};
