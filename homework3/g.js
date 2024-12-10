fs.writeFileSync('message.txt', "Hello World!");
const originalContent = fs.readFileSync('message.txt').toString();
const modifiedContent = originalContent.replace("Hello", "Hello Awesome");
fs.writeFileSync('message.txt', modifiedContent);
console.log("", modifiedContent);
