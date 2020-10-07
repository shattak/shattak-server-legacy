const express = require("express");
const {
  userValidationRules,
  validate,
} = require("../middleware/validator/authentications");
const router = express.Router();
const jwtauth = require("../middleware/security/jwtauth");

const change_users_password = require("../controllers/authentications/change-users-password");
router.put(
  "/change-users-password",
  change_users_password.put_change_users_password
);

const request_access_token = require("../controllers/authentications/request-access-token");
router.post(
  "/request-access-token",
  request_access_token.post_request_access_token
);

const request_users_login = require("../controllers/authentications/request-users-login");
router.post(
  "/request-users-login",
  request_users_login.post_request_users_login
);

const request_users_logout = require("../controllers/authentications/request-users-logout ");
router.post(
  "/request-users-logout",
  // jwtauth,
  request_users_logout.post_request_users_logout
);

const request_users_registration = require("../controllers/authentications/request-users-registration");
router.post(
  "/request-users-registration",
  userValidationRules("request-users-registration"),
  validate,
  request_users_registration.post_request_users_registration
);

const resolve_forgot_password = require("../controllers/authentications/resolve-forgot-password");
router.post(
  "/resolve-forgot-password",
  resolve_forgot_password.post_resolve_forgot_password
);

const verify_users_email = require("../controllers/authentications/verify-users-email");
router.post("/verify-users-email", verify_users_email.post_verify_users_email);

module.exports = router;
