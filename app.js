const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var item = ["Buy Food", "Cook Food", "Eat Food"];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var day = today.toLocaleDateString("en-US",options);
    res.render('list', { kindOfDay: day, newItem:item });
})

app.post("/", function(req,res){
    item.push(req.body.newItem);
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("server started on : http://localhost:3000");
})