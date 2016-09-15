const fs = require('fs');

module.exports = (() => {
  return {
    remove: fs.unlink
  };
})();
