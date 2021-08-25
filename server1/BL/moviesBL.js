const moviesDAL = require('../DAL/moviesDAL');
const membersDAL = require('../DAL/membersDAL')
const subscriptionsDAL = require('../DAL/subscriptionsDAL')

exports.getAllMovies = () => {
    return new Promise( async (resolve, reject) => {
        try {

            console.log('all movies: soon');
            let allMovies = await moviesDAL.getAllMovies();
            console.log('all movies: ', allMovies.length);
            let allSubscriptions = await subscriptionsDAL.getAllSubscriptions();
            let allMembers = await membersDAL.getAllMembers();
            let data = allMovies.map(movie => {
                let subscribers = allSubscriptions.filter(subscriber => {
                    let movieIDs = subscriber.Movies.map(movie => movie.movieId);
                    return movieIDs.includes(movie._id);
                });
                let watchData = subscribers.map(subscriber => {
                    let watchers = allMembers.find(member => member._id == subscriber.MemberId);
                    let movieWatchDate = subscriber.Movies.find(subMovie => subMovie.movieId == movie._id).date;

                    return {MemberId: subscriber.MemberId, Name: watchers.Name, WatchDate: movieWatchDate};
                })
                return {
                    id: movie._id,
                    title: movie.Name,
                    genres: movie.Genres,
                    year: movie.Premiered,
                    image: movie.Image,
                    subscriptions: watchData
                }
            })
            resolve(data);
        } catch(err) {
            console.log('👻 rejected: %j',err);
            reject(err);
        }
        
    });
}

// returns a single movie
exports.getMovie = (id) => {
    return new Promise( async (resolve, reject) => {
        console.log('👻 get movie');
        
        let movie = await moviesDAL.getMovie(id);
        resolve(movie);
    });
};

// returns an array which holds the requested movie only
exports.getSelectedMovie = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            console.log('👻 get selected movie');
            let targetMovie = await moviesDAL.getMovie(id);
            let movies = [targetMovie];
            let subscriptions = await subscriptionsDAL.getAllSubscriptions();
            let members = await membersDAL.getAllMembers();

            // Data shaping
            let data = movies.map(movie => {
                let subscribers = subscriptions.filter(subscriber => {
                    let movieIDs = subscriber.Movies.map(movie => movie.movieId);
                    return movieIDs.includes(movie._id);
                });
                let watchData = subscribers.map(subscriber => {
                    let watchers = members.find(member => member._id == subscriber.MemberId);
                    let movieWatchDate = subscriber.Movies.find(subMovie => subMovie.movieId == movie._id).date;
                    return {Name: watchers.Name, WatchDate: movieWatchDate};
                })
                return {
                    id: movie._id,
                    title: movie.Name,
                    genres: movie.Genres,
                    year: movie.Premiered,
                    image: movie.Image,
                    subscriptions: watchData
                }
            })
            resolve(data);
        } catch(err) {
            console.log('👻 rejected: %j',err);
            reject(err);
        }
        
    });
}

exports.findMovies = (searchText) => {
    return new Promise( async (resolve, reject) => {
        let movies = await this.getAllMovies();
        let lowerCaseText = searchText.toLowerCase();
        let results = movies.filter(movie => movie.title.toLowerCase().includes(lowerCaseText));
        resolve(results);
    })
}

exports.updateMovie = (data) => {
    console.log('👻 update item data %j', data);
    return new Promise( async (resolve, reject) => {
        let movie = await moviesDAL.updateMovie(data.id, data);
        if (movie) {
            resolve(movie);
        } else {
            reject({});
        }
    })
}

exports.createMovie = (data) => {
    console.log('👻 add item data %j', data);
    return new Promise( async (resolve, reject) => {
        let movie = await moviesDAL.createMovie(data);
        if (movie) {
            resolve(movie);
        } else {
            reject({});
        }
    })
}

exports.deleteMovie = (id) => {
    console.log('👻 delete item: '+id);
    return new Promise( async (resolve, reject) => {
        let movie = await moviesDAL.deleteMovie(id);
        if (movie) {
            // remove movie from all subscriptions
            await subscriptionsDAL.removeMovie(id);

            // let allSubscriptions = await subscriptionsDAL.getAllSubscriptions();
            // console.log('👻 first sub before: %j',allSubscriptions[0]);
            
            // allSubscriptions.forEach(sub => {
            //     let subMovies = sub.Movies.filter(movie => movie.movieId != id);
            //     sub.Movies = subMovies;
            // })
            
            // console.log('👻 first sub after: %j',allSubscriptions[0]);
            resolve(movie);
        } else {
            reject({});
        }
    })
}