const mongoose = require('mongoose')
const {Schema} = mongoose;


const NotesSchema = new Schema({
    //referencing one model from another (similar to foreign key ) 
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    title: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true,
        default : "Description"
    },
    tag : {
        type : String,
        default : "general"
    },
    timestamp : {
        type : Date,
        default : Date.now
    }

})


//both types of exporting the model work 


const Notes = mongoose.model('notes', NotesSchema);
module.exports = Notes;

// module.exports = mongoose.model('notes', NotesSchema) ; 