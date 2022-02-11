const router = require("express").Router();
const {verifyToken,verifyTokenAndAuthorization} = require("./verifyJWTToken");


router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

   if(req.body.password){
       req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASSWORD_SECRET_KEY).toString();
   }    

   try {
       
   } catch (error) {
       res.status(500).json({error:true,message:error.message}); 
   }
       
   

});



module.exports = router;
