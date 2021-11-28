module.exports = function(req, res, next) {
    console.log(req.session.is_logged_in);
    if (req.session.is_logged_in) {
        next();
    } else {
        res.render("landingPage");
    }
}