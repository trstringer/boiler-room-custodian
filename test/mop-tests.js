const assert = require('chai').assert;
const testUtil = require('./util');
const refresh = require('./refresh');
const config = require('../app/modules/config');
const remove = require('../app/modules/file-ops').remove;
const add = require('../app/modules/file-ops').add;
const clear = require('../app/modules/file-ops').clear;

/* eslint-disable no-undef */
describe('moperations', () => {
  let mopConfig;
  it('should retrieve configuration', (done) => {
    mopConfig = config(`${__dirname}/repo`);
    assert.isDefined(mopConfig);
    done();
  });

  it('should remove files', (done) => {
    mopConfig.remove.forEach((fileConfig, index, array) => {
      const fileToRemove = `${mopConfig.rootdir}/${fileConfig.file}`; 
      remove(fileToRemove, assert.isFalse);
      testUtil.fileExists(fileToRemove, assert.isFalse);
      if (index === array.length - 1) {
        done();
      }
    });
  });

  it('should add files', (done) => {
    mopConfig.add.forEach((fileConfig, index, array) => {
      const fileToAdd = `${mopConfig.rootdir}/${fileConfig.file}`;
      add(fileToAdd, (err) => assert.isFalse(err));
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
        clear(fileToClean, (err) => assert.isFalse(err));
        testUtil.fileIsEmpty(fileToClean, assert.isFalse);
      }

      if (index === array.length - 1) {
        done();
      }
    });
  });

  after(refresh);
});
/* eslint-enable no-undef */
