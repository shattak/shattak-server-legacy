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

// AWS S3 setups
var s3 = new aws.S3({
  accessKeyId: process.env.AWSaccessKeyId,
  secretAccessKey: process.env.AWSsecretAccessKey,
  Bucket: "shattak",
});

// AWS bucket Storage Engine
var bucketStorage = multerS3({
  s3: s3,
  bucket: "shattak",

  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    const extname = path.extname(file.originalname).toLowerCase();
    cb(
      null,
      "notes/" +
        file.fieldname +
        "-" +
        Date.now() +
        "-" +
        "random-key-o" +
        extname
    );
  },
  // location: "location",

  // acl: "acl",
  // contentType: "contentType",

  // etag: "etag",
  // contentDisposition: "contentDisposition",
  // storageClass: "storageClass",
  // versionId: "versionId",
});

// Check File Type AND File Filter
var fileFilter = (req, file, cb) => {
  console.log("[DEBUG 32]\tfileFilter");
  const filetypes = /pdf|doc|docx|ppt|pptx/; // Allowed ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Check ext
  const mimetype = filetypes.test(file.mimetype);

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
  console.log("[DEBUG 10]\t" + "get_users_upload_notes");
  console.log(JSON.stringify(req.body));

  uploader(req, res, function (err) {
    console.log(JSON.stringify(req.body));

    var token = JSON.stringify(req.headers.authorization.split(" ")[1]);
    token = token.slice(1, -1);
    var decoded = jwt.decode(token, { complete: true });
    console.log(decoded.payload._user_id);


    console.log("uploader");
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("err");
      return next(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("err");
      return next(err);
    } else if (req.file === undefined) {
      console.log("Error: No File Selected!");
      const err = new Error("No File Selected!");
      return next(err);
    } else {




      // suscessfuly uplodes on AWS S3
      console.log(req.file);
      const notes = new notesDB({
        _id: mongoose.Types.ObjectId(),
        _users_id: decoded.payload._user_id, 

        topic_name: req.body.topic_name,
        subject_name: req.body.subject_name,
        _institute_id: req.body._institute_id,
        tag: [],
        category: {
          level: req.body.level,
          field: req.body.field,
          department: req.body.department,
        },
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
          res.status(200).json({ masg: "succesfull", file: req.file , result});
        })
        .catch((error) => {
          return next(error);
        });
    }
  });
};
