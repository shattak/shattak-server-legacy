/**
 * 
 * request :        _users_id from accesstoken,
 *                  topic_name, subject_name,
 *                  institute,tag[], files[]
 *                  category{ field,department,notes_verified }
 * chake   :        if category are present on catagory db
 * chake   :        
 * 
 */


var multer  = require('multer')


exports.post_users_upload_notes   = (req,res,next)=>{
    console.log("[DEBUG 10]\t"+"get_users_upload_notes");
    res.status(200).json({
        mag :"get_users_upload_notes"
    })
}