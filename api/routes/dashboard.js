const express = require("express");
const router = express.Router();


//ROUTE     POST       add-institute  
const  add_institute  = require("../controllers/dashboard/add-institute");
router.post("/add-institute", add_institute.post_add_institute );

//ROUTE     POST      add-boards     
const  add_boards  = require("../controllers/dashboard/add-boards");
router.post("/add-boards", add_boards.post_add_boards );

//ROUTE     POST      add-department  
const  add_department  = require("../controllers/dashboard/add-department");
router.post("/add-department", add_department.post_add_department  );

//ROUTE     POST      add-subjects  
const  add_subjects  = require("../controllers/dashboard/add-subjects");
router.post("/add-subjects", add_subjects.post_add_subjects );


//ROUTE     POST      add-course  
const  add_course  = require("../controllers/dashboard/add-course");
router.post("/add-course", add_course.post_add_course );




//ROUTE     POST     fetch-boards-info-with-id 
const  fetch_boards_info_with_id  = require("../controllers/dashboard/fetch-boards-info-with-id");
router.post("/fetch-boards-info-with-id", fetch_boards_info_with_id.post_fetch_boards_info_with_id );

//ROUTE     POST     fetch-course-info-with-id 
const  fetch_course_info_with_id  = require("../controllers/dashboard/fetch-course-info-with-id");
router.post("/fetch-course-info-with-id", fetch_course_info_with_id.post_fetch_course_info_with_id);

//ROUTE     POST     fetch-department-info-with-id 
const  fetch_department_info_with_id  = require("../controllers/dashboard/fetch-department-info-with-id");
router.post("/fetch-department-info-with-id", fetch_department_info_with_id.post_fetch_department_info_with_id );

//ROUTE     POST     fetch-institute-info-with-id 
const  fetch_institute_info_with_id  = require("../controllers/dashboard/fetch-institute-info-with-id");
router.post("/fetch-institute-info-with-id", fetch_institute_info_with_id.post_fetch_institute_info_with_id );

//ROUTE     POST     fetch-subjects-info-with-id
const  fetch_subjects_info_with_id  = require("../controllers/dashboard/fetch-subjects-info-with-id");
router.post("/fetch-subjects-info-with-id", fetch_subjects_info_with_id.post_fetch_subjects_info_with_id);







module.exports = router;
