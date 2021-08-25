let mongoose = require('mongoose');

// Connection String
mongoose.connect('mongodb://localhost:27017/UsersDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});