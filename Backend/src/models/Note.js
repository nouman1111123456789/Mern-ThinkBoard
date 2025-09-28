import mongoose from "mongoose";

// 1 step : You need to create a schema
// 2 step : You would create a model base off of that schema

const noteSchema = new mongoose.Schema({
title: {
    type:String,
    required : true
},
content : {
    type : String,
    required : true
},
},
{timestamps:true} //CreatedAt,UpdatesAt
);

const Note = mongoose.model("Note",noteSchema)

export default Note;