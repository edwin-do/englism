var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.static("public"));

//extended true: allows it to read blogs[whatever]
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", function(req,res){
    res.redirect("/home");
});

app.get("/home", function(req,res){
    res.render("index");
});