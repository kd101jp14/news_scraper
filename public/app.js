// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append(
      "<p data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "<br />" +
        data[i].link +
        "</p>"
    );
  }
});

// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
    // Empty the comments from the comment section
    $("#comments").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the comment information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#comments").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#comments").append("<input id='titleinput' name='title' >");
        // A textarea to add a new comment body
        $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new comment, with the id of the article saved to it
        $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save comment</button>");
  
        // If there's a comment in the article
        if (data.comment) {
          // Place the title of the comment in the title input
          $("#titleinput").val(data.comment.title);
          // Place the body of the comment in the body textarea
          $("#bodyinput").val(data.comment.body);
        }
      });
  });