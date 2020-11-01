const mongoose = require("mongoose");
const { Schema } = mongoose;

const institute = new Schema({

    _id: mongoose.Schema.Types.ObjectId,
    name :{
        type : String
    },
    short_name:{
        type : String
    }
})


module.exports = mongoose.model("institute", institute);
