const axios = require('axios');
const sourcePath = 'https://api.tvmaze.com/shows';

exports.getMovies = () => {
    return new Promise( async (resolve, reject) => {
        let response = await axios.get(sourcePath);
        if (response.data) {
            resolve(response.data);
        } else {
            reject({});
        }
    })
};