const { getUser } = require("../uidToken");

const loggedInUserOnly = (req, res, next) => {
    const userUID = req.cookies?.UID;

    if(!userUID)
        return res.redirect("/login");
    const user = getUser(userUID);
    if(!user)
        return res.redirect("/login");
    req.user = user;
    next();
}

const checkAuth = async (req, res,next) => {
    const userUID = req.cookies?.UID;
    const user = getUser(userUID);
    req.user = user;
    next();
}

module.exports = { loggedInUserOnly, checkAuth };