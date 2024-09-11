
const category_model=require("../models/category.models")


exports.createNewCategory=async(req,res)=>{
    //read the req body
    //create the category object
    const categoryData={
        name:req.body.name,
        description:req.body.description
    }
    
    //insert into mongo db
    try{
   const category= await category_model.create(categoryData)
   return res.status(200).send(category)
   }
   catch(err){
    console.log("Error while creating category",err);
    return res.status(500).send({
        message:"Error while creating the category"
    })
    
   }

    //return the response of the created category
}