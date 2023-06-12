
const isLoggedIn = (req, res, next) => {
    console.log("currentUser", req.session.currentUser)
    if (!req.session.currentUser) {
        return res.redirect("/login");
    }
    next();
};

// if already logged in user tries to access the login page it redirects the user to the home page
const isLoggedOut = (req, res, next) => {
    if (req.session.currentUser) {
        return res.redirect("/");
    }
    next();
};

module.exports = {
    isLoggedIn,
    isLoggedOut
};