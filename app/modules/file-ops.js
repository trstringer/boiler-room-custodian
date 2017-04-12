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
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return;
    }

    const lines = data.split('\n');
    let tempOutput = '';
    let i = 0;
    let max = lines.length;
    for (i = 0; i < max; i++) {
      if (!lines[i].match(pattern)) {
        if (tempOutput === '') {
          tempOutput = lines[i];
        }
        else {
          tempOutput += `\n${lines[i]}`;
        }
      }
    }

    fs.writeFile(file, tempOutput, 'utf8', callback);
  });
};

module.exports.deleteRange = function (file, range, callback) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return;
    }

    const lines = data.split('\n');

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
    }

    let tempOutput = '';

    let i = 0;
    let max = lines.length;
    for (i = 0; i < max; i++) {
      if (i + 1 >= startLineNumber && i + 1 <= endLineNumber) {
        continue;
      }
      if (tempOutput === '') {
        tempOutput = lines[i];
      }
      else {
        tempOutput += `\n${lines[i]}`;
      }
    }

    fs.writeFile(file, tempOutput, 'utf8', callback);
  });
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
