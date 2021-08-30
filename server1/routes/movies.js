var express = require("express");
var router = express.Router();
var moviesBL = require("../BL/moviesBL");

/* GET users listing. */
router.get("/", async function (req, res, next) {
	let movies = await moviesBL.getAllMovies();
	res.json(movies)
});

// validate and submit changes
router.post("/add_movie", async (req, res, next) => {
	await moviesBL.createMovie(req.body.movie);
	let movies = await moviesBL.getAllMovies();
	res.json(movies)
});

router.put("/update_movie", async(req, res, next) => {
	await moviesBL.updateMovie(req.body.movie);
	let movies = await moviesBL.getAllMovies();
	res.json(movies);
});

router.get("/delete/:id", async (req, res, next) => {
	let id = req.params.id;
	await moviesBL.deleteMovie(id);
	let movies = await moviesBL.getAllMovies();
	res.json(movies)
});

module.exports = router;
