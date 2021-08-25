var express = require("express");
var router = express.Router();
var usersBL = require("../BL/usersBL");
var membersBL = require("../BL/membersBL");
var moviesBL = require("../BL/moviesBL");


let didSessionExpire = (session) => {return false;
	if (session.cookie.expires == null) { return true;}
	  let timeToExpire = (Date.parse(session.cookie.expires) - Date.now())/1000;
	  console.log('👻 timeToExpire: '+timeToExpire);
	  return timeToExpire == null ||timeToExpire == 'undefined' || timeToExpire < 0;
  }

/* GET Subscriptions listing. */
router.get("/", async function (req, res, next) {
	let members = await membersBL.getAllMembers();
	console.log('👻 members count '+members.length);
	res.json(members);
});

// ? how to subscribe without reloading the page?
router.post("/subscribeToMovie", async (req, res, next) => {
	let status = await membersBL.subscribeToMovie(req.body.movieSubscription);
	let members = await membersBL.getAllMembers();
	res.json(members);
});

// render edit page
// router.get("/edit/:id", async (req, res, next) => {
// 	let timeToExpire = Date.parse(req.session.cookie.expires) - Date.now();
// 	if (timeToExpire < 0) {
// 		res.redirect("login");
// 	} else {
// 		let id = req.params.id;
// 		let data = await membersBL.getMember(id);
// 		let user = usersBL.sessionUser(req.session);
// 		res.render("edit_member", { member: data, user: user });
// 	}
// });

router.post("/add_member", async function (req, res, next) {
	let isNewUser = true;
	let data = await membersBL.createMember(req.body);
	console.log("👻 createMember status: %" , status);

	if (!data.error) {
		res.redirect("/api/members");
	} else {
		res.json({ error: data.error });
	}
});

router.put("/update_member", async function (req, res, next) {
	let isNewUser = true;
	let data = await membersBL.updateMember(req.body);
	console.log("👻 createMember data: %" , data);

	if (!data.error) {
		let members = await membersBL.getAllMembers();
		res.json(members);
	} else {
		res.json({ error: data.error });
	}
});

// validate and submit changes
router.post("/edit/:id?", async (req, res, next) => {
	let timeToExpire = Date.parse(req.session.cookie.expires)-Date.now();
  if (timeToExpire < 0 ) {
    res.redirect("login");
  } else{let id = req.params.id;
	if (id) {
		await membersBL.updateMember(req.params.id, req.body);
	} else {
		await membersBL.createMember(req.body);
	}
	res.redirect("/members");}
});

router.get("/delete/:id", async (req, res, next) => {
	let id = req.params.id;
	await membersBL.deleteMember(id);
	let members = await membersBL.getAllMembers();
	res.json(members)
});

module.exports = router;
