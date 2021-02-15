const notesDB = require("../../models/notes");
require("../../models/education-structure/institutes");
require("../../models/education-structure/departments");
require("../../models/education-structure/courses");
require("../../models/education-structure/subjects");
var AWS = require("aws-sdk");

var credentials = {
  accessKeyId: process.env.AWSaccessKeyId,
  secretAccessKey: process.env.AWSsecretAccessKey,
};

AWS.config.update({ credentials: credentials, region: "ap-south-1" });
var s3 = new AWS.S3();

exports.post_obtain_notes_link_by_note_id = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "obtain_notes_link_by_note_id ");

  console.log(">>>>>>>>>>>" + req.body._id);

  if (typeof req.body._id === "undefined") {
    return next();
  } else {
    notesDB
      .find({
        _id: req.body._id,
      })
      .exec()
      .then((result) => {
        var presignedGETURL = s3.getSignedUrl("getObject", {
          Bucket: process.env.S3Bucket,
          Key: result[0].files[0].key, //filename
          Expires: 1000, //time to expire in seconds
        });

        res.status(200).json({
          result: result[0].files[0].key,
          presignedGETURL,
        });
      })
      .catch((error) => {
        return next(error);
      });
  }
};
