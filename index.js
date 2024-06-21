const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");
const { loggedInUserOnly } = require("./middleware/auth");    //custom middleware

const { connectMongoDB } = require("./connection");

const app = express();
const PORT = 8080;

connectMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/url", loggedInUserOnly, urlRoute); //inline middleware for authentication

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));