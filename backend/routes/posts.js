import express from "express";
import Post from "../models/Post.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, userName, text } = req.body;
    if (!text) return res.status(400).json({ error: "Post text required" });
    const newPost = new Post({ userId, userName, text });
    await newPost.save();
    res.json(newPost);
  } catch (err) { console.error(err); res.status(500).json({ error: "Server error" }); }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) { console.error(err); res.status(500).json({ error: "Server error" }); }
});

export default router;
