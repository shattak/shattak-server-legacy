const mongoose = require("mongoose");
const { Schema } = mongoose;

const subjects = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  created_at: {
    type: Date,
    default: Date.now,
  },
  _departments_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
    required : true,
  },
  name: {
    type: String,
    required : true,
  },
  paper_code: {
    type: String,
    required : true,
  },
  syllabus: {
    type: String,
    required : true,
  },
});
 
subjects.index({ paper_code: 1, _departments_id: 1 }, { unique: true })

module.exports = mongoose.model("subjects", subjects);

