const axios = require('axios');
const { DAL_BASE_URL } = require('../configs/DAL');
const dal = require('../configs/DAL')
const sourcePath = dal.base_url + '/subscriptions';

exports.getAllSubscriptions = () => {
    return new Promise(async (resolve, reject) => {
        let res = await axios.get(sourcePath);
        if (res.data) {
            resolve(res.data);
        } else {
            reject({});
        }
    });
}

exports.subscribeToMovie = (subId, movieId, date) => {
    return new Promise(async (resolve, reject) => {
        let res = await axios.put(sourcePath+"/"+subId, {movieId: movieId, date: date});
        if (res.data) {
            resolve(res.data);
        } else {
            reject({});
        }
    })
};

// update all subscriptions after a movie is removed from the website's movies section
exports.removeMovie = (movieId) => {
    return new Promise(async (resolve, reject) => {
        let res = await axios.put(sourcePath+"/removeMovie/"+movieId);
        if (res.data) {
            resolve(res.data);
        } else {
            reject({});
        }
    })
}

// update all subscriptions after a member is removed from the website's members section
exports.removeMember = (memberId) => {
    return new Promise(async (resolve, reject) => {
        let res = await axios.put(sourcePath+"/removeMember/"+memberId);
        if (res.data) {
            resolve(res.data);
        } else {
            reject({});
        }
    })
}