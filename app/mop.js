const program = require('commander');
const packageConfig = require('../package');

program
  .version(packageConfig.version)
  .option('-y, --yes', 'force yes for all operations')
  .parse(process.argv);
