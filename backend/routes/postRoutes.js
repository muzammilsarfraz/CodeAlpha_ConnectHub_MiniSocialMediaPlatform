const express = require("express");
const router = express.Router();

const {
    createPost,
    getPosts,
    likePost,
    unlikePost
} = require("../controllers/postController");

router.post("/", createPost);
router.get("/", getPosts);
router.put("/:id/like", likePost);
router.put("/:id/unlike", unlikePost);

module.exports = router;