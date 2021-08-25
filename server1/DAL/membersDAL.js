const axios = require('axios');
const sourcePath = 'http://localhost:3000/api/members';

exports.getAllMembers = () => {
    console.log('👻 getting members');
    return new Promise( async (resolve, reject) => {
        let res = await axios.get(sourcePath);
        if (res.data) {
            resolve(res.data);
        } else {
            reject({});
        }
    });
}

exports.getMember = (id) => {
    console.log('👻 getting member with id '+id+' at '+sourcePath+'/'+id);
    return new Promise( async (resolve, reject) => {
        let res = await axios.get(sourcePath+'/'+id);
        if (res.data) {
            console.log('👻 got member %j', res.data);
            resolve(res.data);
        } else {
            reject({});
        }
    })
}

exports.updateMember = (id, data) => {
    return new Promise( async (resolve, reject) => {
        let res = await axios.put(sourcePath+'/'+id, data);
        if (res.data) {
            console.log('👻 updated member %j', res.data);
            resolve(res.data);
        } else {
            reject({});
        }
    });
}

exports.createMember = (data) => {
    return new Promise( async (resolve, reject) => {
        let res = await axios.post(sourcePath, data);
        if (res.data) {
            console.log('👻 added member %j', res.data);
            resolve(res.data);
        } else {
            reject({});
        }
    });
}

exports.deleteMember = (id) => {
    return new Promise( async (resolve, reject) => {
        let res = await axios.delete(sourcePath+'/'+id);
        if (res.data) {
            console.log('👻 delete member %j', res.data);
            resolve(res.data);
        } else {
            reject({});
        }
    });
}