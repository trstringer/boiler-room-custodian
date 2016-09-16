const fs = require('fs');

function copyFile(source, destination, callback) {
  console.log('helloooooo');
  fs.readFile(source, 'utf8', (err, data) => {
    console.log(`read file ${source}`);
    if (err) {
      callback(err);
    }
    else {
      console.log(`writing file ${destination}`);
      fs.writeFile(destination, data, callback);
    }
  });
}

module.exports = (done) => {
  // fs.createReadStream(`${__dirname}/repo/test-file1.save.txt`)
  //   .pipe(fs.createWriteStream(`${__dirname}/repo/test-file1.txt`));

  console.log('doing refresh');
  copyFile(`${__dirname}/repo/test-file1.save.txt`, `${__dirname}/repo/test-file1.txt`, (err) => {
    if (err) {
      console.log(err.message);
    }

    done();
  });

  // fs.createReadStream(`${__dirname}/repo/test-file2.save.txt`)
  //   .pipe(fs.createWriteStream(`${__dirname}/repo/test-file2.txt`));

  // fs.createReadStream(`${__dirname}/repo/test-file3.save.txt`)
  //   .pipe(fs.createWriteStream(`${__dirname}/repo/test-file3.txt`));

  fs.unlink(`${__dirname}/repo/new-add-file1.txt`);
  fs.unlink(`${__dirname}/repo/new-add-file2.txt`);
};
