const express = require("express");

const bodyParser = require("body-parser");
const _ = require("lodash");
const { getItems } = require("./models/models");
const model = require(__dirname + "/models/models.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {

    model.Item.find({}, function(err, data) {
        if (err) {
            console.log("DB Access Error");
        } else {
            if (data.length === 0) {
                model.Item.insertMany(model.defaultItems, function(err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Default Items Inserted Successfully")
                        res.redirect("/");
                    }
                })
            }
        }
    })

    let listItem = model.Item.find({}, function(err, foundItems) {
        if (err) {
            console.log(err);
        } else {
            res.render('list', { "listTitle": "Today", listItem: foundItems });
        }
    })

})

app.get("/:customListName", function(req, res) {
    const customListName = _.capitalize(req.params.customListName);

    model.List.findOne({ name: customListName }, function(err, foundList) {

        if (!err) {
            if (!foundList) {
                console.log("Doesn't Exist");
                let list = new model.List({
                    name: customListName,
                    items: model.defaultItems
                });
                console.log(list);
                list.save();
                res.redirect("/" + customListName)
            } else {
                res.render("list", { listTitle: foundList.name, listItem: foundList.items });
            }
        }
    })
})


app.listen(3000, function() {
    console.log("server started on : http://localhost:3000");
})