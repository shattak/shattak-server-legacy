const mongoose = require("mongoose");
const { Schema } = mongoose;

const notes = new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  _users_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
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
  _institute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "institute",
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

  notes_verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("notes", notes);
