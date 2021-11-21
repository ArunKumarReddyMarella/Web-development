const fs = require('fs');

const express = require('express');
var session = require('express-session')


const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');
//app.set('views',__dirname+"/view")

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))


app.get('/', (req, res) => {
    const { username } = req.session;
    if (!username) {
        res.redirect("login")
        return;
    }
    res.render(__dirname + "/views/home.ejs", { name: username, books: ["jungle", "harry potter"] });
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
})

app.post("/login", (req, res) => {
    const { username } = req.body;

    req.session.username = username
    console.log(username)
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})