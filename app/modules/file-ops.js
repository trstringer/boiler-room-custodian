const fs = require('fs');
const readline = require('readline');

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
      callback();
    });
  }

  return {
    remove: fs.unlink,
    add,
    clear,
    deleteLine
  };
})();
