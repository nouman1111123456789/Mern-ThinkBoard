import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote , getNoteById} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);


export default router;

// app.get("/api/notes", (req,res)=>{
//     // send request
//     res.status(200).json({message : "The note is send"});
// });

// app.post("/api/notes",(req,res)=>{
//     res.status(201).json({message :"the note is created sucessfully"});
// });

// app.put("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message : "the is note is updated successfully"});
// });

// app.delete("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message : "the note is deleted succesfully"})
// });