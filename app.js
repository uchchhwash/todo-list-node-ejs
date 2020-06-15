const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req, res){
    res.send("Hello API");
})

app.listen(3000, function(){
    console.log("server started on : http://localhost:3000");
})