#!/usr/bin/env bash

SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cp $SCRIPT_PATH/file1.save.txt $SCRIPT_PATH/file1.txt
cp $SCRIPT_PATH/file2.save.txt $SCRIPT_PATH/file2.txt
cp $SCRIPT_PATH/file3.save.txt $SCRIPT_PATH/file3.txt
