const express = require('express')
const fs = require('fs')
const multer = require('multer');
const app = express()
const port = 3000

const upload = multer({ dest: "uploads" });

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use(express.static("uploads"))

app.use(function(req, res, next) {
    console.log(req.url);
    next();
})

app.post("/save", function(req, res) {
    let data = JSON.stringify(req.body)
    console.log("savejs  " + data);
    fs.writeFile('./data.txt', data, (err) => {
        res.end(data);
    })
})

app.get("/getdata", function(req, res) {
    readFile("./data.txt", function(err, data) {
        res.end(data);
    })
})



app.get("/", (req, res) => {
    readFile("./static/todoapphtml.html", function(err, data) {
        if (err) {
            res.end("error")
            return
        }
        res.end(data)
    })
})


function readFile(path, a) {
    fs.readFile(path, function(err, data) {
        a(err, data);
    })
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})