const { join } = require("path");
const glob = require("glob");
const babel = require('@babel/core');
const manageTranslations = require('react-intl-translations-manager').default;
const rimraf = require('rimraf');
const generateIndex = require('./generateIndex');
const log = console.log;

const tmp = join(__dirname, '../', '.tmp');

const globOptions = (src) => ({
  root: src
});

const babelOptions = (src) => ({
  cwd: src,
  plugins: [
    ["react-intl", {
      "messagesDir": tmp
    }]
  ],
  presets: [
    "@babel/typescript",
    "@babel/react"
  ]
});

module.exports = (options) => {
  log(`Extracting i18n messages from ${options.src}`);
  const { locales, src, output, extensions } = options;
  const files = findFiles(src, extensions);
  extractMessages(locales, src, output)(files);
};

const findFiles = (src, extensions) => {
  const output = [];
  extensions.forEach(ext => {
    const files = glob.sync(`/**/*.${ext}`, globOptions(src));
    output.push(...files);
  });
  return output;
};

/**
 * @param {string[]} files 
 */
const extractMessages = (locales, src, output) => (files) => {
  log('Saving tmp messages');
  files.map(file => babel.transformFileSync(file, babelOptions(src)));

  log('Updating translations');
  manageTranslations({
    messagesDirectory: tmp,
    translationsDirectory: output,
    languages: locales
  });

  log('Generating index');
  generateIndex(locales, output);

  log('Cleaning');
  rimraf(tmp, (err) => {
    if (err) {
      throw err;
    }
    log('Done!');
  });
};
