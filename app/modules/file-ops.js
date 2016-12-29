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

  function deleteRange(file, range, callback) {
    const source = readline.createInterface({
      input: fs.createReadStream(file)
    });

    const tempFileName = `${file}.tmp`;
    const tempFileStream = fs.createWriteStream(tempFileName);

    // if the range is a single digit value (i.e. '4') then just delete
    // the single line. Otherwise if it is a range in the format of
    // 'start,end' then remove from this line range inclusively
    let startLineNumber, endLineNumber;
    const singleLine = Number(range);
    if (singleLine) {
      startLineNumber = singleLine;
      endLineNumber = singleLine;
    }
    else {
      const rangeMatch = /(\d+),(\d+)/.exec(range);
      startLineNumber = Number(rangeMatch[1]);
      endLineNumber = Number(rangeMatch[2]);
      if (!startLineNumber || !endLineNumber) {
        callback(Error('Incorrect line range format'));
      }
      else {
        // loop through all of the lines in the source file
        // if the range falls into the delete range then don't
        // copy those lines into the temp destination
      }
    }
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
