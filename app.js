var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var got = require("got");

var port = process.env.PORT || 8080;

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

app.get("/results", function(req,res){
    res.render("results");
})

app.listen(port, function(){
    // console.log(process.env.PORT);
    console.log("Server is running");
});