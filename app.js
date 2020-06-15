const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    var today = new Date();
    var curretDay = today.getDay();
    var day = "";

    if (curretDay === 6 || curretDay === 0) {
        day = "Weekend";
    }
    else {
        day = "Weekday";
    }
    res.render('list', { kindOfDay: day });
})

app.listen(3000, function () {
    console.log("server started on : http://localhost:3000");
})