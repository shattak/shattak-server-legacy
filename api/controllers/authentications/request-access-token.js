/**
 DONE  requst: token form users  
 DONE  chake : if token then valided 
 DONE  chake : if valide token then sing a new access token  
 */

const jwt = require("jsonwebtoken");

exports.post_request_access_token = (req, res, next) => {
  console.log("[DEBUG 10]\t request_access_token");

  //CODE chake and veledate the refresh token
  console.log("[DEBUG 10]\t" + req.headers.authorization);
  let refreshVerifyOptions = {
    issuer: "shattak",
    audience: "http://shattak.com",
    expiresIn: "30d",
  };
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.REFRESH, refreshVerifyOptions);

  //CODE sing a new access token
  try {
    console.log("[DEBUG 10]\t" + decoded);

    let payload = {
      email: decoded.email,
      _user_id: decoded._users_id,
      users_name: decoded.users_name,
    };

    let accessSignOptions = {
      issuer: "shattak",
      audience: "http://shattak.com",
      expiresIn: "10m",
    };

    const access = jwt.sign(payload, process.env.ACCESS, accessSignOptions);
    
    res.status(200).json({
      massage: "new acces token",
      access,
    });
    
  } catch (err) {
    err.status = 501;
    next(err);
  }
};
