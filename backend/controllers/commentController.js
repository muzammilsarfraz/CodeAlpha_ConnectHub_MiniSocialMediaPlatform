const Comment = require("../models/commentModel");

// Add Comment
const addComment = async (req, res) => {

    try {

        const { post, user, text } = req.body;

        const comment = await Comment.create({
            post,
            user,
            text
        });

        res.status(201).json({
            message: "Comment added successfully",
            comment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get Comments for a Post
const getComments = async (req, res) => {

    try {

        const comments = await Comment.find({
            post: req.params.postId
        }).populate("user", "name profilePic");

        res.json(comments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    addComment,
    getComments
};