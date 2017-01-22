const chai = require('chai');
const assert = chai.assert;
const testUtil = require('./util');
const refresh = require('./refresh');
const config = require('../app/modules/config');
const remove = require('../app/modules/file-ops').remove;
const add = require('../app/modules/file-ops').add;
const clear = require('../app/modules/file-ops').clear;
const deleteLine = require('../app/modules/file-ops').deleteLine;
const deleteRange = require('../app/modules/file-ops').deleteRange;
const removeFolder = require('../app/modules/file-ops').removeFolder;
const replace = require('../app/modules/file-ops').replace;

chai.config.includeStack = true;

/* eslint-disable no-undef */
describe('moperations', () => {
  let mopConfig;
  it('should retrieve configuration', (done) => {
    mopConfig = config(`${__dirname}/repo`);
    assert.isDefined(mopConfig);
    done();
  });

  it('should remove files and folders', (done) => {
    mopConfig.remove.forEach((fileConfig, index, array) => {
      if (fileConfig.file) {
        const fileToRemove = `${mopConfig.rootdir}/${fileConfig.file}`;
        remove(fileToRemove, assert.isFalse);
        testUtil.fileExists(fileToRemove, assert.isFalse);
        if (index === array.length - 1) {
          done();
        }
      }
      else if (fileConfig.folder) {
        const folderToRemove = `${mopConfig.rootdir}/${fileConfig.folder}`;
        removeFolder(folderToRemove, assert.isFalse);
        testUtil.fileExists(folderToRemove, assert.isFalse);
        if (index === array.length - 1) {
          done();
        }
      }
    });
  });

  it('should add files', (done) => {
    mopConfig.add.forEach((fileConfig, index, array) => {
      const fileToAdd = `${mopConfig.rootdir}/${fileConfig.file}`;
      add(fileToAdd, (err) => assert.isNull(err));
      testUtil.fileExists(fileToAdd, assert.isTrue);
      if (index === array.length - 1) {
        done();
      }
    });
  });

  it('should clean files', (done) => {
    mopConfig.clean.forEach((fileConfig, index, array) => {
      const fileToClean = `${mopConfig.rootdir}/${fileConfig.file}`;

      if (fileConfig.clear) {
        clear(fileToClean, (err) => assert.isNull(err));
        testUtil.fileIsEmpty(fileToClean, assert.isFalse);
      }
      else if (fileConfig.pattern) {
        deleteLine(fileToClean, fileConfig.pattern, () => {
          testUtil.fileContainsPattern(fileToClean, fileConfig.pattern, assert.isFalse);
        });
      }
      else if (fileConfig.deleteRange) {
        deleteRange(fileToClean, fileConfig.deleteRange, (err) => {
          assert.isNull(err);
          testUtil.fileContainsLineCount(fileToClean, 10, assert.isTrue);
        });
      }
      else if (fileConfig.replace) {
        replace(fileToClean, fileConfig.replace, err => {
          assert.isNull(err);
        });
      }

      if (index === array.length - 1) {
        done();
      }
    });
  });

  after(refresh);
});
/* eslint-enable no-undef */
