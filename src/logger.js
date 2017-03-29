const chalk = require('chalk');

const INFORMATION = 'information';
const ERROR = 'error';

module.exports.INFORMATION = INFORMATION;
module.exports.ERROR = ERROR;

module.exports.display = (message, level, verbose) => {
  if (!verbose) {
    return;
  }

  switch (level) {
    case INFORMATION:
      console.log(chalk.yellow(message));
      break;
    case ERROR:
      console.log(chalk.red(message));
      break;
    default:
      console.log(message);
  }
};
