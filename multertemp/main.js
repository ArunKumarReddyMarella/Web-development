const express = require('express')
const session = require('express-session');
const fs = require('fs');
const multer = require('multer');
const app = express()
const port = 3000

const upload = multer({ dest: "uploads" });

app.use(express.static("public"))
app.use(express.static("uploads"))

app.set("view engine", "ejs")

app.post('/', upload.single("profile_pic"), (req, res) => {
    console.log(req.file);

    fs.writeFile("db.txt", req.file.filename, () => {
        res.send("uploaded")
    })
})

app.get("/profile", function(req, res) {
    fs.readFile("db.txt", "utf-8", function(err, data) {
        console.log(data);
        res.render("home", { url: data });
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})