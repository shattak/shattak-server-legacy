const notesDB = require("../../models/notes");
require('../../models/education-structure/institutes');
require('../../models/education-structure/departments');
require('../../models/education-structure/courses');
require('../../models/education-structure/subjects');
require('../../models/users');



exports.get_fetch_all_notes_info = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_fetch_all_notes_info");
 
  let PageLimit = 6; 

  var pgnum = req.query.pg;

 var skiping = (pgnum - 1) * PageLimit;
 

  notesDB
    .find({})
    .sort({ _id: -1 })
    .skip(skiping)
    .limit(PageLimit)
    .populate({
      path: "_users_id",
      select: "users_name email",
    })
    .populate({
      path: "_institutes_id",
    })
    .populate({
      path: "_departments_id",
    })
    .populate({
      path: "_subjects_id",
    })

    .exec()
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((error) => {
      return next(error);
    });
};
