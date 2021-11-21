const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000
const session = require('express-session')


app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))


app.get('/', function(req, res) {
    if (req.session.isLoggedIn == true) {
        res.sendFile(__dirname + '/index.html');
    } else {

        res.redirect('/login');
    }

})

app.get('/login', function(req, res) {

    if (req.session.isLoggedIn) {
        res.redirect('/');

    } else {
        res.sendFile(__dirname + '/login.html');
    }

})


app.post('/login', function(req, res) {


    fs.readFile('./data.txt', function(err, users) {
        if (err) {
            res.send('No user found');
            return;
        }
        users = JSON.parse(users);

        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.username == req.body.username &&
                user.password == req.body.password) {
                req.session.isLoggedIn = true;
                req.session.username = req.body.username;
                res.redirect('/');
                return;
            }
        }


        res.send('No user exist, please register first');
    })
})


app.get('/register', function(req, res) {
    res.sendFile(__dirname + '/register.html');
})

app.post('/register', function(req, res) {

    const { username, password } = req.body;

    fs.readFile('./data.txt', function(err, users) {
        if (err) {
            res.send("User already exists");
            console.log('error is data file');
            return;
        }
        users = JSON.parse(users);

        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            if (user.username == username && user.password == password) {
                res.end("user already exist");
            }
        }
        users.push(req.body);
        fs.writeFile('./data.txt', JSON.stringify(users), function(users) {
            req.session.isLoggedIn = true;
            req.session.username = username;
            res.redirect('/');
        })


    })

})


app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})