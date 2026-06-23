const Post = require("../models/postModel");

// Create Post
const createPost = async (req, res) => {

    try {

        const { user, content, image } = req.body;

        const post = await Post.create({
            user,
            content,
            image
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Posts
const getPosts = async (req, res) => {

    try {

        const posts = await Post.find()
            .populate("user", "name profilePic followers")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Like Post
const likePost = async (req, res) => {

    try {

        const { userId } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.likes.includes(userId)) {
            return res.status(400).json({
                message: "Post already liked"
            });
        }

        post.likes.push(userId);

        await post.save();

        res.json({
            message: "Post liked successfully",
            likes: post.likes.length
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Unlike Post
const unlikePost = async (req, res) => {

    try {

        const { userId } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        post.likes = post.likes.filter(
            id => id.toString() !== userId
        );

        await post.save();

        res.json({
            message: "Post unliked successfully",
            likes: post.likes.length
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    createPost,
    getPosts,
    likePost,
    unlikePost
};