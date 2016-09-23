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

function createFolder(folder) {
  return new Promise((resolve, reject) => {
    fs.mkdir(folder, (err) => {
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
    copyFile(`${__dirname}/repo/child-dir/test-file4.save.txt`, `${__dirname}/repo/child-dir/test-file4.txt`),
    copyFile(`${__dirname}/repo/child-dir/test-file5.save.txt`, `${__dirname}/repo/child-dir/test-file5.txt`),
    removeFile(`${__dirname}/repo/new-add-file1.txt`),
    removeFile(`${__dirname}/repo/new-add-file2.txt`),
    removeFile(`${__dirname}/repo/child-dir/.gitkeep`),
    createFolder(`${__dirname}/repo/child-dir2`),
    copyFile(`${__dirname}/repo/test-file6.save.txt`, `${__dirname}/repo/child-dir2/test-file6.txt`),
    copyFile(`${__dirname}/repo/test-file7.save.txt`, `${__dirname}/repo/child-dir2/test-file7.txt`)
  ])
    .then(() => done())
    .catch((err) => {
      throw err;
    });
};
