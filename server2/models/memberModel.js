let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let MemberSchema = new Schema ({
    Name: String,
    Email: String,
    City: String
});

module.exports = mongoose.model('members', MemberSchema);