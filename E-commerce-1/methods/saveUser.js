const readFile = require("../utils/writeFile");
const getUsers = require("./getUsers");
const writeFile = require("write-file-atomic");
module.exports = function(newUser, callback) {
    getUsers((err, users) => {
        if (err) {
            callback("something went wrong");
            return;
        }

        for (let i = 0; i < users.length; i++) {
            let user = users[i]

            if (user.username == newUser.username) {
                callback("user already exist");
                return
            }
        }

        users.push(newUser);

        writeFile("./db.txt", JSON.stringify(users), function(err) {
            if (err) {
                callback("error while saving user");
            } else {
                callback(null, true);
            }
        })

    })
}