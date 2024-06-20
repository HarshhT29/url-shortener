const express = require("express");
const urlRoute = require("./routes/url");
const { connectMongoDB } = require("./connection");

const app = express();
const PORT = 8080;

connectMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("MongoDB connected"));

//middleware
app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));