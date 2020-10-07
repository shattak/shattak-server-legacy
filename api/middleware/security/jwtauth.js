const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("[DEBUG ]\t token >> " + token);

    let accessVerifyOptions = {
      issuer: "shattak",
      audience: "http://shattak.com",
      expiresIn: "10m",
    };

    let decoded = jwt.verify(token, process.env.ACCESS, accessVerifyOptions);
    req.users_data = decoded;

    console.log("[DEBUG ]\t decode >> " + decode);
    console.log("[DEBUG ]\t JTW Authintication Successfull");
    return next();
  }
  catch (err) {
    console.log("[DEBUG ]\t" + error);
    err.status = 401;
    return next(err);
  }
};
