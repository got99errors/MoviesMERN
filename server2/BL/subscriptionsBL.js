const Model = require("../models/subscriptionModel");

exports.createDemo = (members, movies) => {
	for (var i = 0; i < members.length; i++) {
		let subscription = new Model({
            MemberId: members[i]._id,
            Movies: [],
        });
        subscription.save((err, subscription) => {
            if (err) {
                console.error("👻 saved subscription error: " + err);
            }
        });
	}
};

exports.getAll = () => {
	return new Promise((resolve, reject) => {
		Model.find({}, (err, items) => {
			if (err) {
				reject(err);
			} else {
				resolve(items);
			}
		});
	});
};

exports.getItemById = (id) => {
	return new Promise((resolve, reject) => {
		Model.findById(id, (err, item) => {
			if (err) {
				reject(err);
			} else {
				resolve(item);
			}
		});
	});
};

exports.addItem = (obj) => {
	return new Promise(async (resolve, reject) => {
		// Create db object
		let newItem = new Model({
			MemberId: obj.MemberId,
			Movies: obj.Movies,
		});
		// Insert object
		newItem.save(async (err, newItem) => {
			if (err) {
				console.error("👻 saved new subscription error: " + err);
			} else {
				let items = await this.getAll();
				resolve(items);
			}
		});
	});
};

exports.updateItem = (id, obj) => {
	return new Promise(async (resolve, reject) => {
		Model.findById(id, async (err, item) => {
			if (err) {
				reject(err);
			} else {
				let data = { Movies: [...item.Movies, obj] };
				Model.findByIdAndUpdate(id, data, async (err) => {
					if (err) {
						reject(err);
					} else {
						let items = await this.getAll();
						resolve(items);
					}
				});
			}
		});
	});
};

exports.removeMovie = (movieId) => {
	return new Promise(async (resolve, reject) => {
		Model.find({}, async (err, items) => {
			if (err) {
				reject(err);
			} else {
				items.forEach((sub) => {
					let subMovies = sub.Movies.filter((movie) => movie.movieId != movieId);
					sub.Movies = subMovies;
                    let data = { Movies: subMovies };
                    Model.findByIdAndUpdate(sub._id, data, (err) => {
                        if (err) {
                            reject(err);
                        }
                    });
                });
                items = await this.getAll();
				resolve(items);
			}
		});
	});
};

exports.removeMember = (memberId) => {
	return new Promise(async (resolve, reject) => {
		Model.find({}, async (err, items) => {
			if (err) {
				reject(err);
			} else {
				let forDelete = []

				// find all subscriptions with this member id (should be one)
				let filteredSubsID = items.filter(sub => sub.MemberId === memberId).map(sub => sub._id);
                let cleanItems = await this.getAll();
				resolve(cleanItems);
			}
		});
	});
};

exports.deleteItem = (id) => {
	return new Promise(async (resolve, reject) => {
		Model.deleteOne({ MemberId: id }, async (err) => {
			if (err) {
				reject(err);
			} else {
				let items = await this.getAll();
				resolve(items);
			}
		});
	});
};

exports.deleteAll = () => {
    return new Promise( async (res, rej) => {
        Model.deleteMany({}, () => {
            resolve({})
        })
    })
}