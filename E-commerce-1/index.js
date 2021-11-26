const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000

const readFile = require("./utils/readFile");
const writeFile = require("./utils/writeFile");

const getUsers = require("./methods/getUsers");
const saveUser = require("./methods/saveUser");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.set("view engine", "ejs")

app.get('/', (req, res) => res.render('home'))

app.get('/login', (req, res) => res.render('login'))


app.route("/signup").post((req, res) => {
    const { username, password, name, mobile } = req.body;
    if (!username || !name || !password || !mobile) {
        res.render("signup", { error: "something forgot" });
        return;
    }
    let user = {
        username,
        name,
        mobile,
        password
    };

    saveUser(user, function(err) {
        if (err) {
            res.render("signup", { error: err });
        } else {
            res.render("landingPage");
        }
    })
}).get((req, res) => {
    res.render("signup", { error: false });
})

app.get("/home", (req, res) => {
    res.render("landingPage")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))