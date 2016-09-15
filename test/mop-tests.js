const assert = require('chai').assert;
const testUtil = require('./util');
const refresh = require('./refresh');
const config = require('../app/modules/config');
const remove = require('../app/modules/file-ops').remove;

/* eslint-disable no-undef */
describe('moperations', () => {
  let mopConfig;
  it('should retrieve configuration', (done) => {
    mopConfig = config(`${__dirname}/repo`);
    assert.isDefined(mopConfig);
    done();
  });

  it('should remove files', (done) => {
    mopConfig.remove.forEach((fileConfig) => {
      const fileToRemove = `${mopConfig.rootdir}/${fileConfig.file}`; 
      remove(fileToRemove, assert.isUndefined);
      testUtil.fileExists(fileToRemove, assert.isFalse);
    });
    done();
  });

  after(refresh);
});
/* eslint-enable no-undef */
