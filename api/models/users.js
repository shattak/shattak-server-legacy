const mongoose = require("mongoose");

const users = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  users_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender:{
    type: String,
    enum: ["male","female","others"]
  },
  phone_number: {
    type: Number,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },


});

module.exports = mongoose.model("users", users);
