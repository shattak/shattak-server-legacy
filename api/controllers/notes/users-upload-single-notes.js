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



// AWS S3 setups 
var s3 = new aws.S3({
  accessKeyId:  process.env.AWSaccessKeyId,
  secretAccessKey: process.env.AWSsecretAccessKey,
  Bucket: "shattak",
});




// AWS bucket Storage Engine
var bucketStorage = multerS3({
  s3: s3,
  bucket: "shattak",
 

  metadata: function (req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function (req, file, cb) {
    const extname = path.extname(file.originalname).toLowerCase();
    cb(null, 'notes/'+file.fieldname + "-" + Date.now() +"-"+ "random-key-o"+ extname )
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
  const filetypes = /jpeg|jpg|png|gif/; // Allowed ext
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

  uploader(req, res, function (err) {
    console.log(JSON.stringify(req.body));

    console.log("uploader");
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log("err");
      return next(err);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("err");
      return next(err);
    } 
    else if (req.file === undefined) {
      console.log("Error: No File Selected!");
      const err = new Error("No File Selected!");
      return next(err);
    }else{
      console.log(req.file);
      // Everything went fine.
      res.status(200).json({ masg: "succesfull", file: req.file });



    }
  });
};
