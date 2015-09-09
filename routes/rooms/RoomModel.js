// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var roomSchema = new Schema({
    name: String,
    "switches": [{
        name: String,
        gpio: String,
        state: String
    }],
    createdAt: Date,
    updatedAt: Date
});

// the schema is useless so far
// we need to create a model using it
var RoomModel = mongoose.model('room', roomSchema);

// make this available to our users in our Node applications
module.exports = RoomModel;
