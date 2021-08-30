const moviesDAL = require('../DAL/moviesDAL');
const membersDAL = require('../DAL/membersDAL')
const subscriptionsDAL = require('../DAL/subscriptionsDAL')

exports.getAllMembers = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let allMovies = await moviesDAL.getAllMovies();
            let allSubscriptions = await subscriptionsDAL.getAllSubscriptions();
            let allMembers = await membersDAL.getAllMembers();
            
            // Data shaping
            let data = allSubscriptions.map(subscription => {
                    // get member's name, email & city
                    let memberDetails = allMembers.find(member => member._id == subscription.MemberId);
                    
                    // get movie names and sub' dates
                    let memberMovies = subscription.Movies.map(memberMovie => {
                        let movieWatchDetails = allMovies.find(movie => {
                            return movie._id == memberMovie.movieId;
                        })
                        return {id: movieWatchDetails._id, title: movieWatchDetails.Name, date: memberMovie.date};
                    });
                    
                    return {
                        subId: subscription._id,
                        id: subscription.MemberId,
                        name: memberDetails.Name,
                        email: memberDetails.Email,
                        city: memberDetails.City,
                        movies: memberMovies
                    }
            });
            resolve(data);
        } catch(err) {
            reject(err);
        }
        
    });
}

exports.subscribeToMovie = (data) => {
    return new Promise (async (resolve, reject) => {
        try {
            const date = new Date();
            let subs = await subscriptionsDAL.subscribeToMovie(data.subId, data.movieId, date);
            resolve("ok");
        }
        catch(err) {
            console.error(err);
            reject(err);
        }
    });
}

exports.getMember = (id) => {
    return new Promise(async (resolve, reject) => {
        let member = await membersDAL.getMember(id);
        if (member) {
            resolve(member);
        } else {
            reject({});
        }
    });
}

exports.createMember = (data) => {
    return new Promise( async (resolve, reject) => {
        let member = await membersDAL.createMember(data);
        if (member) {
            resolve({});
        } else {
            reject({});
        }
    })
}

exports.updateMember = (data) => {
    return new Promise( async (resolve, reject) => {
        let resData = await membersDAL.updateMember(data.member.id, data);
        if (!resData.error) {
            resolve(resData);
        } else {
            reject({});
        }
    })
}

exports.deleteMember = (id) => {
    return new Promise( async (resolve, reject) => {
        let member = await membersDAL.deleteMember(id);
        if (member) {
            // remove member from all subscriptions
            await subscriptionsDAL.removeMember(id);
            resolve(member);
        } else {
            reject({});
        }
    })
}