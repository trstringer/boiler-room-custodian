const assert = require('chai').assert;
const testUtil = require('./util');
const refresh = require('./refresh');
const config = require('../app/modules/config');
const remove = require('../app/modules/file-ops').remove;
const add = require('../app/modules/file-ops').add;
const clear = require('../app/modules/file-ops').clear;
const deleteLine = require('../app/modules/file-ops').deleteLine;
const removeFolder = require('../app/modules/file-ops').removeFolder;

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

      if (index === array.length - 1) {
        done();
      }
    });
  });

  after(refresh);
});
/* eslint-enable no-undef */
