const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");

const router = express.Router();

// Get Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("user").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Create Post
router.post("/", async (req, res) => {
  const { userId, content } = req.body;
  try {
    const post = new Post({ user: userId, content });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// Like Post
router.post("/like/:postId", async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      await post.save();
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to like post" });
  }
});

module.exports = router;
