const path = require('path');

const cwd = process.cwd();

module.exports = {
    locales: ['en', 'it'],
    extensions: ['jsx', 'tsx'],
    src: path.join(cwd, 'src'),
    output: path.join(cwd, 'locales')
};