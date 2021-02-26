const notesDB = require("../../models/notes");

exports.get_notes_search = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_notes_search");

  var SearchQuery = req.query.q;
  var PageLimit = 10;
  var pgnum = req.query.pg;
  var skiping = (pgnum - 1) * PageLimit;

  var regexQuery = {
    topic_name: new RegExp(SearchQuery, "i"),
    level: new RegExp(SearchQuery, "i"),
  };

  console.log(typeof SearchQuery + "====" + SearchQuery);
  console.log(regexQuery);

  if (SearchQuery.length === 0) {
    const err = new Error("Search Query length is zero");
    return next(err);
  } else {
    notesDB
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
