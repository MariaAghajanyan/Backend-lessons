function reverse1(str) {
    if (typeof str !== 'string') {
        throw new Error("Error....")
    }
    return str.split("").reverse().join("")
}

function capitalize(str) {
    if (typeof str !== 'string') {
        throw new Error("Error....")
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function truncate(str, len) {
    if (typeof str !== 'string') {
        throw new Error("Error....")
    }
    if (typeof len !== 'number' || len < 0) {
        throw new Error("Error....")
    }
    if (str.length > len) {
        return str.slice(0, len) + "..."
    }
    return str
}

module.exports = {
    reverse1,
    capitalize,
    truncate
}