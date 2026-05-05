const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/renzolabs.online/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/renzolabs.online/fullchain.pem'),
};

https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ headers: req.headers }, null, 2));
}).listen(443, () => console.log('Listening on :443'));
