const mongoose = require("mongoose");
const { Schema } = mongoose;

const institutes = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  created_at: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    unique: true,
    required : true,
  },
  _boards_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "boards",
    required: true,
  },
});

module.exports = mongoose.model("institutes", institutes);
