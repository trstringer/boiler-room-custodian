const fs = require('fs');
const program = require('commander');
const packageConfig = require('../package');

function readDirContents(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject (err);
        return;
      }
      const output =
        files.map(
          file => {
            return new Promise((resolve, reject) => {
              fs.lstat(file, (err, stat) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve({
                  file: file,
                  isDir: stat.isDirectory()
                });
              });
            });
          }
        );
      resolve(Promise.all(output));
    });
  });
}

program
  .version(packageConfig.version)
  .option('-v, --verbose', 'verbose output')
  .parse(process.argv);

cwd = process.cwd();

readDirContents(cwd)
  .then(contents => {
    console.log(contents);
  })
  .catch(err => {
    console.log(`error!! ${err.message}`);
  });
