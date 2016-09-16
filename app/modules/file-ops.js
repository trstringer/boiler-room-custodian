const fs = require('fs');

module.exports = (() => {
  function add(file, callback) {
    fs.open(file, 'a', callback);
  }

  function clear(file, callback) {
    fs.writeFile(file, '', callback);
  }

  return {
    remove: fs.unlink,
    add,
    clear
  };
})();
