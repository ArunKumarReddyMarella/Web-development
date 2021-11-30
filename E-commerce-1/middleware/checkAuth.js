module.exports = function(req, res, next) {
    console.log(req.session.is_logged_in);
    if (req.session.is_logged_in) {
        if (req.session.user.isVerified)
            next();
        else
            res.render("notVerified");
    } else {
        res.render("landingPage");
    }
}