const notesDB = require("../../models/notes");
require("../../models/education-structure/institutes");
require("../../models/education-structure/departments");
require("../../models/education-structure/courses");
require("../../models/education-structure/subjects");

const jwt = require("jsonwebtoken");

exports.post_fetch_users_notes = (req, res, next) => {

  var token = JSON.stringify(req.headers.authorization.split(" ")[1]);
  token = token.slice(1, -1);
  var decoded = jwt.decode(token, { complete: true });

  console.log("[DEBUG 10]\t" + "post_fetch_users_notes");
  notesDB
    .find({
        "_users_id" : decoded.payload._user_id,
    })
    .exec()
    .then((result) => {
      res.status(200).json({result});
    })
    .catch((error) => {
      return next(error);
    });
};
