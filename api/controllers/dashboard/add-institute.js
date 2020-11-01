const  instituteDB = require("../../models/institute")


exports.post_add_institute = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "post_add_institute ");


  const institute = new instituteDB({
    _id: mongoose.Types.ObjectId(),
    name :req.body.name,
    short_name: req.body.short_name
  })

  institute
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
