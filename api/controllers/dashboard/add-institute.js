const instituteDB = require("../../models/education-structure/institutes");

exports.post_add_institute = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "post_add_institute ");

  

  const institute = new instituteDB({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    _board_id: req.body._board_id,
    _department_id: req.body._department_id,
  });

  institute
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

// {
//   department: [
//     {
//       _department_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "department",
//       },
//     },
//   ],

// }
