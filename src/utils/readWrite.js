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
    const books = await Book.find({
      userID : userId,
      wasSubmitted : false
    });

    const bookNames = books.map(book => book.bookName);


    // const user = await User.findOne({ userID: userId});
    return books ? bookNames : [];
  } catch (error) {
    console.error('Error reading user submissions:', error);
    return [];
  }
}
// This one will be for finding the actual books and if they are active or not
async function changeBookStatus(bookName, userId, value){
  try {
    const book = await Book.findOne({
      userID : userId,
      bookName : bookName
    });
    const alreadySubmitted = checkAlreadySubmitted(userId, bookName);
    if(alreadySubmitted){
      console.log('stopping because book was already submitted');
      return;
    }

    if(book){
      book.isActive = value;
      await book.save();
      console.log(`Status of ${bookName} updated to ${value}`);
    }
    
  } catch (error) {
    console.log('Error finding book: ', error);
  }
}

async function checkAlreadySubmitted(userId, bookName){
  try {
    const book = await Book.findOne({
      userID : userId,
      bookName : bookName,
      wasSubmitted : true,
    });

    if(book != null){
      return true;
    }
    else{
      return false;
    }
  } catch (error) {
    console.log('error in checkAlreadySubmitted, readWrite.js: ', error);
  }
}

async function addBookSubmission(bookName, userId) {
  try {
    const bookSubmission = new Book({
      userID : userId,
      bookName : bookName,
      isActive : false,
      wasSubmitted : false,
    });
    await bookSubmission.save();
  } catch (error) {
    console.error('Error adding book Submission:', error);
  }
}

// async function chooseBook(userId){
//   try {
    
//   } catch (error) {
//     console.log('Error choosing book: ', error);
//   }
// }

async function deleteBook(userId, bookName){
  try {
    const book = await Book.findOne({
      userID : userId,
      bookName : bookName,
    });
    if(book){
      console.log(`Book '${bookName}' found in deleteBook().`);

      await book.deleteOne();

      await User.updateOne(
        { userID: userId },
        { $pull: { submittedBooks: bookName } }
      );
      console.log(`Removed '${bookName}' from user and book.`);


    }

  } catch (error) {
    console.log('error deleting book : readWrite.js: ', error);
  }
} 


async function hasActiveSubmission(userId) {
  try {
    const activeSubmissions = await Book.find({
      userID : userId,
      isActive : true,
      // endDate: { $gt: new Date().toISOString() } 
    });
    //console.log('active submissions: ', activeSubmissions);
    const bookNames = activeSubmissions.map(submission => submission.bookName);
    return bookNames;
  } catch (error) {
    console.error('Error checking active submission:', error);
    return [];
  }
}

async function getActiveBooks(){

  try {
    const activeBooks = await Book.find({
      isActive : true,
    });
  
    if(activeBooks.length === 0){
      console.log('No active books found');
      return null;
    }
  
    return activeBooks;
  } catch (error) {
    console.log('error in getActiveBooks, readWrite.js: ', error);
  }
  
}




async function assignSubmissionId(){

}

module.exports = {
  readUserSubmissions,
  writeUserSubmission,
  addBookSubmission,
  hasActiveSubmission,
  changeBookStatus,
  deleteBook,
  getActiveBooks,
  checkAlreadySubmitted
}