const express = require("express");
const postController = require("../Controllers/post.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post("/create", authMiddleware, upload.single("image"), postController.createPost);
router.get("/fetch", authMiddleware, postController.getAllPosts );
router.get("/user/:id", authMiddleware, postController.getUserPosts);

module.exports = router;