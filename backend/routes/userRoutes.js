const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    followUser,
    unfollowUser
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);

module.exports = router;