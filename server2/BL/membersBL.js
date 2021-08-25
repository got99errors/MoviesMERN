const membersDAL = require('../dals/membersDAL');
const Model = require('../models/memberModel')

exports.getAll = () => {
    return new Promise(async (resolve, reject) => {
        Model.find({}, async (err, items) => {
            if (err) {
                reject(err);
            } else {
                if (items.length == 0) {
                    // db collection is empty, populate it
                    // fetch remote members and populate collection
                    let members = await membersDAL.getMembers();
                    members.forEach(member => {
                        // Create db member object
                        let newMember = new Model({
                            Name: member.name,
                            Email: member.email,
                            City: member.address.city
                        });
                        // Insert object
                        newMember.save((err, newMember) => {
                            if (err) {
                                console.log('👻 saved member error: ' + err);
                            }
                        });
                    });
                    Model.find({}, (err, dbMembers) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(dbMembers);
                        }
                    });
                } else {
                    Model.find({}, (err, dbMembers) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(dbMembers);
                        }
                    });
                }
            }
        })
    })
}

exports.getItemById = (id) => {
    return new Promise ( (resolve, reject) => {
        Model.findById(id, (err, item) => {
            if (err) {
                reject(err);
            } else {
                resolve(item);
            }
        });
    })
}

exports.addItem = (obj) => {
    return new Promise ( (resolve, reject) => {
        let shapedObj = new Model({
            Name: obj.member.name,
            Email: obj.member.email,
            City: obj.member.city
        });
        console.log('👻 addItem Will create item %j', shapedObj);
        
        // Insert object
        shapedObj.save(async (err, newMember) => {
            if (err) {
                console.log('👻 addItem saved member error: ' + err);
            } else {
                console.log('👻 addItem did create item %j', newMember);
                resolve(newMember);
            }
        });
    })
}

exports.updateItem = (id, obj) => {
    console.log('👻 obj: %, %',obj,id);
    let shapedObj = {
        Name: obj.member.name,
        Email: obj.member.email,
        City: obj.member.city
    };
    console.log('👻 shapedObj: %',shapedObj);
    return new Promise ( async (resolve, reject) => {
        Model.findByIdAndUpdate(id, shapedObj, async (err) => {
            if (err) {
                reject(err);
                console.error('👻 updateItem: %',err);
                
            } else {
                console.log('👻 updateItem success');
                let items = await this.getAll();
                resolve(items);
            }
        })
    })
}

exports.deleteItem = (id) => {
    return new Promise (async (resolve, reject) => {
        Model.findByIdAndDelete(id, async (err) => {
            if (err) {
                reject(err);
            } else {
                let items = await this.getAll();
                resolve(items);
            }
        })
    })
}

