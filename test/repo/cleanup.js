module.exports = {
  remove: [
    { file: 'test-file1.txt' },
    { file: 'test-file2.txt', optional: true },
    { file: 'test-file4.txt' }
  ],
  clean: [
    {
      file: 'test-file3.txt',
      clear: true
    }
  ],
  add: [
    { file: 'new-add-file1.txt' },
    { file: 'new-add-file2.txt' },
    { file: 'child-dir/.gitkeep' }
  ]
};
