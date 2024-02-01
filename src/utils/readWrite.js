const fs = require('fs');
const path = require('path');
const {User, Book, BookClubSession} = require('../models/schema');



async function writeUserSubmission(userId, username, bookName) {
  try {

    let user = await User.findOne({ userID: userId });
    if (!user) {

      user = new User({ userID: userId, username: username, submittedBooks: [bookName] });
      addBookSubmission(bookName, userId);
    } else {
      if (!user.submittedBooks.includes(bookName)) {
        user.submittedBooks.push(bookName);
        await addBookSubmission(bookName, userId);
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

    const isSessionActive = await checkActiveSession();
    if(isSessionActive){
      console.log('active session in progress, not running changeBookStatus, readWrite.js');
      return;
    }


    const book = await Book.findOne({
      userID : userId,
      bookName : bookName
    });
    const alreadySubmitted = await checkAlreadySubmitted(userId, bookName);

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

async function setBookSelected(book, status){
  try {

    const foundBook = await Book.findOne(book);
    if(foundBook){
      foundBook.wasSubmitted = status;
      await foundBook.save();
      console.log(`setting ${foundBook.bookName} selected status as ${status}`);
    }

  } catch (error) {
    console.log('error in setBookSelection, readWrite.js: ', error);
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

// Sets book submissions to isActive
async function addBookSubmission(bookName, userId) {
  try {
    const activeSubmission = checkAlreadySubmitted(userId, bookName);


    if(!activeSubmission){
      const bookSubmission = new Book({
        userID : userId,
        bookName : bookName,
        isActive : true,
        wasSubmitted : false,
      });
      await bookSubmission.save();
    }
    else{
      const bookSubmission = new Book({
        userID : userId,
        bookName : bookName,
        isActive : false,
        wasSubmitted : false,
      });
      await bookSubmission.save();
    }
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

async function createBookClubSession(){
  try {
    const session = new BookClubSession({isActive : true});
    await session.save();
  } catch (error) {
    console.log('Error in createBookClubSession, readWrite.js: ', error);
  }
}

async function fillBookClubSession(book){
  try {
    const session = BookClubSession.findOne({isActive : true});
    
    if(!session){
      console.log('session not found in fillBookClubSession, readWrite.js');
      return;
    }
    else{
      session.books.push(book);
      await session.save();


    }


  } catch (error) {
    console.log('error in fillBookClubSession, readWrite.js: ', error);
  }
}

async function endBookClubSession(){
  try {
    let session = await BookClubSession.findOne({isActive : true});
    if(!session){
      console.log('error no session found, endBookClubSession, readWrite.js');
      return;
    }
    else{
      session.isActive = false;
      await session.save();
      console.log('Session sucessfully ended, endBookClubSession, readWrite.js');
    }

  } catch (error) {
    console.log('error in endBookClubSession, readWrite.js: ', error);
  }
}

async function checkActiveSession(){
  try {
    const isActive = await BookClubSession.findOne({isActive : true});
    return isActive !== null;
  } catch (error) {
    console.log('error in checkActiveSession, readWrite.js: ', error);
  }
}




module.exports = {
  readUserSubmissions,
  writeUserSubmission,
  addBookSubmission,
  hasActiveSubmission,
  changeBookStatus,
  deleteBook,
  getActiveBooks,
  checkAlreadySubmitted,
  setBookSelected,
  createBookClubSession,
  fillBookClubSession,
  endBookClubSession,
  checkActiveSession
}