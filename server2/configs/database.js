const mongoose = require('mongoose');

// Connection string
mongoose.connect('mongodb://localhost:27017/subscriptions', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
