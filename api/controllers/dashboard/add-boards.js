const  boardsDB = require("../../models/education-structure/boards")


require('../../models/education-structure/institutes');
require('../../models/education-structure/departments');
require('../../models/education-structure/courses');
require('../../models/education-structure/subjects');


exports.post_add_boards = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "post_add_boards ");


  const boards = new boardsDB({
    _id  : mongoose.Types.ObjectId(),
    name : req.body.name,
  })
  
  boards
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

