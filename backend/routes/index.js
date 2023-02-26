const { User, Post, Comment } = require("../models")
const express = require("express")
const ObjectId = require("mongodb").ObjectId

const router = express.Router()

// Add user to database if they do not already have an account
router.post("/users", async (req, res) => {
  const user = req.body
  const { username } = user
  const response = await User.findOneAndUpdate({ username: username }, user, {
    upsert: true,
    new: true,
  })

  res.status(200).send(response)
})

// Get post likes
router.get("/likes/:postId", async (req, res) => {
  const { postId } = req.params

  const postData = await Post.findById(ObjectId(postId))
  console.log("post like data", postData)
  const postLikes = postData.reactions
  console.log("after", postLikes)

  res.status(200).send(postLikes)
})

// Add like
router.post("/likes/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params

  const response = await Post.findByIdAndUpdate(postId, {
    $push: { reactions: ObjectId(userId) },
  })

  // Add a try-catch here later
  res.status(200).send("Added like")
})

// Remove like
router.delete("/likes/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params

  const response = await Post.findByIdAndUpdate(postId, {
    $pull: { reactions: ObjectId(userId) },
  })

  res.status(200).send("Removed like")
})

// Get comments for a post
router.get("/comments/:postId", async (req, res) => {
  const { postId } = req.params

  console.log(postId)

  const postData = await Post.findById(ObjectId(postId))
  console.log(postData)
  const postComments = postData?.comments
  console.log(postComments)

  res.status(200).send(postComments)
})

// Get user
router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params
  const userData = await User.findById(ObjectId(userId))

  res.status(200).send(userData)
})

// Get comment
router.get("/comments/comment/:commentId", async (req, res) => {
  const { commentId } = req.params
  const commentData = await Comment.findById(ObjectId(commentId))

  res.status(200).send(commentData)
})

module.exports = router
