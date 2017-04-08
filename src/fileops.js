const cons = require('constants');
const fs = require('fs');
const parse = require('./parse');

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

function fileExists(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stat) => {
      if (stat) {
        resolve(true);
        return;
      }
      else if (err && err.code === 'ENOENT') {
        resolve(false);
        return;
      }
      reject(err);
    });
  });
}

function addFile(file) {
  return new Promise((resolve, reject) => {
    fs.open(file, cons.O_CREAT, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function parseFile(file) {
  return readFile(file)
    .then(data => parse(data))
    .then(parsedData => {
      if (parsedData === '') {
        return clearFile(file);
      }
      else if (parsedData === null) {
        return deleteFile(file);
      }
      else {
        return changeFile(file, parsedData);
      }
    });
}

module.exports.changeFile = changeFile;
module.exports.clearFile = clearFile;
module.exports.deleteFile = deleteFile;
module.exports.readFile = readFile;
module.exports.fileExists = fileExists;
module.exports.addFile = addFile;
module.exports.parseFile = parseFile;
