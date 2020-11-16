const coursesDB = require("../../models/education-structure/courses");
const departmentsDB = require("../../models/education-structure/departments");
const institutesDB = require("../../models/education-structure/institutes");

exports.post_add_course = (req, res, next) => {
  console.log("[DEBUG 10]\t" + " add courses ");

  departmentsDB
    .find({ _id: req.body._departments_id })
    .then((departmentsDBresult) => {
      console.log(departmentsDBresult);
      institutesDB
        .find({ _id: req.body._institutes_id })
        .then((institutesDBresult) => {
          console.log(institutesDBresult);
          console.log(
            departmentsDBresult[0]._boards_id +
              " === " +
              institutesDBresult[0]._boards_id
          );

          if (
            JSON.stringify(departmentsDBresult[0]._boards_id) ===
              JSON.stringify(institutesDBresult[0]._boards_id) &&
            departmentsDBresult.length > 0 &&
            institutesDBresult.length > 0
          ) {
            const courses = new coursesDB({
              _id: mongoose.Types.ObjectId(),
              _institutes_id: req.body._institutes_id,
              _departments_id: req.body._departments_id,
              _boards_id: institutesDBresult[0]._boards_id,
            });
            courses
              .save()
              .then((result) => {
                res.status(200).json({
                  result,
                });
              })
              .catch((error) => {
                next(error);
              });
          } else {
            err = new Error(
              departmentsDBresult[0]._boards_id +
                " " +
                institutesDBresult[0]._boards_id +
                " Bord is not same for institutes and department"
            );

            return next(err);
          }
        })
        .catch((error) => {
          return next(error);
        });
    })
    .catch((error) => {
      return next(error);
    });
};
