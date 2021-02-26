const subjectsDB = require("../../models/education-structure/subjects");

exports.get_subject_search = (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_subject_search");

  const SearchQuery = req.query.q;

  subjectsDB()

  res.status(200).json({
    mag: "get_subject_search",
  });
};
