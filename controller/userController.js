const User=require('../models/userModel');
const asyncHandler = require('express-async-handler');



const createUser=asyncHandler(async(req,res)=>{
    const email=req.body.email;
    const findUser=await User.findOne({email:email});
    if(!findUser){
        //create anew user
        const newUser=await User.create(req.body)
        res.json(newUser)
    }else{
         //user already exist
        throw new Error("User already Exists")
       
    }
})


const loginUserCtrl=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    //check if user exist or not
    const findUser= await User.findOne({email});
    if(findUser && (await findUser.isPasswordMatched(password))){
        res.json(findUser)
    }else{
        throw new Error("Invalid Credential")
    }
    // console.log(email,password);
})

module.exports={createUser,loginUserCtrl}