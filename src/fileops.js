const fs = require('fs');

function changeFile(file, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, contents, 'utf8', err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function clearFile(file) {
  return changeFile(file, '');
}

function deleteFile(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(file, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

module.exports.changeFile = changeFile;
module.exports.clearFile = clearFile;
module.exports.deleteFile = deleteFile;
module.exports.readFile = readFile;
