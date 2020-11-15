const courseDB = require("../../models/education-structure/course");
const departmentDB = require("../../models/education-structure/department");
const institutesDB = require("../../models/education-structure/institutes");

exports.post_add_course = (req, res, next) => {
  console.log("[DEBUG 10]\t" + " add course ");

  departmentDB
    .find({ _id: req.body._department_id })
    .then((departmentDBresult) => {
      // console.log(departmentDBresult);
      institutesDB
        .find({ _id: req.body._institute_id })
        .then((institutesDBresult) => {
          // console.log(institutesDBresult);
          // console.log(
          //   departmentDBresult[0]._boards_id +
          //     " === " +
          //     institutesDBresult[0]._boards_id
          // );

          if (
            departmentDBresult[0]._boards_id ===
              institutesDBresult[0]._boards_id &&
            departmentDBresult.length > 0 &&
            institutesDBresult.length > 0
          ) {
            const course = new courseDB({
              _id: mongoose.Types.ObjectId(),
              _institute_id: req.body._institute_id,
              _department_id: req.body._department_id,
            });
            course
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
            err = new Error("Bord is not for institutes and department");
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
