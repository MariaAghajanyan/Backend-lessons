const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.method);  

    res.setHeader('type', 'app'); 
    res.statusCode = 200;

    if (req.method === 'GET' && req.url === '/') {
        res.end(JSON.stringify({ message: "Welcome to the server" }));
    }
    else if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE' || req.method === 'OPTIONS') {
        res.end(JSON.stringify({ message: `You sent a ${req.method} request` }));
    } else {
        res.statusCode = 405;  
        res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
