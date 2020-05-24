var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const axios = require("axios");

var port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(express.static("public"));

//extended true: allows it to read blogs[whatever]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.redirect("/home");
});

app.get("/home", function (req, res) {
    res.render("index");
});

app.get("/results", function (req, res) {

var search = req.query.text;
var url = "https://dictionaryapi.com/api/v3/references/collegiate/json/" + search + "?key=d813862e-9113-43f5-ad8a-143954d0fab4";
    
 axios.get(url)
  .then(function (response) {
    // handle success
    // var data = response.data.toString();
    // console.log(data);
    var data = response.data;

    console.log(req.query.text);

    res.render("results", {data: data});

    // res.send(data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
});


app.listen(port, function () {
    // console.log(process.env.PORT);
    console.log("Server is running");
});