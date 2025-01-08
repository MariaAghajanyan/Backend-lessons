const fs = require('fs/promises');

const logRequests = async (req, res, next) => {
  const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  await fs.appendFile('logs.json', log);
  next();
};

module.exports = { logRequests };
