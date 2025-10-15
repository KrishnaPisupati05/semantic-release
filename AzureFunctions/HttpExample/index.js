const fs = require('fs');
const path = require('path');

function readVersionTxt () {
  try {
    return fs.readFileSync(path.join(__dirname, '..', 'version.txt'), 'utf8').trim();
  } catch {
    return null;
  }
}

module.exports = async function (context, req) {
  const name = req.query.name || (req.body && req.body.name);
  const version = process.env.APP_VERSION || readVersionTxt() || 'unknown';

  context.log('HTTP trigger invoked', { version });

  const message = name
    ? `Hello, ${name}. Function executed successfully.`
    : 'Function executed successfully. Provide ?name=YourName or JSON { "name": "YourName" }.';

  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: {
      message,
      version,
      time: new Date().toISOString()
    }
  };
};