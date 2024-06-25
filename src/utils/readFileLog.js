const fs = require('fs');
const path = require('path');

const { LOG_DIR, LOG_FILENAME } = require('../constants');

const pathDir = path.join(__dirname, '../../', LOG_DIR);
const pathFile = path.join(pathDir, LOG_FILENAME);

const readFileLog = () => {
  const logs = fs.readFileSync(pathFile, 'utf8');

  fs.writeFileSync(pathFile, '');

  return logs ? logs.trim().split('\n') : [];
};

module.exports = readFileLog;
