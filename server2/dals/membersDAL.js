const axios = require('axios');
const sourcePath = 'https://jsonplaceholder.typicode.com/users';

exports.getMembers = () => {
    console.log('👻 populating members');
    
    return new Promise( async (resolve, reject) => {
        let response = await axios.get(sourcePath);
        if (response.data) {
            resolve(response.data);
        } else {
            reject({});
        }
    })
};