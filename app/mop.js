const program = require('commander');
const packageConfig = require('../package');
const config = require('./modules/config');
const fileOps = require('./modules/file-ops');
const chalk = require('chalk');

function displayError(err) {
  console.log(chalk.red(err.message));
}

function displayInformation(message, verbose) {
  if (verbose) {
    console.log(chalk.yellow(message));
  }
}

program
  .version(packageConfig.version)
  .option('-v, --verbose', 'verbose output')
  .parse(process.argv);

const workingDir = process.cwd();
const cleanupConfig = config(workingDir);

// remove files to be removed
if (cleanupConfig.remove) {
  cleanupConfig.remove.forEach((fileConfig) => {
    if (fileConfig.file) {
      fileOps.remove(`${workingDir}/${fileConfig.file}`, (err) => {
        if (err) {
          displayError(err);
        }
        else {
          displayInformation(`removed ${fileConfig.file}`, program.verbose);
        }
      });
    }
    else if (fileConfig.folder) {
      fileOps.removeFolder(`${workingDir}/${fileConfig.folder}`, (err) => {
        if (err) {
          displayError(err);
        }
        else {
          displayInformation(`removed ${fileConfig.folder}`, program.verbose);
        }
      });
    }
  });
}

// add files to be added
if (cleanupConfig.add) {
  cleanupConfig.add.forEach((fileConfig) => {
    fileOps.add(`${workingDir}/${fileConfig.file}`, (err) => {
      if (err) {
        displayError(err);
      }
      else {
        displayInformation(`added ${fileConfig.file}`, program.verbose);
      }
    });
  });
}

// clean files to be cleaned
if (cleanupConfig.clean) {
  cleanupConfig.clean.forEach((fileConfig) => {
    if (fileConfig.clear) {
      fileOps.clear(`${workingDir}/${fileConfig.file}`, (err) => {
        if (err) {
          displayError(err);
        }
        else {
          displayInformation(`cleared ${fileConfig.file}`, program.verbose);
        }
      });
    }
    else if (fileConfig.pattern) {
      fileOps.deleteLine(
        `${workingDir}/${fileConfig.file}`,
        fileConfig.pattern,
        (err) => {
          if (err) {
            displayError(err);
          }
          else {
            displayInformation(
              `removed line in ${fileConfig.file} matching ${fileConfig.pattern.toString()}`, 
              program.verbose);
          }
        });
    }
  });
}
