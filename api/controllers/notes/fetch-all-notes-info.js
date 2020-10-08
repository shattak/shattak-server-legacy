exports.get_fetch_all_notes_info   = (req,res,next)=>{
    console.log("[DEBUG 10]\t"+"get_fetch_all_notes_info");
    res.status(200).json({
        mag :"get_fetch_all_notes_info"
    })
}