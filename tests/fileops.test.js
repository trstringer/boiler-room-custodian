const fileops = require('../src/fileops');
const parse = require('../src/parse');
const path = require('path');

test('file is cleared', done => {
  const pathToFile = path.join(
    __dirname,
    'test-files/file2.txt'
  );

  fileops.readFile(pathToFile)
    .then(data => parse(data))
    .then(data => {
      if (data === '') {
        return fileops.clearFile(pathToFile);
      }
      else if (data === null) {
        return fileops.deleteFile(pathToFile);
      }
      else {
        return fileops.changeFile(pathToFile, data);
      }
    })
    .then(() => fileops.readFile(pathToFile))
    .then(data => {
      expect(data).toBe('');
      done();
    })
    .catch(err => {
      expect(err).toBeFalsy();
      done();
    });
});
