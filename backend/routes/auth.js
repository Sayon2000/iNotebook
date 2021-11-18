const express = require('express')
const router = express.Router()
const Users = require('../model/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')



//Route 1 : endpoint for Create a new user (no duplicate emails)

  

router.post('/create',
    [body('name','Enter a valid name').isLength({ min: 5 }),
    body('email','Enter a valid email').isEmail(),
    body('password', 'Password minimum length is 5 characters ').isLength({ min: 5 })
    ]
    ,async(req,res)=>{
      let success = false;
    // console.log(req.body)
    try{




    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success ,  errors: errors.array() });
    }

    

      //checking if a user with same email exists
    let user = await Users.findOne({email : req.body.email});
    if(user){
      return res.json({success , "error" : "a user with this email already exists"}).status(400)
    }

    //password hasing
    const salt = bcrypt.genSaltSync(10);
    console.log(salt)
    const hashPass = await bcrypt.hash(req.body.password, salt);

    let data = {
      id : Users.id
    }


    //jwt token
    const JWT_SECRET = "sayonishere"

    const token = jwt.sign(data, JWT_SECRET);

    //creating the user
    
    user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPass
      })
      success = true
      res.status(200).json({success , token})
    }catch(err){
      console.error(err.message);
      res.status(500).send("Intenal server error ")
    }
      
 

})




//Route 2 : endpoint for authenticating a user : No login required
router.post('/login',
[body('password','password cannot be null').exists(),
body('email','Enter a valid email').isEmail()]
,async (req,res)=>{
  let success = false

  //checking if we got any errors in the validation
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success ,errors: errors.array() });
    }

    try{
      let user = await Users.findOne({email:req.body.email});
      if(!user){
        return res.status(401).json({error : "please use correct credentials to login"})
      }
      let comparePass =await bcrypt.compare(req.body.password, user.password);
      if(comparePass){
        const JWT_SECRET = "sayonishere"
        const data={
          id : user.id
        }
        const token = await jwt.sign(data, JWT_SECRET);
        success = true
        return res.status(200).json({success , token})


      }else{
        return res.status(401).json({success , message : "Enter correct credentials to login "})
      }

    }catch(err){

      console.log(err)
      return res.send("Internal server error occurred").status(500);
    }
})

//Route 3 : for retrieval of user data
router.post('/getuser', fetchUser, async(req,res)=>{
  const userId = await req.user;
  const data = await Users.findById(userId).select("-password")
  console.log(data)
  if(data){
    res.status(200).json(data);
  }else{
    
    res.status(401).send("use the correct token for authentication")
  }
})


module.exports = router