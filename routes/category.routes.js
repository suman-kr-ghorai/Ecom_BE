const categoryController=require("../controllers/category.controller")
const authmW=require("../middlewares/auth.middleware")

module.exports=(app)=>{
  app.post("/ecom/api/v1/categories",[authmW.verifyToken,authmW.isAdmin],categoryController.createNewCategory)
}