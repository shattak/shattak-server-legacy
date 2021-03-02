const followDB = require("../../models/follow");
const jwt = require("jsonwebtoken");

exports.post_users_followers = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "post_users_followers");


  followDB
    .find({
      _following_id : req.body._following_id
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
