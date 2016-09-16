const fs = require('fs');

function copyFile(source, destination) {
  return new Promise((resolve, reject) => {
    fs.readFile(source, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        fs.writeFile(destination, data, (err) => {
          if (err) {
            reject(err);
          }
          else {
            resolve();
          }
        });
      }
    });
  });
}

function removeFile(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    });
  });
}

module.exports = (done) => {
  Promise.all([
    copyFile(`${__dirname}/repo/test-file1.save.txt`, `${__dirname}/repo/test-file1.txt`),
    copyFile(`${__dirname}/repo/test-file2.save.txt`, `${__dirname}/repo/test-file2.txt`),
    copyFile(`${__dirname}/repo/test-file3.save.txt`, `${__dirname}/repo/test-file3.txt`),
    removeFile(`${__dirname}/repo/new-add-file1.txt`),
    removeFile(`${__dirname}/repo/new-add-file2.txt`)
  ])
    .then(() => done())
    .catch((err) => {
      throw err;
    });
};
