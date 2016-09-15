const fs = require('fs');

module.exports = () => {
  fs.createReadStream(`${__dirname}/repo/test-file1.save.txt`)
    .pipe(fs.createWriteStream(`${__dirname}/repo/test-file1.txt`));

  fs.createReadStream(`${__dirname}/repo/test-file2.save.txt`)
    .pipe(fs.createWriteStream(`${__dirname}/repo/test-file2.txt`));

  fs.createReadStream(`${__dirname}/repo/test-file3.save.txt`)
    .pipe(fs.createWriteStream(`${__dirname}/repo/test-file3.txt`));
};
