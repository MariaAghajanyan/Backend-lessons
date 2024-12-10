const fs = require('fs');
const fd = fs.openSync('example.txt', 'w+'); 
fs.writeSync(fd, "0123456789");
fs.writeSync(fd, "AB", 0, 2, 5);
const buffer = Buffer.alloc(10);
fs.readSync(fd, buffer, 0, buffer.length, 0);
console.log("file", buffer.toString());
fs.closeSync(fd);
