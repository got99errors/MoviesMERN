let userDetailsDAL = require("../DAL/usersDAL");
let userLoginModel = require("../models/userModel");
let usersPermissionsDAL = require("../DAL/permissionsDAL");
let mongoose = require("mongoose");
const ADMIN_USERNAME = "admin";

// Connection String
mongoose.connect(
	"mongodb://localhost:27017/UsersDB",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	() => {
		seedDB();
	}
);

function seedDB() {
	return new Promise(async (resolve, reject) => {
		try {
			// get users
			let users = await userLoginModel.find({});
			if (users.length === 0) {
				await populateWithAdmin();
			}
			resolve();
		} catch (e) {
            console.error(e);
            reject(e)
        }
	});
}

const populateWithAdmin = () => {
	return new Promise(async (resolve, reject) => {
		let adminLoginUser = new userLoginModel({
			Username: Admin.username,
			Password: "1234",
		});

		adminLoginUser.save(async (err, doc) => {
			if (err) {
				reject(err);
			} else {
				await usersPermissionsDAL.addUser({
					id: doc._id,
					permissions: Admin.permissions,
				});
				await userDetailsDAL.addUser({
					id: doc._id,
					username: Admin.username,
					first_name: "admin",
					last_name: "admin",
					created_date: Date.now(),
					session_timeout: 1000,
				});
				resolve("ok");
			}
		});
	});
};

const Admin = {
	username: ADMIN_USERNAME,
	permissions: [
		"View Movies",
		"Create Movies",
		"Delete Movies",
		"Update Movies",
		"View Subscriptions",
		"Create Subscriptions",
		"Delete Subscriptions",
		"Update Subscriptions",
	],
};
