const mongoose = require("mongoose");
const { Schema } = mongoose;

const course = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  

  _institute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "institute",
    required : true
  },
  _department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "department",
    required : true
  },
 
});

module.exports = mongoose.model("course", course);