const subjectsDB = require("../../models/education-structure/subjects");

exports.post_add_subjects = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "post_add_institute ");

  const subjects = new subjectsDB({
    _id: mongoose.Types.ObjectId(),
    _department_id: req.body._department_id,
    name: req.body.name,
    paper_code: req.body.paper_code,
    syllabus: req.body.syllabus,
  });

  
  subjects
    .save()
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((error) => {
      next(error);
    });
};
