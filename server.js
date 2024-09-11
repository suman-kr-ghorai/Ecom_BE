const express=require("express");
const mongoose=require("mongoose");
const port=require("./config/server_config");
const app=express();
const dbconfig=require("./config/db_config");
const user_model=require("./models/user.models");
const bcrypt=require("bcryptjs");
app.use(express.json())  //middleware


mongoose.connect(dbconfig.DB_URL);
const db=mongoose.connection;

db.on("error",()=>{
    console.log("Error while connecting MongoDB");
    
});
db.once("open",()=>{
    console.log("Connected to MongoDb");
    init();
    
});

require("./routes/auth.routes")(app)     //stiching app with route
require("./routes/category.routes")(app)

app.listen(port.PORT,()=>{
    console.log(`Server is listening at ${port.PORT}`);
    
});

async function init(){
try{
    let user= await user_model.findOne({userId:"admin"});
    if(user){
    console.log("Admin is already present");
    return  
    }
}
catch(err){
console.log("Error while reading data",err);

}




try{
user= await user_model.create({
    name:"Suman",
    userId:"admin",
    email:"sumannkumar27@gmail.com",
    userType:"ADMIN",
    password:bcrypt.hashSync("Welcome1",8)

})
console.log("Admin Created");

}
catch(error){
    console.log(error);
    
}
}