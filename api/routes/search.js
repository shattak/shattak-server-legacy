const express = require("express");
const router = express.Router();

//ROUTE     get    institute-search
const institute_search = require("../controllers/search/institute-search");
router.get("/institute-search", institute_search.get_institute_search);

//ROUTE     get    notes-search
const notes_search = require("../controllers/search/notes-search");
router.get("/notes-search", notes_search.get_notes_search);

//ROUTE     get    subject-search
const subject_search = require("../controllers/search/subject-search");
router.get("/subject-search", subject_search.get_subject_search);

//ROUTE     get    users-search
const users_search = require("../controllers/search/users-search");
router.get("/users-search", users_search.get_users_search);

module.exports = router;
