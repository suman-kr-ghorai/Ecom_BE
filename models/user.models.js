const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:10
    },
    userType:{
        type:String,
        default:"CUSTOMER",
        required:true,
        enum:["CUSTOMER","ADMIN"]
    },
    password:{
        type:String,
        required:true
    }

},{versionKey:false,timestamps:true});

module.exports =mongoose.model("User",userSchema);