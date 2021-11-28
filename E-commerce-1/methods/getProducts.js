//const readFile = require("../utils/readFile");

const products = require("../product");
module.exports = function(callback) {
    callback(products);
}