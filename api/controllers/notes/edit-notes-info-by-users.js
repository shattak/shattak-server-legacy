const notesDB = require("../../models/notes");

exports.put_edit_notes_info_by_users = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "put_edit_notes_info_by_id");

  notesDB.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        location: req.bodylocation,
        caption: req.body.caption,
        link: req.body.link,
        reference: req.body.reference,
      },
    },{ runValidators: true }
  )  .then((result) => {
    console.log(result);
    res.status(200).json({
        mag: "put_edit_notes_info_by_id",
      });
  })
  .catch((errors) => {
    console.log(errors);
  });




};
