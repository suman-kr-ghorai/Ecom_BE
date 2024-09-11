const bcrypt=require("bcryptjs");
const mongoose=require("mongoose");
const user_model=require("../models/user.models");
const jwt=require("jsonwebtoken");
const secret=require("../config/auth.config")


//Logic to register a user



exports.signup=async (req,res)=>{
//logic to create a user
//1.read the request body
    const req_body=req.body
//2.insert data in users collection in mongodb
const user_obj={
    name:req_body.name,
    userId:req_body.userId,
    userType:req_body.userType,
    email:req_body.email,
    password:bcrypt.hashSync(req_body.password,8)
}
try {
    const userCreated=await user_model.create(user_obj)
    const res_user={
        name:userCreated.name,
        userId:userCreated.userId,
        email:userCreated.email,
        userType:userCreated.userType,
        createdAt:userCreated.createdAt,
        updatedAt:userCreated.updatedAt
    }
    res.status(201).send(res_user)
} catch (error) {
    console.log("Error while creating a user",error);
    res.status(500).send({
        message:"Some error happened while registering user"
    })
    
}
}

//Logic to sign in a registered user and provide acess token




exports.signin=async (req,res)=>{
//check if userId present in database
const user=await user_model.findOne({userId:req.body.userId})
if(user==null){
    return res.status(400).send({
       message:"UserId id not found"
    })
    
}
//password valid or not(campareSync helps to check the stored hashed password and the entered password)
const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)

if(!isPasswordValid){
  return  res.status(401).send({
        message:"Wrong Password"
    })
}
//using jwt create a token for acess
//secret is a salt for better encryption or anyone with jwt algorithm can track the access token
const token=jwt.sign({id:user.userId},secret.secret,{
    expiresIn:120
})
res.status(200).send({
    name:user.name,
    userId:user.userId,
    email:user.email,
    userType:user.userType,
    accessToken:token

})

}
