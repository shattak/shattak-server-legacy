const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("[DEBUG 5]\t token >> " + token);

    let accessVerifyOptions = {
      issuer: "shattak",
      audience: "http://shattak.com",
      expiresIn: "10d",
    };

    let decoded = jwt.verify(token, process.env.ACCESS, accessVerifyOptions);
    req.users_data = decoded;

    console.log("[DEBUG 17]\t decode >> " + decoded);
    console.log("[DEBUG 18]\t JTW Authintication Successfull");
    return next();
  }
  catch (err) {
    console.log("[DEBUG 22]\t" + err);
    error = new Error("web token authentication fail")
    error.status = 401;
    return next(error);
  }
};
