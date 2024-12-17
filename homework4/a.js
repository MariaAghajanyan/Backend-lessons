const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        const html = `
            <html>
                <head><title>My HTTP Server</title></head>
                <body>
                    <h1>Welcome to My HTTP Server</h1>
                    <p>This server responds with a simple HTML page</p>
                </body>
            </html>
        `;
        res.statusCode = 200;
        res.end(html);
    } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
