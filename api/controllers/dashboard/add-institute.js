const institutesDB = require("../../models/education-structure/institutes");

exports.post_add_institute = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "post_add_institute ");

  

  const institutes = new institutesDB({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    _boards_id: req.body._boards_id,
  });

  institutes
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

