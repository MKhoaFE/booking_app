const fs = require('fs');
const path = require('path');

const loadLogFile = (filename) => {
  const filePath = path.join(__dirname, '../logs', filename);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf8');
  }
  return null;
};

module.exports = loadLogFile;
