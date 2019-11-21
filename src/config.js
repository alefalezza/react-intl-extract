const path = require('path');

const cwd = process.cwd();

module.exports = {
    locales: ['en'],
    extensions: ['jsx', 'tsx', 'js', 'ts'],
    src: path.join(cwd, 'src'),
    output: path.join(cwd, 'locales')
};