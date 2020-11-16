module.exports = (req, res, next) => {
  console.log(
    "process.env.DASHBOARD_ACTIVATION_SIGNAL " +
      process.env.DASHBOARD_ACTIVATION_SIGNAL
  );

  if (process.env.DASHBOARD_ACTIVATION_SIGNAL === "active") {
    return next();
  } else {
    error = new Error("forbidden rough");
    error.status = 403;
    return next(error);
  }
};
