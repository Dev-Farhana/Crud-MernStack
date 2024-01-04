const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const connectDb = require("./server/database/connection")
const app = express();

dotenv.config({path: "./config.env"});
const Port = process.env.Port || 8080;

app.use(morgan("tiny"));

//connect Mongodb
connectDb();

app.use(bodyParser.urlencoded({extended: true }));

app.set("view engine" , "ejs");
// app.set("views", path.resolve(__dirname, "views/ejs"))

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")))
app.use("/js", express.static(path.resolve(__dirname, "assets/js")))

app.use("/", require('./server/routes/router'))


app.listen(Port, () => {
    console.log(`Server is running on  ${Port}`)
})