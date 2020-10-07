const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authentications = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  _users_id: {//
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
    unique: true
  },
  email: {//
    type: String,
    required: true,
    unique: true
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  password: {//
    type: String,
    required: true,
  },
  
});
 
module.exports = mongoose.model("authentications", authentications);
