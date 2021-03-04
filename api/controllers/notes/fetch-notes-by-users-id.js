const notesDB = require("../../models/notes");
require("../../models/education-structure/institutes");
require("../../models/education-structure/departments");
require("../../models/education-structure/courses");
require("../../models/education-structure/subjects");



exports.post_fetch_notes_by_users_id = (req, res, next) => {

  console.log("[DEBUG 10]\t" + "fetch-notes-by-users-id");
  notesDB
    .find({
        "_users_id" : req.body._users_id
    })
    .exec()
    .then((result) => {
      res.status(200).json({result});
    })
    .catch((error) => {
      return next(error);
    });
};
