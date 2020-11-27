const notesDB = require("../../models/notes");

exports.post_fetch_notes_by_id = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "post_fetch_notes_by_id");

  console.log(">>>>>>>>>>>"+ req.body._subjects_id);

  if (typeof req.body._subjects_id === "undefined" ){
    return next()
  }else{
      
  notesDB
    .find({
        _subjects_id : req.body._subjects_id
    })
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


}
};
