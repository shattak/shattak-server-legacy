const coursesDB = require("../../models/education-structure/courses");

require('../../models/education-structure/institutes');
require('../../models/education-structure/departments');
require('../../models/education-structure/courses');
require('../../models/education-structure/subjects');

exports.post_fetch_course_info_with_id = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_fetch-course-info-with-id");
  console.log("req.body._institute_id == "+ req.body._institute_id );
  // console.log("req.body._institute_id == "+ req.params._institute_id );


  if (typeof req.body._institutes_id === "undefined") {
    var query = {};
  } else {
    var query = {
      _institutes_id : req.body._institutes_id,
    };
  }

  coursesDB
    .find(query)
    .populate({
      path: "_departments_id",
      select: "name",
    })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        result,
      });
    })
    .catch((error) => {
      return next(error);
    });
};
