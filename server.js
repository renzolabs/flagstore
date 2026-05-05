const https = require("https");
const fs = require("fs");
const url = require("url");

function generateLandingHTML() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flag Store</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            background: #f5f5f5;
            min-height: 100vh;
            color: #333;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .container {
            text-align: center;
            background: #fff;
            padding: 3rem;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
            margin-bottom: 2rem;
            font-size: 2.5rem;
        }
        .info {
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .endpoints {
            margin-top: 2rem;
            font-size: 0.9rem;
            background: #f8f9fa;
            padding: 1rem;
        }
        .endpoint {
            margin: 0.5rem 0;
        }
        .status {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            background: #dcfce7;
            color: #166534;
            font-size: 0.8rem;
            margin-left: 0.5rem;
        }
        a {
            color: #166534;
            text-decoration: none;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏳️ Flag Store</h1>
        <div class="info">
            <p>Simple flag serving HTTP server</p>
            <p>Basic functionality without authentication</p>
        </div>
        <div class="endpoints">
            <p><strong>Available endpoints:</strong></p>
            <div class="endpoint">
                GET / - Landing page
                <span class="status">✓ Working</span>
            </div>
            <div class="endpoint">
                <a href="https://tunnel.renzolabs.online/secure" target="_blank">tunnel.renzolabs.online/secure</a>
                <span class="status">Secure Tunnel</span>
            </div>
            <p style="font-size: 0.75rem; margin-top: 0.5rem; opacity: 0.6;">Authentication required for secure endpoints</p>
        </div>
    </div>
</body>
</html>`;
}

// CORS headers
function setCORSHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Main request handler
function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    setCORSHeaders(res);
    res.writeHead(200);
    res.end();
    return;
  }

  // Default response for all routes
  setCORSHeaders(res);
  const html = generateLandingHTML();
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}

// Check if SSL certificates exist
const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  // Development: HTTP server only
  const http = require('http');
  http.createServer(handleRequest)
    .listen(3000, () => console.log('HTTP server listening on :3000'));
} else {
  // Production: HTTPS server with SSL certificates
  try {
    const options = {
      key: fs.readFileSync('/etc/letsencrypt/live/renzolabs.online/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/renzolabs.online/fullchain.pem'),
    };

    https.createServer(options, handleRequest)
      .listen(443, () => console.log('HTTPS server listening on :443'));
  } catch (error) {
    console.error('SSL certificates not found, falling back to HTTP on port 8080');
    const http = require('http');
    http.createServer(handleRequest)
      .listen(8080, () => console.log('HTTP server listening on :8080'));
  }
}
