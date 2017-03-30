const program = require('commander');
const packageConfig = require('../package');

program
  .version(packageConfig.version)
  .option('-v, --verbose', 'verbose output')
  .parse(process.argv);
