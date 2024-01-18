const fs = require('fs');
const path = require('path');
const { BookSubmission, User } = require('../models/schema');

// const submissionFilePath = path.join(__dirname, 'userSubmissions.json');

// function readUserSubmissions(){
//   if (!fs.existsSync(submissionFilePath)) {
//     fs.writeFileSync(submissionFilePath, JSON.stringify({}));
//   }
//   return JSON.parse(fs.readFileSync(submissionFilePath, 'utf-8'));
// }

// function writeUserSubmission(userId, bookName){
  
//   const submissions = readUserSubmissions();

//   submissions[userId] = bookName;

//   fs.writeFileSync(submissionFilePath, JSON.stringify(submissions, null, 2));
// }

// module.exports = {
//   readUserSubmissions,
//   writeUserSubmission,
// }

async function writeUserSubmission(userId, username, bookName) {
  try {
    let user = await User.findOne({ userID: userId });
    if (!user) {
      user = new User({ userID: userId, username: username, submittedBooks: [bookName] });
    } else {
      if (!user.submittedBooks.includes(bookName)) {
        user.submittedBooks.push(bookName);
        addBookSubmission(bookName, userId);
      }
    }
    await user.save();
  } catch (error) {
    console.error('Error writing user submission:', error);
  }
}

async function readUserSubmissions(userId) {
  try {
    const user = await User.findOne({ userID: userId });
    return user ? user.submittedBooks : [];
  } catch (error) {
    console.error('Error reading user submissions:', error);
    return [];
  }
}

async function addBookSubmission(bookName, userId) {
  try {
    const bookSubmission = new BookSubmission({
      books: [{ bookName: bookName, userID: userId, status: 'pending' }],
      startDate: new Date().toISOString(),
      endDate: '' // Leave empty or set a future date
    });
    await bookSubmission.save();
  } catch (error) {
    console.error('Error adding book Submission:', error);
  }
}

async function addToReadingList(userID,){

}


async function hasActiveSubmission(userId) {
  try {
    const activeSubmission = await BookSubmission.findOne({
      'books.userID': userId,
      'books.status': 'pending', // Assuming 'pending' status means the book is not yet read and the session is active
      endDate: { $gt: new Date().toISOString() } // Checks if the Submission round hasn't ended
    });
    return activeSubmission !== null;
  } catch (error) {
    console.error('Error checking active submission:', error);
    return false;
  }
}




async function assignSubmissionId(){

}

module.exports = {
  readUserSubmissions,
  writeUserSubmission,
  addBookSubmission,
  hasActiveSubmission
}