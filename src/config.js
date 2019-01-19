const path = require('path');

const cwd = process.cwd();

module.exports = {
    locales: ['en', 'it'],
    src: path.join(cwd, 'src'),
    output: path.join(cwd, 'locales')
};