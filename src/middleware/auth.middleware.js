const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "unauthorized user"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({
            _id: decoded.id
        })

        if(!user){
            return res.status(401).json({
                message: "User not found"
            })
        }
        
    req.user = user;
    next();
    
    }
    catch(err){
        return res.status(401).json({
            message: "Unauthorized access token not found"
        })
    }
}

module.exports = {authMiddleware}