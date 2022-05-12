const fs = require('fs');

module.exports = function(folderPath) {
  fs.mkdirSync(folderPath, { recursive: true });
  return folderPath;
};
