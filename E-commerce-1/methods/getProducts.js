//const readFile = require("../utils/readFile");

const products = require("../product");
module.exports = function(page_no, callback) {
    if (!page_no) {
        page_no = 1;
    }

    const productsPerPage = 5;

    const totalPages = Math.ceil(products.length / productsPerPage);

    const lastProductIndex = productsPerPage * page_no - 1;


    callback(products);
}