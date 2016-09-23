const fs = require('fs');
const readline = require('readline');
const rimraf = require('rimraf');

module.exports = (() => {
  function add(file, callback) {
    fs.open(file, 'a', callback);
  }

  function clear(file, callback) {
    fs.writeFile(file, '', callback);
  }

  function deleteLine(file, pattern, callback) {
    const source = readline.createInterface({
      input: fs.createReadStream(file)
    });

    const tempFileName = `${file}.tmp`;
    const tempFileStream = fs.createWriteStream(tempFileName);

    source.on('line', (line) => {
      if (!line.match(pattern)) {
        tempFileStream.write(`${line}\n`);
      }
    });
    source.on('close', () => {
      tempFileStream.close();
      // delete the old file and rename the temp file
      fs.unlink(file, (err) => {
        if (err) {
          callback(err);
        }
        else {
          fs.rename(tempFileName, file, callback);
        }
      });
    });
  }

  function removeFolder(folder, callback) {
    rimraf(folder, ['rmdir'], callback);
  }

  return {
    remove: fs.unlink,
    add,
    clear,
    deleteLine,
    removeFolder
  };
})();
