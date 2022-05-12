const fs = require('fs');

module.exports = function(filePath, data) {
  fs.writeFile(filePath, data, { encoding: 'utf-8', flag: 'a+' }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
