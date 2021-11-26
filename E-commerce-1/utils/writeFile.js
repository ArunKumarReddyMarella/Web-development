const fs = require('fs');

function writeFile(path, data, callback) {
    /*fs.readFile(path,"utf-8",function(err,data){
        callback(err,data);
    })*/

    fs.writeFile(path, data, callback)
}

module.exports = writeFile;