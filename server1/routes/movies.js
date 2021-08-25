var express = require("express");
var router = express.Router();
var usersBL = require("../BL/usersBL");
var moviesBL = require("../BL/moviesBL");

/* GET users listing. */
router.get("/", async function (req, res, next) {
	console.log("👻 movies here");
	let movies = await moviesBL.getAllMovies();
	console.log('got '+movies.length+' movies');
	res.json(movies)
});

// router.get("/add", (req, res, next) => {
// 	let timeToExpire = Date.parse(req.session.cookie.expires) - Date.now();
// 	if (timeToExpire < 0) {
// 		res.redirect("login");
// 	} else {
// 		let user = usersBL.sessionUser(req.session);
// 		res.render("add_movie", {
// 			movie: { _id: "", Name: "", Genres: "", Image: "", Premiered: "" },
// 			user: user,
// 		});
// 	}
// });

// router.get("/edit/:id", async (req, res, next) => {
// 	let timeToExpire = Date.parse(req.session.cookie.expires) - Date.now();
// 	if (timeToExpire < 0) {
// 		res.redirect("login");
// 	} else {
// 		let id = req.params.id;
// 		let data = await moviesBL.getMovie(id);
// 		console.log("👻 got movie %j", data);
// 		let user = usersBL.sessionUser(req.session);
// 		res.render("edit_movie", { movie: data, user: user });
// 	}
// });

// validate and submit changes
router.post("/add_movie", async (req, res, next) => {
	console.log('👻 adding movie body %j',req.body);
	
	await moviesBL.createMovie(req.body.movie);
	let movies = await moviesBL.getAllMovies();
	res.json(movies)
});

router.put("/update_movie", async(req, res, next) => {
	console.log('👻 update movie body %j',req.body.movie);
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

// router.get("/details/:id", async function (req, res, next) {
// 	let timeToExpire = Date.parse(req.session.cookie.expires) - Date.now();
// 	if (timeToExpire < 0) {
// 		res.redirect("login");
// 	} else {
// 		let movie = await moviesBL.getSelectedMovie(req.params.id);
// 		let user = usersBL.sessionUser(req.session);
// 		res.render("movies", { data: movie, user: user });
// 	}
// });

module.exports = router;
