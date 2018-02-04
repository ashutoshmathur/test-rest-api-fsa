var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/users-db");

var db = mongoose.connection;
var schema = mongoose.Schema;

var userSchema = new schema({
    userName: String,
    todo: String,
    date: {
        type: Date,
        default: Date.now
    }
});

var userModel = mongoose.model('userModel', userSchema);

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function() {
    console.log('database connection established');
});

function closeDB() {
    db.close();
}

module.exports.userModel = userModel;
module.exports.closeDB = closeDB;