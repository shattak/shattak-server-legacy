const { body, validationResult } = require("express-validator");



const userValidationRules = (route) => {

  switch (route) {
    case "request-users-registration":
      console.log("[VALIDATE 7]\t"+route);
      return [
        body("email").isEmail(),
        body("first_name"),
        body("last_name"),
        body("date_of_birth"),
        body("password").isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
      ];
    case "request-users-login":
      console.log("[VALIDATE 18]\trequest-users-login");
      return [
        body("email").isEmail(),
        body("password").isString()
      ];
  }
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};
