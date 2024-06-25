const { v4: uuidv4 } = require("uuid");

const USER = require("../models/user");
const { setUser } = require("../uidToken");

const renderSignUp = (req, res) => {
    return res.render("signup");
}
const renderLogin = (req, res) => {
    return res.render("login");
}

const createNewUser = async (req, res) => {
    const body = req.body;
    if (!body)
        return res.status(400).json({ error: "Details not found" });

    await USER.create({
        name: body.name,
        email: body.email,
        password: body.password,
    });
    return res.redirect("/login");
};

const loginUser = async (req, res) => {
    const body = req.body;
    const user = await USER.findOne({
        email: body.email,
        password: body.password,
    });
    // console.log(user);
    if (!user)
        return res.render("login", {
            error: "Invalid email or password",
        });
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("UID", sessionId);
    return res.redirect("/");
}

module.exports = {
    renderSignUp, renderLogin,
    createNewUser, loginUser,
};