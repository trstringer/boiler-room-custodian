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
    },
    {
      file: 'test-file8.txt',
      deleteRange: '3,12'
    },
    {
      file: 'test-file9.txt',
      replace: [
        { pattern: /hello/, substitute: 'hey' },
        { pattern: /world/, substitute: 'universe' }
      ]
    }
  ],
  add: [
    { file: 'new-add-file1.txt' },
    { file: 'new-add-file2.txt' },
    { file: 'child-dir/.gitkeep' }
  ]
};
