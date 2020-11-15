const mongoose = require("mongoose");
const { Schema } = mongoose;

const institute = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  name: {
    type: String,
    unique: true,
    required : true,
  },
  _board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "board",
    required: true,
  },
});

module.exports = mongoose.model("institute", institute);
