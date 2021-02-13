/**
 *
 * request :        _users_id from accesstoken,
 *                  topic_name, subject_name,
 *                  institute,tag[], files[]
 *                  category{ field,department,notes_verified }
 * chake   :        if category are present on catagory db
 * chake   :
 *
 */

const path = require("path");
const multer = require("multer");
var aws = require("aws-sdk");
var multerS3 = require("multer-s3");
const jwt = require("jsonwebtoken");
const notesDB = require("../../models/notes");

require('../../models/education-structure/institutes');
require('../../models/education-structure/departments');
require('../../models/education-structure/courses');
require('../../models/education-structure/subjects');

// AWS S3 setups
var s3 = new aws.S3({
  accessKeyId: process.env.AWSaccessKeyId,
  secretAccessKey: process.env.AWSsecretAccessKey,
  Bucket: process.env.S3Bucket,
});


// AWS bucket Storage Engine
var bucketStorage = multerS3({
  s3: s3,
  bucket: process.env.S3Bucket,

  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const extname = path.extname(file.originalname).toLowerCase();
    cb(
      null,
        file.originalname.replace(/\s/g, '') +
        "-" +
        Date.now() +
        "-shattak-" +
        Math.floor(Math.random() * 10000000001) +
        extname
    );
  },
});

// Check File Type AND File Filter
var fileFilter = (req, file, cb) => {
  console.log("[DEBUG 1]\tfileFilter");

  console.log("[DEBUG 2]\t" + path.extname(file.originalname).toLowerCase());
  console.log("[DEBUG 2.1]\t" + file.mimetype);

  const fileExtensionType = /doc|docx|ppt|pptx|xls|xlsx|pdf|ppsx|pps|odt/; // Allowed ext
  const fileMimeType = /msword|vnd.openxmlformats-officedocument.wordprocessingml.document|vnd.ms-powerpoint|vnd.openxmlformats-officedocument.presentationml.presentation|vnd.ms-excel|vnd.openxmlformats-officedocument.spreadsheetml.sheet|pdf|vnd.openxmlformats-officedocument.presentationml.slideshow|vnd.ms-powerpoint|mspowerpoint|vnd.oasis.opendocument.text/;
  const extname = fileExtensionType.test(path.extname(file.originalname).toLowerCase()); // Check ext
  const mimetype = fileMimeType.test(file.mimetype);
  console.log("[DEBUG 2.2]\t" + "mimetype " + mimetype + " extname " + extname);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};

// AWS file limite
var limits = {
  fileSize: 10000000,
  files: 100,
};

// multer upload funtion
var uploader = multer({
  limits: limits,
  storage: bucketStorage,
  fileFilter: fileFilter,
}).single("singlenote");

exports.post_users_upload_single_notes = (req, res, next) => {
  console.log("[DEBUG 3]\t" + "get_users_upload_notes");
  console.log("[DEBUG 4]\t" + "req.body" + JSON.stringify(req.body));
  console.log("[DEBUG 5]\t" + "Uploader");
  uploader(req, res, function (err) {
    console.log("[DEBUG 6]\t" + JSON.stringify(req.file));

    var token = JSON.stringify(req.headers.authorization.split(" ")[1]);
    token = token.slice(1, -1);
    var decoded = jwt.decode(token, { complete: true });
    console.log("[DEBUG 7]\t" + "user id " + decoded.payload._user_id);

    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("[DEBUG 8]\t" + "err");
      return next(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("[DEBUG 9]\t" + "err");
      return next(err);
    } else if (req.file === undefined) {
      console.log("[DEBUG 10]\t" + "Error: No File Selected!");
      const err = new Error("No File Selected!");
      return next(err);
    } else {
      // suscessfuly uplodes on AWS S3
      console.log("[DEBUG 11]\t" + req.file);
      const notes = new notesDB({
        _id: mongoose.Types.ObjectId(),

        _users_id: decoded.payload._user_id,

        _institutes_id: req.body._institutes_id,
        _departments_id: req.body._departments_id,
        _subjects_id: req.body._subjects_id,
        topic_name: req.body.topic_name,
        level: req.body.level,
        field: req.body.field,
        tag: [],
        files: [
          {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            size: req.file.size,
            bucket: req.file.bucket,
            key: req.file.key,
            acl: req.file.acl,
            contentType: req.file.contentType,
            contentDisposition: req.file.contentDisposition,
            storageClass: req.file.storageClass,
            serverSideEncryption: req.file.serverSideEncryption,
            metadata: {
              fieldName: req.file.metadata.fieldName,
            },
          },
        ],
      });

      notes
        .save()
        .then((result) => {
          res.status(200).json({ masg: "succesfull", file: req.file, result });
        })
        .catch((error) => {
          return next(error);
        });
    }
  });
};
