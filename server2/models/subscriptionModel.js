let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let SubscriptionSchema = new Schema ({
    MemberId: Schema.ObjectId,
    Movies: [{movieId: Schema.ObjectId, date: Date}]
});

module.exports = mongoose.model('subscriptions', SubscriptionSchema);