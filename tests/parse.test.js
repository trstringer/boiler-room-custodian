const parse = require('../src/parse');

const testArtifact = `this is my test
this should show things to remove
   // brc
this should be a single removed line

// brc start
this should be multiple lines
that should be removed
// brc end

this line should also be removed // brc

but this line will never be removed`;
// 13 total lines before
// 6 lines should remain

const testArtifactClear = `// brc clear
none of this will exist after the fact
all will be deleted and cleared`;
// 3 lines before
// 0 lines should remain (empty string)

const testArtifactRemove = `// brc remove
this should be when you want to delete a
file, so we will return null`;
// 3 lines before
// null returned

test('make sure we do not break the test artifact', () => {
  expect(testArtifact.split('\n').length).toBe(13);
});

test('lines should be parsed', () => {
  const output = parse(testArtifact, false);
  expect(output.split('\n').length).toBe(6);
});

test('all lines should be cleared', () => {
  const output = parse(testArtifactClear, false);
  expect(output).toBe('');
});

test('null should be returned if set to remove', () => {
  const output = parse(testArtifactRemove, false);
  expect(output).toBeNull();
});
