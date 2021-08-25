let jsonfile = require('jsonfile');
const PATH = __dirname + "/../data_sources/Permissions.json";

exports.getItems = () => {
    return new Promise ( (resolve, reject) => {
        jsonfile.readFile(PATH, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.permissions);
            }
        })
    })
}

exports.saveItems = (items) => {
    return new Promise( (resolve, reject) => {
        jsonfile.writeFile(PATH, {permissions: items}, (err) => {
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
        let filteredUsers = users.filter(aUser => aUser.id != user.id);
        filteredUsers.push(user);
        this.saveItems(filteredUsers);
        resolve("ok");
    });
}