const http = require('http');
const fs = require('fs');
const path = './users.json';

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/users') {
        fs.readFile(path, (err, data) => {
            if (err) {
                res.statusCode = 200;
                res.end(JSON.stringify([]));  
            } else {
                const users = JSON.parse(data);
                res.statusCode = 200;
                res.end(JSON.stringify(users));
            }
        });
    } else if (req.method === 'POST' && req.url === '/users') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const user = JSON.parse(body);
            if (user.name && user.age) {
                fs.readFile(path, (err, data) => {
                    let users = err ? [] : JSON.parse(data);
                    users.push(user);
                    fs.writeFile(path, JSON.stringify(users), (err) => {
                        if (err) {
                            res.statusCode = 500;
                            res.end(JSON.stringify({ message: 'Failed to save user' }));
                        } else {
                            res.statusCode = 200;
                            res.end(JSON.stringify({ message: 'User added', user }));
                        }
                    });
                });
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Invalid user data' }));
            }
        });
    } else {
        res.statusCode = 405;
        res.end('Method Not Allowed');
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
  