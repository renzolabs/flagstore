const express = require("express");
const app = express();

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/flagstore.duckdns.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/flagstore.duckdns.org/fullchain.pem'),
};

https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ headers: req.headers }, null, 2));
}).listen(443, () => console.log('Listening on :443'));
