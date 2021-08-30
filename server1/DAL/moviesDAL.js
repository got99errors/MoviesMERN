const axios = require('axios');
const dal = require('../configs/DAL')
const sourcePath = dal.base_url + '/movies';

exports.getAllMovies = () => {
    return new Promise( async (resolve, reject) => {
        let res = await axios.get(sourcePath);
        if (res.data) {
            resolve(res.data);
        } else {
            reject({});
        }
    });
}

exports.getMovie = (id) => {
    return new Promise( async (resolve, reject) => {
        let res = await axios.get(sourcePath+'/'+id);
        if (res.data) {
            resolve(res.data);
        } else {
            reject({});
        }
    });
}


exports.updateMovie = (id, data) => {
    return new Promise( async (resolve, reject) => {
        let shapedData = {
            Name: data.title, 
            Genres: data.genres, 
            Image: data.image,
            Premiered: data.year
        };
        let res = await axios.put(sourcePath+'/'+id, shapedData);
        if (res.data) {
            resolve(res.data);
        } else {
            reject({});
        }
    });
}

exports.createMovie = (data) => {
    return new Promise( async (resolve, reject) => {
        let shapedData = {
            name: data.title, 
            genres: data.genres, 
            image: data.image,
            year: data.year
        };
        let res = await axios.post(sourcePath, shapedData);
        if (res.data) {
            resolve(res.data);
        } else {
            reject({});
        }
    });
}

exports.deleteMovie = (id) => {
    return new Promise( async (resolve, reject) => {
        let res = await axios.delete(sourcePath+'/'+id);
        if (res.data) {
            resolve(res.data);
        } else {
            reject({});
        }
    });
}