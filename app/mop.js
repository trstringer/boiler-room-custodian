const program = require('commander');
const packageConfig = require('../package');
const config = require('./config');

program
  .version(packageConfig.version)
  .option('-y, --yes', 'yes for all optional operations')
  .option('-f, --force', '(not recommended) force all')
  .parse(process.argv);

const cleanupConfig = config(__dirname);
console.log(cleanupConfig);
