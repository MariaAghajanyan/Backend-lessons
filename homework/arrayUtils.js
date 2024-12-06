function unique(arr) {
    return [...new Set(arr)]
}

function flatten(arr) {
    if (!Array.isArray(arr)) {
        throw new Error("Input is not array")
    }
    return arr.reduce((flat, item) =>
        Array.isArray(item) ? flat.concat(flatten(item)) : flat.concat(item), []);
}

function chunk(arr, size) {
    if (!Array.isArray(arr)) {
        throw new Error('Input is not array');
    }
    if (typeof size !== 'number' || size <= 0) {
        throw new Error('number is not positive');
    }
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

module.exports = { unique, flatten, chunk };