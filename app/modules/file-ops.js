const fs = require('fs');
const readline = require('readline');
const rimraf = require('rimraf');

module.exports.add = function (file, callback) {
  fs.open(file, 'a', callback);
};

module.exports.clear = function (file, callback) {
  fs.writeFile(file, '', callback);
};

module.exports.deleteLine = function (file, pattern, callback) {
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
};

module.exports.deleteRange = function (file, range, callback) {
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
      let lineNumber = 1;
      source.on('line', (line) => {
        if (lineNumber < startLineNumber || lineNumber > endLineNumber) {
          if (lineNumber > 1) {
            tempFileStream.write('\n');
          }
          tempFileStream.write(`${line}`);
        }
        lineNumber++;
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
  }
};

module.exports.replace = function (file, replaceList, callback) {
  const source = readline.createInterface({
    input: fs.createReadStream(file)
  });

  const tempFileName = `${file}.tmp`;
  const tempFileStream = fs.createWriteStream(tempFileName);

  const replaceListCount = replaceList.length;
  source.on('line', (line) => {
    for (let i = 0; i < replaceListCount; i++) {
      line = line.replace(
        replaceList[i].pattern,
        replaceList[i].substitute);
    }
    tempFileStream.write(`${line}\n`);
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
  })
};

module.exports.removeFolder = function (folder, callback) {
  rimraf(folder, ['rmdir'], callback);
};

module.exports.remove = fs.unlink;
