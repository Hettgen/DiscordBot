const fs = require('fs');
const path = require('path');

const submissionFilePath = path.join(__dirname, 'userSubmissions.json');

function readUserSubmissions(){
  if (!fs.existsSync(submissionFilePath)) {
    fs.writeFileSync(submissionFilePath, JSON.stringify({}));
  }
  return JSON.parse(fs.readFileSync(submissionFilePath, 'utf-8'));
}

function writeUserSubmission(userId, bookName){
  const submissions = readUserSubmissions();

  submissions[userId] = bookName;

  fs.writeFileSync(submissionFilePath, JSON.stringify(submissions, null, 2));
}

module.exports = {
  readUserSubmissions,
  writeUserSubmission,
}