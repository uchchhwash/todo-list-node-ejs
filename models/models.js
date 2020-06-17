const mongoose = require("mongoose");
mongooseDatabaseUrl = process.env.dbUrl;

mongoose.connect(mongooseDatabaseUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

let item = [];
const itemSchema = {
    name: String,
}
const Item = mongoose.model("Item", itemSchema);


const listSchema = {
    name: String,
    items: [itemSchema]
}
const List = mongoose.model("List", listSchema);


const item1 = new Item({
    name: "Add an Item"
})
const item2 = new Item({
    name: "Update an Item"
})
const item3 = new Item({
    name: "Remove a Item"
})
const sampleItem = new Item({
    name: "Sample Item"
})

let defaultItems = [sampleItem]
exports.generateUrl = function() {
    return Math.random().toString(36).substring(2, 15) + Math.floor(Date.now() / 1000) + Math.random().toString(36).substring(2, 15);
}

exports.defaultItems = defaultItems;
exports.Item = Item;
exports.List = List;