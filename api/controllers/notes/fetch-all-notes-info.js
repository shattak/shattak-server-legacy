const notesDB = require("../../models/notes");

exports.get_fetch_all_notes_info = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_fetch_all_notes_info");
  notesDB
    .find({})
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
