var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const axios = require("axios");
var dictKey = process.env.dictKey || require("./key").getDictKey();
var thesKey = process.env.thesKey || require("./key").getThesKey();


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
    var option = req.query.option;
    var url = "";
    
    if (option == "def"){
        url = "https://dictionaryapi.com/api/v3/references/collegiate/json/" + search + "?key=" + dictKey ;

        axios.get(url)
        .then(function (response) {
            // handle success
            var data = response.data
            res.render("resultsDict", {data: data, search: search});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            res.render("index");
        })
    }else if(option == "sym"){
        url = "https://dictionaryapi.com/api/v3/references/thesaurus/json/" + search + "?key=" + thesKey ;
        axios.get(url)
        .then(function (response) {
            // handle success
            var data = response.data;
            res.render("resultsThes", {data: data, search: search});
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }else{
        console.log("error");
        res.render("index");
    }
        

});


app.listen(port, function () {
    console.log("Server is running");
});