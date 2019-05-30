var express = require("express");

var router = express.Router();

// Import the models to use their database functions
var article = require("../models/Article.js");
var comment = require("../models/Comment.js");

router.get("/", function(req, res) {
    article.all(function(data) {
      var hbsObject = {
        articles: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });