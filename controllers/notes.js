import mongoose from "mongoose";
import Note from "../models/note.js";

export const getNotes = async (req, res) => {
    console.log("GET /notes");
    try{
        const notes = await Note.find();
        // console.log(notes);
        res.status(200).json(notes);

    }catch(error){
        console.log(error.message);
        res.status(404).json({message: error.message});
    }
}

export const createNote = async (req, res) => {
    const note = req.body;
    const newNote = new Note(note);
    console.log("POST /notes");
    // console.log(newNote);
    
    try{
        await newNote.save();
        res.status(201).json(newNote);
    }catch(error){
        res.status(409).json({message: error.message});   //https://www.restapitutorial.com/httpstatuscodes.html

    }
}

export const updateNote = async (req, res) => {
    const {id: _id} = req.params;
    const note = req.body;
    console.log("PATCH /notes/id");
    // console.log(note);
    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({"message": "No note with that ID"});
    
    try{
        
        const updatedNote = await Note.findByIdAndUpdate(_id, note, {new: true});
        res.status(201).json(updatedNote);

    }catch(error){
        res.status(404).json({message: error.message});
    }

}

export const deleteNote = async (req, res) => {
    const {id: _id} = req.params;
    console.log("DELETE /notes/id");


    if(!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({"message": "No note with that ID"});
    
    try{
        await Note.findByIdAndDelete(_id)    
        res.status(200).json({message: "Post Deleted Successfully!"});

    }catch(error){
        res.status(404).json({message: error.message});
    }

}