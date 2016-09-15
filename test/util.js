const fs = require('fs');

module.exports = (() => {
  function fileExists(file, callback) {
    fs.access(file, (err) => {
      callback(err === undefined);
    });
  }
  
  return {
    fileExists
  };
})();
