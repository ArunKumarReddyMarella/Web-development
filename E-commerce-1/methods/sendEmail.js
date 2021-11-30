const mailjet = require('node-mailjet')
    .connect('ea9e80ed00e95915847167095fe7ad6e', '01979f2dd36cc4d52dcb184bf6243c64')

module.exports = function(callback) {
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [{
                "From": {
                    "Email": "arunkumarreddy159@gmail.com",
                    "Name": "Arunkumarreddy"
                },
                "To": [{
                    "Email": "18r21a0538@mlrinstitutions.ac.in",
                    "Name": "Arunkumarreddy"
                }],
                "Subject": "Greetings from Mailjet.",
                "TextPart": "My first Mailjet email",
                "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
                "CustomID": "AppGettingStartedTest"
            }]
        })
    request
        .then((result) => {
            callback(null, result.body)
        })
        .catch((err) => {
            callback(err.statusCode, null)
        })
}