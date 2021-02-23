const mongoose = require("mongoose");
const { Schema } = mongoose;

const notes = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  created_at: {
    type: Date,
    default: Date.now,
  },
  _users_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  _institutes_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "institutes",
  },
  _departments_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departments",
  },
  _subjects_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subjects",
  },
  institutes_name: {
    type: String,
  },
  departments_name: {
    type: String,
  },
  subjects_name: {
    type: String,
  },
  topic_name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
  },
  field: {
    type: String,
  },

  tag: [
    {
      type: String,
    },
  ],

  notes_verified: {
    type: Boolean,
    default: false,
  },

  files: [
    {
      fieldname: { type: String },
      originalname: { type: String },
      encoding: { type: String },
      mimetype: { type: String },
      size: { type: Number },
      bucket: { type: String },
      key: { type: String },
      acl: { type: String },
      contentType: { type: String },
      contentDisposition: { type: String, default: null },
      storageClass: { type: String },
      serverSideEncryption: { type: String, default: null },
      metadata: {
        fieldName: { type: String },
      },
    },
  ],
});

module.exports = mongoose.model("notes", notes);
