#!/usr/bin/env bash

cp test/repo/test-file1.save.txt test/repo/test-file1.txt
cp test/repo/test-file2.save.txt test/repo/test-file2.txt
cp test/repo/test-file3.save.txt test/repo/test-file3.txt
cp test/repo/child-dir/test-file4.save.txt test/repo/child-dir/test-file4.txt
cp test/repo/child-dir/test-file5.save.txt test/repo/child-dir/test-file5.txt
rm test/repo/new-add-file1.txt
rm test/repo/new-add-file2.txt
rm test/repo/child-dir/.gitkeep
mkdir test/repo/child-dir2
cp test/repo/test-file6.save.txt test/repo/child-dir2/test-file6.txt
cp test/repo/test-file7.save.txt test/repo/child-dir2/test-file7.txt
cp test/repo/test-file8.save.txt test/repo/test-file8.txt
cp test/repo/test-file9.save.txt test/repo/test-file9.txt
