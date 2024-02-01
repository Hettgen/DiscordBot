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
    wasSubmitted : Boolean,
});


const bookClubSessionSchema = new mongo.Schema({
    books : [BookSchema],
    isActive : Boolean,
});

const User = mongo.model('User', UserSchema);

const Book = mongo.model('Book', BookSchema);

const BookClubSession = mongo.model('ClubSession', bookClubSessionSchema);

module.exports = {User, Book, BookClubSession};