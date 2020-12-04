const  departmentsDB = require("../../models/education-structure/departments")

require('../../models/education-structure/institutes');
require('../../models/education-structure/departments');
require('../../models/education-structure/courses');
require('../../models/education-structure/subjects');


exports.post_add_department = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "post_add_institute ");




  const departments = new departmentsDB({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    _boards_id: req.body._boards_id
  })
  
  departments
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

