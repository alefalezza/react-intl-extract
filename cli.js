const program = require('commander');
const config = require('./src/config');
const _ = require('lodash');
const version = require('./package.json').version;

program
  .version(version, '-v, --version')
  .allowUnknownOption()
  .option('-l,--locales <items>', 'list of output languages, default en,it')
  .option('-s,--src [value]', 'source directory, default /src')
  .option('-o,--output [value]', 'output directory: where dictionaries are saved, default /locales')
  .parse(process.argv);

const allowedOptions = Object.keys(config);
const options = _.pick(program, allowedOptions);

require('./index.js')(options);