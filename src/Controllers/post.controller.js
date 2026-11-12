const postModel = require("../Models/post.model");
const { uploadImage } = require("../services/imagekit.service");

async function createPost(req, res){
    
    try{
         const user = req.user;
        const caption = req.body.caption;
        
        const image = await uploadImage(
        req.file.buffer,
        req.file.originalname
    );

         const post = await postModel.create({
            image: image.url,
            caption: caption,
            user: user.id
        })
    
            res.send("Post created sucessfully")
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Error creating post",
            error: err.message
        })
    }
}

async function getAllPosts(req, res){

    try{
        const posts = await postModel.find()

        return res.status(200).json({
            message: "posts fetched successfully",
            posts
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Error fetching posts",
            error: err.message
        })
        
    }
}

async function getUserPosts(req, res){
    const userId = req.params.userId;

    try{
        const posts = await postModel.find().populate("user", "username, email")
    
        return res.status(200).json({
            message: "Fetched user posts successfully",
            posts
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Error fetching user posts",
            error: err.message
        })
        
    }
    
}


module.exports = {createPost, getAllPosts, getUserPosts};