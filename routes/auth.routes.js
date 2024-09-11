const authController=require("../controllers/auth.controller")
const authMw=require("../middlewares/auth.middleware")

module.exports=(app)=>{
app.post("/ecom/api/v1/auth/signup",[authMw.verifySignUpBody],authController.signup);
app.post("/ecom/api/v1/auth/signin",[authMw.verifySignInBody],authController.signin)
}

// module.exports=(app)=>{
//     app.post("/ecom/api/v1/auth/signin",authController.signin)
//     }