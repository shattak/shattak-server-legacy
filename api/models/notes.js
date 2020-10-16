const mongoose = require("mongoose");

const notes = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  _users_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  topic_name: {
    type: String,
  },
  subject_name: {
    type: String,
  },
  tag: [
    {
      type: String,
    },
  ],
  institute: {
    type: String,
  },
  category: {
    level: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
  },
  files: [
    {
      type: String,
      required: true,
    },
  ],
  notes_verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("notes", notes);
