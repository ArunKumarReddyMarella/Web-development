const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))

const sendEmail = require("./methods/sendEmail");

const readFile = require("./utils/readFile");
const writeFile = require("./utils/writeFile");

const getUsers = require("./methods/getUsers");
const saveUser = require("./methods/saveUser");

const getProducts = require("./methods/getProducts");

const checkAuth = require("./middleware/checkAuth");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.set("view engine", "ejs")

app.get('/', (req, res) => res.render('home'))

app.route("/login").get((req, res) => res.render('login', { error: '' }))
    .post((req, res) => {
        const { username, password } = req.body;
        getUsers((err, users) => {
            if (err) {
                res.render("login", { error: "user not found" })
                return;
            }

            for (let i = 0; i < users.length; i++) {
                let user = users[i]

                if (user.username == username && user.password == password) {
                    req.session.is_logged_in = true;
                    req.session.user = user;
                    //res.render("landingPage", { user: req.session.user })
                    res.redirect("/home");
                    return;
                }
                if (user.username == username && user.password != password) {
                    res.render("login", { error: "wrong password" })
                    return;
                }
                res.render("login", { error: "user not found" })
            }
        })
    })


app.route("/signup").post((req, res) => {
    const { username, password, email, name, mobile } = req.body;
    if (!username || !name || !password || !mobile) {
        res.render("signup", { error: "something forgot" });
        return;
    }
    let user = {
        username,
        email,
        name,
        mobile,
        password,
        isVerified: false
    };

    saveUser(user, function(err) {
        if (err) {
            res.render("signup", { error: err });
        } else {
            req.session.is_logged_in = true;
            req.session.user = user;
            //res.render("landingPage", { user: req.session.user })

            sendEmail(function(err, data) {
                console.log(err, data);
                res.redirect("/home");
            })

        }
    })
}).get((req, res) => {
    res.render("signup", { error: false });
})

app.get("/home", checkAuth, (req, res) => {

    const { page_no } = parseInt(req.query);

    getProducts(page_no, (products) => {
        res.render("landingPage", { products, page_no: page_no + 1 })
    })
})

app.get("/logout", (req, res) => {
    req.session.destroy()

    res.render("home");
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))