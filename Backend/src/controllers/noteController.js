import Note from "../models/Note.js"

export async function getAllNotes (req,res){
    try {
        const notes = await Note.find().sort({createdAt : -1}); // -1 will sort in desc order (mean lastest one first)
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller",error);
        res.status(500).json({message : "internel server error"});
    }
}

export async function getNoteById(req,res) {
    try {
       const note = await Note.findById(req.params.id);
       if(!note)res.status(404).json({message : "Note not Found by this Id"});

       res.status(200).json(note);
    } catch (error) {
        console.error("Error in getAllNotes controller",error);
        res.status(500).json({message : "internel server error"});
    }
}

export async function createNote  (req,res){
    try {
        const {title,content}= req.body;
        const note = new Note({title,content});


        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error in createNotes controller",error);
        res.status(500).json({message : "internel server error"});
    }
}

export async function updateNote (req,res){
    try {
        const {title,content} = req.body;
        // console.log(req.body);
         const updated = await Note.findByIdAndUpdate(req.params.id,{title,content},{ new: true, runValidators: true })
         if(!updated) res.status(404).json({message : "Note not found"});
        res.status(200).json(updated);
    } catch (error) {
        console.error("Error in updateNote controller",error);
        res.status(500).json({message : "internel server error"});
    }
}

export async function deleteNote  (req,res){
    try {
        const Delete = await Note.findByIdAndDelete(req.params.id);
        if(!Delete)res.status(404).json({message : "User is Not Foound for this id"})

            res.status(200).json({message : "Note is deleted successfully"})
        
    } catch (error) {
        console.error("Error in deleteNote controller",error);
        res.status(500).json({message : "internel server error"});
    }
}