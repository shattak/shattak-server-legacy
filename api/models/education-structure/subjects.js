const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjects = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  _department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "department",
    unique:true,
    required : true,
  },
  name: {
    type: String,
    required : true,
  },
  paper_code: {
    type: String,
    unique:true,
    required : true,
  },
  syllabus: {
    type: String,
    required : true,
  },
});

module.exports = mongoose.model("subjects", subjects);
