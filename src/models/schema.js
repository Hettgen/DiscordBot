const mongo = require('mongoose');

const UserSchema = new mongo.Schema({
    userID : String,
    username : String,
    submittedBooks : [String],
});



const BookSchema = new mongo.Schema({
    userID : String,
    bookName : String, 
    isActive : Boolean,
});

const User = mongo.model('User', UserSchema);

const Book = mongo.model('Book', BookSchema);

module.exports = {User, Book};