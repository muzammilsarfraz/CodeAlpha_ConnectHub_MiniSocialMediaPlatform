const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Login User
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Follow User
const followUser = async (req, res) => {

    try {

        const { userId } = req.body;

        const currentUser = await User.findById(userId);
        const targetUser = await User.findById(req.params.id);

        if (!currentUser || !targetUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (currentUser.following.includes(targetUser._id)) {
            return res.status(400).json({
                message: "Already following this user"
            });
        }

        currentUser.following.push(targetUser._id);
        targetUser.followers.push(currentUser._id);

        await currentUser.save();
        await targetUser.save();

        res.json({
            message: "User followed successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Unfollow User
const unfollowUser = async (req, res) => {

    try {

        const { userId } = req.body;

        const currentUser = await User.findById(userId);
        const targetUser = await User.findById(req.params.id);

        if (!currentUser || !targetUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        currentUser.following = currentUser.following.filter(
            id => id.toString() !== targetUser._id.toString()
        );

        targetUser.followers = targetUser.followers.filter(
            id => id.toString() !== currentUser._id.toString()
        );

        await currentUser.save();
        await targetUser.save();

        res.json({
            message: "User unfollowed successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser,
    followUser,
    unfollowUser
};