const express = require("express")
const Post = require("./post") // new
const router = express.Router()

// Get all posts
router.get("/movies", async (req, res) => {
	const posts = await Post.find()
	res.send(posts)
})

router.post("/movies", async (req, res) => {
	const post = new Post({
        title: req.body.title, // String is shorthand for {type: String}
        rating: req.body.rating,
        price: req.body.price,
        poster: req.body.poster,
        trailer: req.body.trailer,
        playing: req.body.playing
	})
	await post.save()
	res.send(post)
})

module.exports = router