// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var roomSchema = new Schema({
    name:String,
    "switch": [{
        name: String
    }],
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var RoomModel = mongoose.model('room', roomSchema);

// make this available to our users in our Node applications
module.exports = RoomModel;
