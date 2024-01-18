const mongo = require('mongoose');

const UserSchema = new mongo.Schema({
    userID : String,
    username : String,
    role : String,
    preferences : [String],
    submittedBooks : [String],
});

const BookSubmissionSchema = new mongo.Schema({
    books : [{ bookName : String, userID : String, status : String}],
    startDate : String,
    endDate : String,
});


const CurrentReadingListSchema = new mongo.Schema({
    books : [String],
    startDate : String,
    endDate : String,
});

const User = mongo.model('User', UserSchema);

const BookSubmission = mongo.model('BookSubmission', BookSubmissionSchema);

const CurrentReadingList = mongo.model('CurrentReadingList', CurrentReadingListSchema);

module.exports = {User, BookSubmission, CurrentReadingList};