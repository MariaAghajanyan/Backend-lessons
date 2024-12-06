const mathOperations = require('./mathOperations.js');

console.log(mathOperations.add(5, 3));
console.log(mathOperations.subtract(5, 3));
console.log(mathOperations.multiply(5, 3));
try {
    console.log(mathOperations.divide(5, 0));
} catch (error) {
    console.error(error.message);
}
console.log(mathOperations.divide(6, 3));