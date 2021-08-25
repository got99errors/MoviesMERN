let mongoose = require('mongoose');

// Connection String
mongoose.connect('mongodb://mongo:27017/UsersDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});