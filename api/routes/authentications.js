const express = require("express");

const router = express.Router();

const {
  userValidationRules,
  validate,
} = require("../middlewares/validator/authentications");
 
const jwtauth = require("../middlewares/security/jwtauth");

//ROUTE   put   authentications // change-users-password
const change_users_password = require("../controllers/authentications/change-users-password");
router.put(
  "/change-users-password",
  change_users_password.put_change_users_password
);

//ROUTE   post  authentications //request_access_token
const request_access_token = require("../controllers/authentications/request-access-token");
router.post(
  "/request-access-token",
  request_access_token.post_request_access_token
);

//ROUTE   post  authentications // request_users_login
const request_users_login = require("../controllers/authentications/request-users-login");
router.post(
  "/request-users-login",
  userValidationRules("request-users-login"),
  validate,
  request_users_login.post_request_users_login
);

//ROUTE   post  authentications // request_users_logout
const request_users_logout = require("../controllers/authentications/request-users-logout ");
router.post(
  "/request-users-logout",
  // jwtauth,
  request_users_logout.post_request_users_logout
);
 
//ROUTE   post  authentications // request_users_registration
const request_users_registration = require("../controllers/authentications/request-users-registration");
router.post(
  "/request-users-registration",
  userValidationRules("request-users-registration"),
  validate,
  request_users_registration.post_request_users_registration
);

//ROUTE   post  authentications // resolve_forgot_password
const resolve_forgot_password = require("../controllers/authentications/resolve-forgot-password");
router.post(
  "/resolve-forgot-password",
  resolve_forgot_password.post_resolve_forgot_password
);

//ROUTE   post  authentications // verify_users_email
const verify_users_email = require("../controllers/authentications/verify-users-email");
router.post("/verify-users-email", verify_users_email.post_verify_users_email);

module.exports = router;
