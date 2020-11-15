const  departmentDB = require("../../models/education-structure/department")


exports.post_add_department = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "post_add_institute ");


  const department = new departmentDB({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    _boards_id: req.body._boards_id

  })
  
  department
    .save()
    .then((result) =>{
        res.status(200).json({
            result
        });
    })
    .catch((error)=>{
        next(error)
    })
};

