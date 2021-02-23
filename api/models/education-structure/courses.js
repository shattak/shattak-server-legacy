const mongoose = require("mongoose");
const { Schema } = mongoose;

const courses = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  created_at: {
    type: Date,
    default: Date.now,
  },
  _institutes_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "institutes",
    required : true,
    unique: false
  },
  _departments_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
    required : true,
    unique: false
  },
  _boards_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "boards",
    required: true,
  },

});


courses.index({ _institutes_id: 1, _departments_id: 1 }, { unique: true })

module.exports = mongoose.model("courses", courses);