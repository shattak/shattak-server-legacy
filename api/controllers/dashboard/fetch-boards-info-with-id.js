const boardsDB = require("../../models/education-structure/boards");

exports.post_fetch_boards_info_with_id = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_fetch_boards_info_with_id");
  console.log(req.body._id);

  if (typeof req.body._id === "undefined") {
    var query = {};
  } else {
    var query = {
      _id: req.body._id,
    };
  }

  boardsDB
    .find(query)
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
