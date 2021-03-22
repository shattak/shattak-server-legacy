const mongoose = require("mongoose");

const notes_downloads = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  _users_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  _notes_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "notes",
    required: true,
  },
});

module.exports = mongoose.model("notes_downloads", notes_downloads);
