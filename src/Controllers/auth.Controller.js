const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

async function registerUser(req, res){
    const{username, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    });

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User Already Exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)


    const user = await userModel.create({
        username, email, password:hashPassword
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered Successfully"
    })
}

async function loginUser(req, res){
    const {email, password} = req.body

    const user = await userModel.findOne({
        email
    })

    
    
    if(!user){
        return res.status(401).json({
            message: "Email or Password is invalid, User not found"
        })
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        return res.status(401).json({
            message: "Inavlid Email or Password"
        })
    }
    
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    return res.status(201).json({
        message: "User logged in successfully"
    })

}

module.exports = {registerUser, loginUser}