const jwt = require('jsonwebtoken');

const fetchUser =(req,res,next)=>{
    
    const token = req.header('auth-token')
    if(!token){
        return res.status(400).send("Use a valid token for authentication")
    }
    
    try{
    const data = jwt.verify(token,"sayonishere")
    req.user = data.id
    next()
    }catch(err){
        console.log(err.messgae)
        res.status(400).send("Use a valid token for authentication")

    }



}
    

module.exports = fetchUser