const express = require("express");
const router = express.Router();

const jwtauth = require("../middlewares/security/jwtauth");

//ROUTE     POST       users_follow
const users_follow = require("../controllers/follow/users-follow");
router.post("/users-follow", users_follow.post_users_follow);

//ROUTE     POST       users_followers
const users_followers = require("../controllers/follow/users-followers");
router.post("/users-followers", users_followers.post_users_followers);

//ROUTE     POST       users_following
const users_following = require("../controllers/follow/users-following");
router.post("/users-following", users_following.post_users_following);

//ROUTE     POST       users_unfollow
const users_unfollow = require("../controllers/follow/users-unfollow");
router.post("/users-unfollow", users_unfollow.post_users_unfollow);
    
module.exports = router;
