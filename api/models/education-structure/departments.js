const mongoose = require("mongoose");
const { Schema } = mongoose;

const departments = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model("departments", departments);

