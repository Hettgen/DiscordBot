const fs = require('fs');
const path = require('path');
const {User, Book} = require('../models/schema');

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
      addBookSubmission(bookName, userId);
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

// This one just reads book names and returns for display
async function readUserSubmissions(userId) {
  try {
    const user = await User.findOne({ userID: userId });
    return user ? user.submittedBooks : [];
  } catch (error) {
    console.error('Error reading user submissions:', error);
    return [];
  }
}
// This one will be for finding the actual books and if they are active or not
async function findBooksActive(userId){
  try {
    
    return 
  } catch (error) {
    console.log('Error finding books: ', error);
  }
}

async function addBookSubmission(bookName, userId) {
  try {
    const bookSubmission = new Book({
      userID : userId,
      bookName : bookName,
      isActive : true
    });
    await bookSubmission.save();
  } catch (error) {
    console.error('Error adding book Submission:', error);
  }
}

async function chooseBook(userId){
  try {
    
  } catch (error) {
    console.log('Error choosing book: ', error);
  }
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