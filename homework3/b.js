
const fd = fs.openSync('data.txt', 'r');
const buffer = Buffer.alloc(64);
const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0);
console.log(buffer.toString('utf8', 0, bytesRead));
fs.closeSync(fd);
