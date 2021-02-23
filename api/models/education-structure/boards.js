const mongoose = require("mongoose");
const { Schema } = mongoose;

const boards = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  created_at: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    unique : true,
    required: true
  },
});

module.exports = mongoose.model("boards", boards);