const jwt =require('jsonwebtoken');


const verifyToken = (req,res,next)=>{

    const authHeader = req.headers['token'];

    if(!authHeader){
        return res.status(401).json({error:true,message:"UnAthorized"});
    }else{

        jwt.verify(authHeader,process.env.ACCESS_TOKEN_SECRET_KEY,(err,result)=>{

            if(err){
                return res.status(403).json({error:true,message:"UnAthorized"});
            }else{
                req.user = result;
               
                next();
            }
        });

    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{

    verifyToken(req,res,()=>{
        if(req.user.id==req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not authorized to perform that task")
        }
    })


}

module.exports = {verifyToken};