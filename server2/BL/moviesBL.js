const moviesDAL = require('../dals/moviesDAL');
const Model = require('../models/movieModel')

exports.getAll = () => {

    return new Promise(async (resolve, reject) => {
        Model.find({}, async (err, items) => {
            if (err) {
                reject(err);
            } else {
                if (items.length == 0) {
                    // db collection is empty, populate it
                    // fetch remote movies and populate collection
                    let movies = await moviesDAL.getMovies();
                    movies.forEach(movie => {
                        // Create db movie object
                        let newMovie = new Model({
                            Name: movie.name,
                            Genres: movie.genres,
                            Image: movie.image.medium,
                            Premiered: movie.premiered
                        });
                        // Insert object
                        newMovie.save((err, newMovie) => {
                            if (err) {
                                console.error('👻 saved movie error: ' + err);
                            }
                        });
                    })
                    Model.find({}, (err, dbMovies) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(dbMovies);
                        }
                    });
                } else {
                    Model.find({}, (err, dbMovies) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(dbMovies);
                        }
                    });
                }
            }
        })
    })
}

exports.getItemById = (id) => {
    return new Promise ( (resolve, reject) => {
        Model.findById(id, (err, item) => {
            if (err) {
                reject(err);
            } else {
                resolve(item);
            }
        });
    })
}

exports.addItem = (obj) => {
    return new Promise ( async (resolve, reject) => {
        // Create db object
        
        let newItem = new Model({
            Name: obj.name,
            Genres: obj.genres,
            Image: obj.image,
            Premiered: obj.year
        });
        // Insert object
        newItem.save(async (err, newItem) => {
            if (err) {
                console.error('👻 saved movie error: ' + err);
            } else {
                let items = await this.getAll();
                resolve(items);
            }
        });
    })
}

exports.updateItem = (id, obj) => {
    return new Promise ( async (resolve, reject) => {
        Model.findByIdAndUpdate(id, obj, async (err) => {
            if (err) {
                reject(err);
            } else {
                let items = await this.getAll();
                resolve(items);
            }
        })
    })
}

exports.deleteItem = (id) => {
    return new Promise (async (resolve, reject) => {
        Model.deleteOne({_id: id}, async (err) => {
            if (err) {
                reject(err);
            } else {
                let items = await this.getAll();
                resolve(items);
            }
        })
    })
}