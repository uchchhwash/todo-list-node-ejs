const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let item = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = []
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US",options);
    res.render('list', { listTitle: day, listItem:item });
})

app.post("/", function(req,res){
    item.push(req.body.newItem);
    res.redirect("/");
})

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", listItem: workItems});
})

app.post('/work', function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})
app.listen(3000, function () {
    console.log("server started on : http://localhost:3000");
})

