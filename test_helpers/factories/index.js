export default function (factory, Models) {
  let normalizedPath = require('path').join(__dirname, '.');

  require('fs').readdirSync(normalizedPath).forEach(function (file) {
    if (file !== 'index.js' && !file.endsWith('.swp')) {
      require('./' + file)(factory, Models);
    }
  });
};
