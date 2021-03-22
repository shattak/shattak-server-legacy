const mongoose = require("mongoose");

const users_profile_photo = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  _users_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
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

module.exports = mongoose.model("users_profile_photo", users_profile_photo);
