const fileops = require('../src/fileops');
const parse = require('../src/parse');
const path = require('path');

test('file is cleared', done => {
  const pathToFile = path.join(
    __dirname,
    'test-files/file2.txt'
  );

  fileops.parseFile(pathToFile)
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

test('file is deleted', done => {
  const pathToFile = path.join(
    __dirname,
    'test-files/file3.txt'
  );

  fileops.parseFile(pathToFile)
    .then(() => fileops.fileExists(pathToFile))
    .then(exists => {
      expect(exists).toBeFalsy();
      done();
    })
    .catch(err => {
      expect(err).toBeFalsy();
      done();
    });
});
