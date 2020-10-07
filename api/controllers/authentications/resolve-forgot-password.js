exports.post_resolve_forgot_password = (req, res, next) => {

  console.log("[ DEBUG 10 ] resolve_forgot_password");
  res.status(200).json({
    mag: "suc",
  });
  next();
};
