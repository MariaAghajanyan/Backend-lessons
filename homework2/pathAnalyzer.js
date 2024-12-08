const path = require('path');
class PathAnalyzer {
getBaseName(filePath){
    return path.basename(filePath);
    }
    getDirName(filePath) {
        return path.dirname(filePath);
    }
    getExtension(filePath) {
        return path.extname(filePath);
    }
    isAbsolutePath(filePath) {
        return path.isAbsolute(filePath);
    }
    

}

