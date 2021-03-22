const notesDB = require("../../models/notes");
const jwt = require("jsonwebtoken");

exports.put_edit_notes_info_by_users = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "put_edit_notes_info_by_id");

  var token = JSON.stringify(req.headers.authorization.split(" ")[1]);
  token = token.slice(1, -1);
  var decoded = jwt.decode(token, { complete: true });
  console.log("[DEBUG 7]\t" + "user id " + decoded.payload._user_id);

  notesDB
    .find({
      _users_id: decoded.payload._user_id,
      _id: req.body._id,
    })
    .exec()
    .then((result) => {
      console.log(result.length);
      if (result.length === 1) {
        notesDB
          .findOneAndUpdate(
            { _id: req.body._id },
            {
              $set: {
                topic_name: req.body.topic_name,
                level: req.body.level,
                field: req.body.field,
              },
            },
            { runValidators: true }
          )
          .then((result1) => {
            return res.status(200).json({
              mag: "successfuly updated",
              result1,
              result
            });
          })
          .catch((errors) => {
            return next(errors);
          });
      } else {
        err = new Error("you have no authorizion");
        return next(err);
      }
    })
    .catch((error) => {
      return next(errors);
    });
};
