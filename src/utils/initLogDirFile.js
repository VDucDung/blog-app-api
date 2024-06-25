const fs = require('fs');
const path = require('path');

const { LOG_DIR, LOG_FILENAME } = require('../constants');

const pathDir = path.join(__dirname, '../../', LOG_DIR);
const pathFile = path.join(pathDir, LOG_FILENAME);

const initLogDirFile = () => {
  if (!fs.existsSync(pathDir)) {
    fs.mkdirSync(pathDir);
  }

  if (!fs.existsSync(pathFile)) {
    fs.writeFileSync(path.join(pathFile), '');
  }
};

module.exports = initLogDirFile;
