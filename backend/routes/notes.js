const express = require('express');
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../model/Notes');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const { findByIdAndUpdate } = require('../model/Notes');


//Route 1 : endpoint : /api/notes/fetchallnotes : fetch all notes of a user
router.get('/fetchallnotes',fetchUser,async (req,res)=>{

    const Uid = await req.user;
    try {
        const data = await Notes.find({user : Uid});
        res.send(data)
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error ")
    }

})

//Route 2 : endpoint : /api/notes/addnote : add a note for a user 
router.post('/addnote' , fetchUser , [
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description','Enter a valid description  ').isLength({ min: 5 })
] , async(req,res)=>{


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        
      const {title , description , tag } = req.body;
    const uid = await req.user;
    // const
    const note = await Notes.create({
        title , description , tag , user : uid
    })
    // await note.save()

    res.send(note)
    } catch (error) {
       console.log(error.message)
       res.status(500).send("Internal server error ")    
    }
    


})



//Route 3 : endpoint (/api/notes/updatenote/:id) login required 
router.put('/updatenote/:id', fetchUser , async(req, res)=>{
    try {
        
    
    const uid = await req.user;

    const notesId = await req.params.id;
    let notes = await Notes.findById(notesId);

    if(notes.user.toString() !== uid){
        return res.status(401).send("Not allowed")
    }

    
    let newData = {}
    const {title , description , tag} = req.body;
    if(title) newData.title = title;
    if(description) newData.description = description;
    if(tag) newData.tag = tag;

    // notes = await Notes.findByIdAndUpdate(notesId ,  {$set: newData}, {new:true}).select("-_id -user"); -> we can select which specific field we want or specify which ones to exclude 
    notes = await Notes.findByIdAndUpdate(notesId ,  {$set: newData}, {new:true});
    res.send(notes)
    
} catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error ")
}
})


//Route 4 : endpoint (/api/notes/deletenote/:id) - delete a note : login req.
router.delete('/deletenote/:id',fetchUser, async(req,res)=>{
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("note not found")
        }
        
        if(note.user.toString() !== req.user){
            return res.status(401).send("Not Allowed")
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({"Success" : "note deleted successfully"})





    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
})

module.exports = router