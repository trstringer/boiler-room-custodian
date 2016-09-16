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
  
  return {
    fileExists,
    fileIsEmpty
  };
})();
