const courseDB = require("../../models/education-structure/course");

exports.post_fetch_course_info_with_id = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_fetch-course-info-with-id");
  console.log("req.body._institute_id == "+ req.body._institute_id );
  // console.log("req.body._institute_id == "+ req.params._institute_id );


  if (typeof req.body._institute_id === "undefined") {
    var query = {};
  } else {
    var query = {
      _institute_id : req.body._institute_id,
    };
  }

  courseDB
    .find(query)
    .populate({
      path: "_department_id",
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
