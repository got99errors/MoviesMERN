let userDetailsDAL = require("../DAL/usersDAL");
let usersPermissionsDAL = require("../DAL/permissionsDAL");
let userLoginModel = require("../models/userModel");
let mongoose = require("mongoose");
// let permissionConstants = require("../_constants/permissions.constants")
let permissionConstants = require("../_constants/permissions.constants");

exports.canLogin = (loginDetails) => {
	return new Promise((resolve, reject) => {
		let username = loginDetails.username;
		let password = loginDetails.password;

		if (username.length > 0 && password.length > 0) {
			userLoginModel.find({ Username: username }, (err, objs) => {
				if (err) {
					reject(err);
				} else {
					if (objs.length > 0) {
						let user = objs[0];
						if (user.Password == password) {
							resolve("ok");
						} else {
							resolve("Wrong password");
						}
					} else {
						resolve("Did not find username '" + username + "'");
					}
				}
			});
		} else {
			if (username.length == 0) {
				resolve("Please enter a username");
			} else {
				resolve("Please type a password");
			}
		}
	});
};

// Prepare the session for this user
exports.userDidLogin = (request, username) => {
	return new Promise(async (resolve, reject) => {
		userLoginModel.find({ Username: username }, async (err, dbUsers) => {
			if (err) {
				reject(err);
			} else {
				if (dbUsers.length > 0) {
					let dbUser = dbUsers[0];
					let userId = dbUser._id;
					let usersDetails = await userDetailsDAL.getItems();

					// Get user details
					let filteredUsers = usersDetails.filter(
						(userDetails) => userDetails.id == userId
					);
					if (filteredUsers.length > 0) {
						let userDetails = filteredUsers[0];

						// Get user permissions
						let usersPermissions = await usersPermissionsDAL.getItems();
						let filteredPermissionsUsers = usersPermissions.filter(
							(pUser) => pUser.id == userDetails.id
						);
						let user = {
							permissions: filteredPermissionsUsers[0].permissions,
							username: username,
							details: userDetails,
							error: null,
						};
						resolve(user);
					} else {
						resolve({ error: "No user was found :(" });
					}
				} else {
					resolve({ error: "no user with username '" + username + "'" });
				}
			}
		});
	});
};

exports.validateNewAccount = (loginDetails) => {
	return new Promise((resolve, reject) => {
		let username = loginDetails.username;
		let password = loginDetails.password;
		if (username.length == 0) {
			resolve("Enter a username");
		} else if (password.length == 0) {
			resolve("Enter a password");
		} else if (password == "newUser") {
			resolve("Please enter a different password...");
		} else {
			userLoginModel.find({ Username: username }, (err, res) => {
				if (err) {
					reject(err);
				} else {
					if (res.length > 0) {
						if (res[0].Password !== "newUser") {
							resolve("Password is already set for username '" + username);
						} else {
							// update the new password
							userLoginModel.findByIdAndUpdate(
								res[0]._id,
								{ Username: username, Password: password },
								(err, obj) => {
									if (err) {
										reject(err);
									} else {
										resolve("ok");
									}
								}
							);
						}
					} else {
						resolve("User name does not exist");
					}
				}
			});
		}
	});
};

// returns joined data of multiple users db
// ? can make this more efficient
exports.getUsers = () => {
	return new Promise(async (resolve, reject) => {
		let usersDetails = await userDetailsDAL.getItems();
		let usersPermissions = await usersPermissionsDAL.getItems();

		userLoginModel.find({}, (err, docs) => {
			// get user details
			let users = usersDetails.map((user) => {
				let outputUser = user;
				// Add permissions data
				let filteredUsers = usersPermissions.filter(
					(pUser) => pUser.id == user.id
				);
				if (filteredUsers.length > 0) {
					outputUser.permissions = filteredUsers[0].permissions.join();
					outputUser.SessionTimeOut = user.SessionTimeOut;
				}
				return outputUser;
			});

			users = users.map((user) => {
				let outputUser = user;
				// Add username data
				let filteredUsers = docs.filter((doc) => doc._id == user.id);

				if (filteredUsers.length > 0) {
					outputUser.username = filteredUsers[0].Username;
				}
				return outputUser;
			});
			resolve(users);
		});
	});
};

exports.getUser = (id, users) => {
	let user = users.filter((aUser) => aUser.id == id);
	if (user.length > 0) {
		return user[0];
	} else {
		return null;
	}
};

let isValidForm = (form) => {
	if (form.user.first_name.length == 0) {
		return "Enter first name";
	} else if (form.user.last_name.length == 0) {
		return "Enter last name";
	} else if (form.user.username.length == 0) {
		return "Enter user name";
	} else if (form.user.session_timeout.length == 0) {
		return "Enter session time out";
	}
	return "ok";
};

let createUserPermissions = (form) => {
	let permissions = [...form.user.permissions];
	return permissions;
};

exports.checkUserForm = (form, isNewUser) => {
	return new Promise(async (resolve, reject) => {
		let formValidationResult = isValidForm(form);

		if (formValidationResult != "ok") {
			resolve(formValidationResult);
		} else {
			userLoginModel.find(
				{ Username: form.user.username },
				async (err, res) => {
					if (res.length > 0 && isNewUser) {
						resolve("User name already exists.");
					} else {
						if (isNewUser) {
							let newUser = new userLoginModel({
								Username: form.user.username,
								Password: "newUser",
							});
							newUser.save(async (err, doc) => {
								if (err) {
									reject(err);
								} else {
									await usersPermissionsDAL.addUser({
										id: doc._id,
										permissions: form.user.permissions,
									});
									await userDetailsDAL.addUser({
										id: doc._id,
										username: form.user.username,
										first_name: form.user.first_name,
										last_name: form.user.last_name,
										created_date: Date.now(),
										session_timeout: Number(form.user.session_timeout),
									});
									resolve("ok");
								}
							});
						} else {
							let user = res[0];
							await usersPermissionsDAL.addUser({
								id: user._id,
								permissions: form.user.permissions,
							});
							await userDetailsDAL.addUser({
								id: user._id,
								username: form.user.username,
								first_name: form.user.first_name,
								last_name: form.user.last_name,
								created_date: Date.now(),
								session_timeout: Number(form.user.session_timeout),
							});
							resolve("ok");
						}
					}
				}
			);
		}
	});
};

exports.deleteUser = (id) => {
	return new Promise(async (resolve, reject) => {
		// Remove from db
		userLoginModel.findByIdAndDelete(id, (err, docs) => {
			if (err) {
				reject(err);
			}
		});

		// Remove from user details JSON
		let allUserDetails = await userDetailsDAL.getItems();
		let index = allUserDetails.findIndex((user) => user.id == id);
		if (index >= 0) {
			allUserDetails.splice(index, 1);
			await userDetailsDAL.saveItems(allUserDetails);
		}

		// Remove from user permissions JSON
		let allUserPermissions = await usersPermissionsDAL.getItems();
		index = allUserPermissions.findIndex((user) => user.id == id);
		if (index >= 0) {
			allUserPermissions.splice(index, 1);
			await usersPermissionsDAL.saveItems(allUserPermissions);
		}
		resolve({});
	});
};

exports.sessionUser = (session) => {
	let user = {
		name: session.fullName,
		username: session.username,
		timeleft: session.cookie.maxAge,
		expires: session.cookie.expires,
		permissions: session.permissions,
	};
	return user;
};

exports.canViewMovies = (permissions) => {
	return permissions.includes("View Movies");
};

exports.canViewSubscriptions = (permissions) => {
	return permissions.includes("View Subscriptions");
};
