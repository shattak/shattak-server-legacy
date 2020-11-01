const express = require("express");
const router = express.Router();


//ROUTE     POST       add-institute  
const  add_institute  = require("../controllers/dashboard/add-institute");
router.post("/add-institute", add_institute.post_add_institute );



module.exports = router;
