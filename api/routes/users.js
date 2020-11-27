const express = require("express");
const router = express.Router();

const {
  userValidationRules,
  validate,
} = require("../middleware/validator/authentications");

const jwtauth = require("../middleware/security/jwtauth");



//ROUTE     POST     add-cover-photo
const add_cover_photo = require("../controllers/users/add-cover-photo");
router.post("/add-cover-photo", add_cover_photo.post_add_cover_photo);

//ROUTE     POST     add-profile-photo
const add_profile_photo = require("../controllers/users/add-profile-photo");
router.post("/add-profile-photo", add_profile_photo.post_add_profile_photo);

//ROUTE     PUT      edit-profile-photo
const edit_profile_photo = require("../controllers/users/edit-profile-photo");
router.put("/edit-profile-photo", edit_profile_photo.put_edit_profile_photo);

//ROUTE     PUT      edit-users-info
const edit_users_info = require("../controllers/users/edit-users-info");
router.put("/edit-users-info", edit_users_info.put_edit_users_info);

//ROUTE     post      fetch-users-info
const fetch_users_info = require("../controllers/users/fetch-users-info");
router.post(
  "/fetch-users-info",
  fetch_users_info.post_fetch_users_info
);

module.exports = router;
