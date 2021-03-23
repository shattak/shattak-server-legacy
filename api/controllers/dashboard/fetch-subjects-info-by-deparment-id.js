const subjectsDB = require("../../models/education-structure/subjects");

require("../../models/education-structure/institutes");
require("../../models/education-structure/departments");
require("../../models/education-structure/courses");
require("../../models/education-structure/subjects");

exports.post_fetch_subjects_info_by_deparment_id = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_fetch_boards_info_with_id");
  console.log(req.body._departments_id);

  if (typeof req.body._departments_id === "undefined") {
    var query = {};
  } else {
    var query = {
      _departments_id: req.body._departments_id,
    };
  }

  subjectsDB
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
