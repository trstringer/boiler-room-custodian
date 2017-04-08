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

test('file is parsed', done => {
  const pathToFile = path.join(
    __dirname,
    'test-files/file1.txt'
  );
  // the line counts before and after are
  // at the moment hard coded, as there is
  // an obvious chicken-and-egg issue to dynamically
  // generate what the line count should be afterward
  //
  // at this point, the development effort
  // is not worth it and the test file should
  // be generally speaking constant. plus, this
  // is what tests are for
  const lineCountBefore = 27;
  const lineCountToRemove = 14;
  const lineCountAfter = lineCountBefore - lineCountToRemove;

  fileops.readFile(pathToFile)
    .then(() => fileops.readFile(pathToFile))
    .then(data => expect(data.split('\n').length).toBe(lineCountBefore))
    .then(() => fileops.parseFile(pathToFile))
    .then(() => fileops.readFile(pathToFile))
    .then(data => {
      expect(data.split('\n').length).toBe(lineCountAfter);
      done();
    })
    .catch(err => {
      expect(err).toBeFalsy();
      done();
    });
});

test('file is created', done => {
  const pathToFile = path.join(
    __dirname,
    'test-files/newfile.txt'
  );

  fileops.addFile(pathToFile)
    .then(() => fileops.fileExists(pathToFile))
    .then(exists => {
      expect(exists).toBeTruthy();
      done();
    })
    .catch(err => {
      expect(err).toBeFalsy();
      done();
    });
});
