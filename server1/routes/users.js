var express = require("express");
var router = express.Router();
var usersBL = require("../BL/usersBL");

router.get("/", async function (req, res, next) {
	let users = await usersBL.getUsers();
	res.json(users);
});

router.put("/", async function (req, res, next) {
	let users = await usersBL.getUsers();
	res.json(users);
});

router.post("/add_user", async function (req, res, next) {
	let isNewUser = true;
	let status = await usersBL.checkUserForm(req.body, isNewUser);

	if (status == "ok") {
		res.redirect("/api/users");
	} else {
		res.json({ error: status });
	}
});

router.put("/update_user", async function (req, res, next) {
	let isNewUser = false;
	let status = await usersBL.checkUserForm(req.body, isNewUser);

	if (status == "ok") {
		let users = await usersBL.getUsers();
		res.json(users);
	} else {
		res.json({ error: status });
	}
});

router.get("/delete/:id", async (req, res, next) => {
	let status = await usersBL.deleteUser(req.params.id);
	let users = await usersBL.getUsers();
	res.redirect("/api/users");
});

module.exports = router;
