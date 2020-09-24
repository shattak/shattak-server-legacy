const express = require("express");
const router = express.Router();

const request_users_registration = require("../controllers/authentications/request-users-registration");
router.post("/request-users-registration",request_users_registration.post_request_users_registration); 

module.exports = router;