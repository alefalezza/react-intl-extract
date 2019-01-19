const { join } = require("path");
const glob = require("glob");
const babel = require('@babel/core');
const manageTranslations = require('react-intl-translations-manager').default;
const rimraf = require('rimraf');
const generateIndex = require('./generateIndex');

const tmp = join('../', '.tmp');

const extensions = ['jsx', 'tsx'];

const globOptions = (src) => ({
  root: src
});

const babelOptions = (src) => ({
  cwd: src,
  plugins: [[
    "react-intl",
    {
      "messagesDir": tmp
    }
  ]],
  presets: [
    "@babel/typescript",
    "@babel/react"
  ]
});

module.exports = (options) => {
  console.log('Extracting i18n messages');
  const { locales, src, output } = options;
  const files = findFiles(src);
  extractMessages(locales, src, output)(files);
};

const findFiles = (src) => {
  const output = [];
  extensions.forEach(ext => {
    const files = glob.sync(`/**/*.${ext}`, globOptions(src));
    output.concat(files);
  })
  return output;
};


/**
 * @param {string[]} files 
 */
const extractMessages = (locales, src, output) => (files) => {
  console.log('Saving tmp messages');
  files.map(file => babel.transformFileSync(file, babelOptions(src)));

  console.log('Updating translations');
  manageTranslations({
    messagesDirectory: tmp,
    translationsDirectory: output,
    languages: locales
  });

  console.log('Generating index');
  generateIndex(locales, output);

  console.log('Cleaning');
  rimraf(tmp, (err) => {
    if (err) {
      throw err;
    }
    console.log('Done!');
  });
};
