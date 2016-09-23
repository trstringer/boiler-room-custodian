module.exports = {
  remove: [
    { file: 'test-file1.txt' },
    { file: 'test-file2.txt' },
    { file: 'test-file4.txt' },
    { folder: 'child-dir2' }
  ],
  clean: [
    {
      file: 'test-file3.txt',
      clear: true
    },
    {
      file: 'child-dir/test-file5.txt',
      pattern: /blah/
    }
  ],
  add: [
    { file: 'new-add-file1.txt' },
    { file: 'new-add-file2.txt' },
    { file: 'child-dir/.gitkeep' }
  ]
};
