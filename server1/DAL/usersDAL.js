const { json } = require('express');
let jsonfile = require('jsonfile');
const PATH = __dirname + "/../data_sources/Users.json";

exports.getItems = () => {
    return new Promise ( (resolve, reject) => {
        jsonfile.readFile(PATH, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.users);
            }
        })
    })
}

exports.saveItems = (items) => {
    return new Promise( (resolve, reject) => {
        jsonfile.writeFile(PATH, {users: items}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("ok");
            }
        });
    });
}

exports.addUser = (user) => {
    return new Promise ( async (resolve, reject) => {
        let users = await this.getItems();
        console.log('👻 current users: %j', users);
        let filteredUsers = users.filter(aUser => aUser.id != user.id);
        console.log('👻 filtered users: %j', filteredUsers);
        
        filteredUsers.push(user);
        this.saveItems(filteredUsers);
        resolve("ok");
    });
}