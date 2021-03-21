const notesDB = require("../../models/notes");
require("../../models/education-structure/institutes");
require("../../models/education-structure/departments");
require("../../models/education-structure/courses");
require("../../models/education-structure/subjects");



exports.post_fetch_notes_by_notes_id = (req, res, next) => {

  console.log("[DEBUG 10]\t" + "post_fetch_notes_by_notes_id");
  notesDB
    .find({
        "_id" : req.body._id
    })
    .exec()
    .then((result) => {
      res.status(200).json({result});
    })
    .catch((error) => {
      return next(error);
    });
};
