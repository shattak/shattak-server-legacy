const institutesDB = require("../../models/education-structure/institutes");
const notesDB = require("../../models/notes");
const subjectsDB = require("../../models/education-structure/subjects");
const usersDB = require("../../models/users");

var fainalresult = [];

exports.get_explore = async (req, res, next) => {
  console.log("[DEBUG 10]\t" + "get_explore");

  var SearchQuery = req.query.q;
  var PageLimit = 4;

  var regexQueryInstitutes = {
    name: new RegExp(SearchQuery, "i"),
  };

  var regexQueryNotes = {
    topic_name: new RegExp(SearchQuery, "i"),
  };

  var regexQuerySubjects = {
    name: new RegExp(SearchQuery, "i"),
  };

  var regexQueryUsers = {
    $or: [
      { first_name: new RegExp(SearchQuery, "i") },
      { last_name: new RegExp(SearchQuery, "i") },
      { users_name: new RegExp(SearchQuery, "i") },
    ],
  };

  console.log(typeof SearchQuery + "====" + SearchQuery);


  if (SearchQuery.length === 0) {
    const err = new Error("Search Query length is zero");
    return next(err);
  } else {
    await institutesDB
      .find(regexQueryInstitutes)
      .limit(PageLimit)
      .exec()
      .then((result) => {
        console.log("1 institutesDB");
        fainalresult.push({ institutes: result });
        return 0;
      })
      .catch((error) => {
        console.log("error");
        return next(error);
      });
    await usersDB
      .find(regexQueryUsers)
      .limit(PageLimit)
      .exec()
      .then((result) => {
        console.log("2 usersDB");
        fainalresult.push({ users: result });
        return 0;
      })
      .catch((error) => {
        console.log("error");
        return next(error);
      });

    await subjectsDB
      .find(regexQuerySubjects)
      .limit(PageLimit)
      .exec()
      .then((result) => {
        console.log("3 subjectsDB");
        fainalresult.push({ subjects: result });
        return 0;
      })
      .catch((error) => {
        console.log("error");
        return next(error);
      });

    await notesDB
      .find(regexQueryNotes)
      .limit(PageLimit)
      .exec()
      .then((result) => {
        console.log("4 notesDB");
        fainalresult.push({ notes: result });
        return 0;
      })
      .catch((error) => {
        console.log("error");
        return next(error);
      });

    fainalresultbk = fainalresult;
    fainalresult = [];
    return res.status(200).json({
      explore: fainalresultbk,
    });
  }
};
