var express = require("express");

// Import the models to use their database functions
var Article = require("../models/Article.js");
var Comment = require("../models/Comment.js");

// A GET route for scraping the positive.news website
module.exports = function(app) {
  app.get("/", function(req, res) {
    res.send("Welcome to the positive news scraper!");
  });

  app.get("/scrape", function(req, res) {
    // Grab the body of the html with axios
    axios.get("https://www.positive.news/").then(function(response) {
      // Load the data into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Grab every h2 within an article tag, and do the following:
      $(".card-content").each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });

      // Send a message to the client
      res.send("Scrape Complete");
    });
  });
};
