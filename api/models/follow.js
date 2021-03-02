const mongoose = require("mongoose");

const follow = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  created_at: {
    type: Date,
    default: Date.now,
  },
  _follower_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  _following_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

follow.index({ _follower_id: 1, _following_id: 1 }, { unique: true })


module.exports = mongoose.model("follow", follow);
