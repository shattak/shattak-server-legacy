const followDB = require("../../models/follow");
const jwt = require("jsonwebtoken");

exports.post_users_follow = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "post_users_follow");

  var token = JSON.stringify(req.headers.authorization.split(" ")[1]);
  token = token.slice(1, -1);
  var decoded = jwt.decode(token, { complete: true });

  console.log( req.body._following_id);
  const follow = new followDB({
    _id: mongoose.Types.ObjectId(),
    _follower_id : decoded.payload._user_id,
    _following_id : req.body._following_id,
  });

  follow
    .save()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((error) => {
      return next(error);
    });
};
