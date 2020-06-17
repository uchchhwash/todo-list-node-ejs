const express = require("express");

const bodyParser = require("body-parser");
const _ = require("lodash");
const { getItems } = require("./models/models");
const model = require(__dirname + "/models/models.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.listen(3000, function() {
    console.log("server started on : http://localhost:3000");
})