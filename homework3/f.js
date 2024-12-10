
fs.writeFileSync('file1.txt', "Content of the first file.\n");
fs.writeFileSync('file2.txt', "Content of the second file.\n");
const content1 = fs.readFileSync('file1.txt');
const content2 = fs.readFileSync('file2.txt');
fs.writeFileSync('merged.txt', content1 + content2);
console.log("done");
