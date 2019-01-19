const app = require('../index');
const path = require('path');

app({
    locales: ['en', 'it', 'es'],
    src: path.join(__dirname, './src'),
    output: path.join(__dirname, './locales')
});
