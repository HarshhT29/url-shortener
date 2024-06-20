const express = require("express");
const path = require("path");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const { connectMongoDB } = require("./connection");

const app = express();
const PORT = 8080;

connectMongoDB("mongodb://127.0.0.1:27017/short-url")
    .then(() => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/", staticRoute);
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));