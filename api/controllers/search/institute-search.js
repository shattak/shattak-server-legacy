const institutesDB = require('../../models/education-structure/institutes');


exports.get_institute_search = (req,res,next)=>{
    console.log("[DEBUG 10]\t"+"get_institute_search");

    const SearchQuery = req.query.q;

    institutesDB
    
    res.status(200).json({
        mag :"get_institute_search"
    })
}
