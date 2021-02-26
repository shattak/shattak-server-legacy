const usersDB = require("../../models/users");

exports.get_users_search = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_users_search");

  const SearchQuery = req.query.q;

  usersDB()

  res.status(200).json({
    mag: "get_users_search",
  });
};
