const parse = require('../src/parse');

const testArtifact = `this is my test
this should show things to remove
// brc rm
this should be a single removed line

// brc rmchunk start
this should be multiple lines
that should be removed
// brc rmchunk end

this line should also be removed // brc rm

but this line will never be removed`;
// 13 total lines before
// 6 lines should remain

test('make sure we do not break the test artifact', () => {
  expect(testArtifact.split('\n').length).toBe(13);
});

test('lines should be parsed', () => {
  const output = parse(testArtifact);
  expect(output.split('\n').length).toBe(6);
});
