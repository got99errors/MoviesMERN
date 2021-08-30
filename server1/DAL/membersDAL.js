const axios = require('axios');
const dal = require('../configs/DAL')
const sourcePath = dal.base_url + '/members';

exports.getAllMembers = () => {
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
    return new Promise( async (resolve, reject) => {
        let res = await axios.get(sourcePath+'/'+id);
        if (res.data) {
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
            resolve(res.data);
        } else {
            reject({});
        }
    });
}