const sourceFd = fs.openSync('data.txt', 'r');
const destFd = fs.openSync('copy.txt', 'w');
const buffer = Buffer.alloc(16);
let bytesRead;
while ((bytesRead = fs.readSync(sourceFd, buffer, 0, buffer.length, null)) > 0) {
    fs.writeSync(destFd, buffer, 0, bytesRead);
}
fs.closeSync(sourceFd);
fs.closeSync(destFd);

console.log("done");
