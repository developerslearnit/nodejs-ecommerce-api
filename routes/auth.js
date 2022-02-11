const router = require("express").Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res)=>{

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,process.env.PASSWORD_SECRET_KEY).toString()        
    });

    try {
        const result = await newUser.save();

        res.status(201).json({error:false,data:result})
    } catch (error) {
       res.status(500).json({error:true,message:error.message}); 
    }

   

});

router.post('/login', async (req,res)=>{


    try {
        const user = await User.findOne({username:req.body.username});

        !user && res.status(404).json({error:true,message:"User not found"});

        const decryptedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);

        req.body.password !==decryptedPassword && res.status(401).json({error:true,message:"Wrong username or password"});

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN});

        const {password, ...result} = user._doc;

        res.status(200).json({error:false,data:{...result,accessToken}});
        
    } catch (error) {
        res.status(500).json({error:true,message:error.message}); 
    }

})


module.exports = router;
