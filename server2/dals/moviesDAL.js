const axios = require('axios');
const sourcePath = 'https://api.tvmaze.com/shows';

exports.getMovies = () => {
    console.log('👻 0');
    
    return new Promise( async (resolve, reject) => {
        console.log('👻 1');
        let response = await axios.get(sourcePath);
        if (response.data) {
            console.log('👻 2');
            resolve(response.data);
        } else {
            console.log('👻 3');
            reject({});
        }
    })
};