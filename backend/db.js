const mongoose = require('mongoose');

const mongooseURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectToDb = ()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log("connected to mongoose")
    })
}

module.exports = connectToDb;
