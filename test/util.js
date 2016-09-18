const fs = require('fs');

module.exports = (() => {
  function fileExists(file, callback) {
    fs.access(file, (err) => {
      callback(err === undefined);
    });
  }

  function fileIsEmpty(file, callback) {
    fs.readFile(file, (err, data) => {
      if (err) {
        throw err;
      }
      else {
        callback(data === '');
      }
    });
  }

  function fileContainsPattern(file, pattern, callback) {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) {
        throw err;
      }
      else {
        callback(data.match(pattern) !== null);
      }
    });
  }
  
  return {
    fileExists,
    fileIsEmpty,
    fileContainsPattern
  };
})();
