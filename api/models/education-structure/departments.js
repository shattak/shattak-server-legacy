const mongoose = require("mongoose");
const { Schema } = mongoose;

const departments = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  created_at: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  _boards_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "boards",
    required: true
  },
});

departments.index({ name: 1, _boards_id: 1 }, { unique: true });

module.exports = mongoose.model("departments", departments);

