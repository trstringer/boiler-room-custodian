const fs = require('fs');

module.exports = (() => {
  function add(file, callback) {
    fs.open(file, 'a', callback);
  }

  return {
    remove: fs.unlink,
    add
  };
})();
