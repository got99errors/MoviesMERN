let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let MemberSchema = new Schema ({
    Username: String,
    Password: String
});

module.exports = mongoose.model('users', MemberSchema);