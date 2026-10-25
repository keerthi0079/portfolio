// Simple local web server for Keerthi's Portfolio (Zero external dependencies)
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    // Basic route resolution
    let reqUrl = req.url.split('?')[0];
    let filePath = path.join(__dirname, reqUrl === '/' ? 'index.html' : decodeURIComponent(reqUrl));

    // Security: prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Access Denied');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - File Not Found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*'
        });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` Keerthi's Portfolio is running!`);
    console.log(` Open in your browser: http://localhost:${PORT}`);
    console.log(` Press Ctrl + C to stop the server.`);
    console.log(`====================================================`);
});

