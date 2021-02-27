const usersDB = require("../../models/users");

exports.get_users_search = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_users_search");

  var SearchQuery = req.query.q;
  var PageLimit = 10;
  var pgnum = req.query.pg;
  var skiping = (pgnum - 1) * PageLimit;

  var regexQuery = {
    $or: [
      { first_name: new RegExp(SearchQuery, "i") },
      { last_name: new RegExp(SearchQuery, "i") },
      { users_name: new RegExp(SearchQuery, "i") },
    ],
  };

  if (SearchQuery.length === 0) {
    const err = new Error("Search Query length is zero");
    return next(err);
  } else {
    usersDB
      .find(regexQuery)
      .skip(skiping)
      .limit(PageLimit)
      .exec()
      .then((result) => {
        res.status(200).json({
          result,
        });
      })
      .catch((error) => {
        console.log("error");
        return next(error);
      });
  }
};
