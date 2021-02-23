const express = require("express");
const router = express.Router();
const jwtauth = require("../middlewares/security/jwtauth");

//ROUTE     PUT      edit-notes-info-by-id  
const  edit_notes_info_by_id  = require("../controllers/notes/edit-notes-info-by-id");
router.put("/edit-notes-info-by-id",edit_notes_info_by_id.put_edit_notes_info_by_id);

//ROUTE     GET      fetch-all-notes-info   
const fetch_all_notes_info = require("../controllers/notes/fetch-all-notes-info");
router.get("/fetch-all-notes-info",fetch_all_notes_info.get_fetch_all_notes_info);

//ROUTE     POST      fetch-notes-by-id      
const fetch_notes_by_id   = require("../controllers/notes/fetch-notes-by-id");
router.post("/fetch-notes-by-id",fetch_notes_by_id.post_fetch_notes_by_id);

//ROUTE     DELETE   remove-notes-by-id     
const remove_notes_by_id  = require("../controllers/notes/remove-notes-by-id");
router.delete("/remove-notes-by-id",remove_notes_by_id.delete_remove_notes_by_id);

//ROUTE     POST    users_upload_single_notes     
const users_upload_single_notes  = require("../controllers/notes/users-upload-single-notes");
router.post("/users-upload-single-notes", jwtauth ,users_upload_single_notes.post_users_upload_single_notes);

//ROUTE     POST    obtain_notes_link_by_note_id    
const obtain_notes_link_by_note_id  = require("../controllers/notes/obtain-notes-link-by-note-id");
router.post("/obtain-notes-link-by-note-id" ,obtain_notes_link_by_note_id.post_obtain_notes_link_by_note_id);


//ROUTE     POST    post_fetch_notes_by_users_id  
const fetch_notes_by_users_id   = require("../controllers/notes/fetch-notes-by-users-id");
router.post("/fetch-notes-by-users-id" ,fetch_notes_by_users_id.post_fetch_notes_by_users_id );


module.exports = router;


