const fs = require('fs');

function readFile(path, callback) {
    /*fs.readFile(path,"utf-8",function(err,data){
        callback(err,data);
    })*/

    fs.readFile(path, "utf-8", callback)
}

module.exports = readFile;