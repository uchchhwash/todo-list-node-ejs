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

app.post("/", function(req, res) {
    const newItem = new model.Item({
        name: req.body.newItem
    })
    if (req.body.list === "Today") {
        newItem.save();
        res.redirect("/");
    } else {
        model.List.findOne({ name: req.body.list }, function(err, foundList) {
            foundList.items.push(newItem);
            foundList.save();
            console.log("/" + req.body.list);
            res.redirect("/" + req.body.list);
        })
    }
})

app.post("/delete", function(req, res) {
    const checkedItemId = req.body.newItem;
    const listName = req.body.listName;
    console.log(req.body)
    if (req.body.listName === "Today") {
        model.Item.findByIdAndRemove(checkedItemId, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Deleted Successfully");
                res.redirect("/");
            }
        })
    } else {
        model.List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, function(err, foundList) {
            if (err) {
                console.log(err);
            } else {
                console.log("Deleted Successfully");
                res.redirect("/" + listName);
            }
        })

    }
})


app.listen(3000, function() {
    console.log("server started on : http://localhost:3000");
})