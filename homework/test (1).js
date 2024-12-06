const arrayUtils = require('./arrayUtils.js');

console.log(arrayUtils.unique([1, 2, 2, 3, 4, 4]));
console.log(arrayUtils.flatten([1, [2, [3, 4]], 5]));
console.log(arrayUtils.chunk([1, 2, 3, 4, 5], 2));