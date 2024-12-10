
const fd = fs.openSync('data.txt', 'r');
const fileStats = fs.fstatSync(fd);
console.log("Ֆայլի երկարությունը՝", fileStats.size, "բայթ։");
const middle = Math.floor(fileStats.size / 2);
const buffer = Buffer.alloc(10);
fs.readSync(fd, buffer, 0, 10, middle);
console.log("Միջին հատվածից կարդացած բայթերը՝", buffer.toString('utf8'));
fs.closeSync(fd);
