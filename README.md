# Flag Store

A simple HTTP server for basic functionality.

## Features

- Simple HTTP server
- Basic landing page
- CORS support
- Development and production modes

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run locally:
   ```bash
   npm start
   ```

3. Development mode (port 3000):
   ```bash
   npm run dev
   ```

## Environment Variables

- `NODE_ENV=production` - Enable production mode with HTTPS (requires SSL certificates)

## Server Configuration

- **Development**: HTTP server on port 3000
- **Production**: HTTPS server on port 443 (requires SSL certificates)
- **Fallback**: HTTP server on port 8080 if SSL certificates not found

## Project Structure

```
flagstore/
├── server.js          # Main HTTP server
├── package.json       # Dependencies and scripts
└── README.md          # This file
```

## Related Projects

- `secure-worker/` - Cloudflare Worker with JWT authentication and secure endpoints