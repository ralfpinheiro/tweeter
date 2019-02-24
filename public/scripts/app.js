$(document).ready(function() {
  // Page load fade transition
  $("body.hidden")
    .fadeIn(1500)
    .removeClass("hidden");

  // "Compose" button trigger
  $(".compose").click(function() {
    $(".new-tweet").toggle("fast", function() {
      $("textarea").focus();
    });
  });
  // Loops through DB and pull data from each tweet to create and prepend them
  function renderTweets(tweets) {
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $tweet
        .addClass("hidden")
        .fadeIn(300)
        .removeClass("hidden");
      $("#tweets-feed").prepend($tweet);
    });
  }
  // Creates HTML structure for the new tweet
  function createTweetElement(tweet) {
    // Pull tweet data from DB structure
    const userName = tweet.user.name;
    const avatar = tweet.user.avatars.small;
    const userTag = tweet.user.handle;
    const userText = tweet.content.text;
    const datePosted = tweet.created_at;
    // Build each HTML tag for new tweet
    const $article = $("<article>");
    const $wrapper = $("<div>").addClass("tweet-wrapper");
    const $header = $("<header>").addClass("tweet-header");
    const $avatarImg = $("<img/>").attr("src", avatar);
    const $userName = $("<h3>")
      .addClass("user-name")
      .text(userName);
    const $userTag = $("<p>").text(userTag);
    const $tweetBody = $("<aside>")
      .addClass("tweet-body")
      .text(userText);
    const $footer = $("<footer>");
    const $datePosted = $("<p>").text(datePosted);
    const $socialIcons = $("<div>").addClass("social-icons");
    const $icon1 = $("<img>");
    const $icon2 = $("<img>");
    const $icon3 = $("<img>");
    const $delete = $(
      `<form class="del"><button id="${tweet.id}" type="submit"><i class="far fa-trash-alt" /></button></form>;`
    );
    // Append HTML tags to their respective parent
    $article.append($wrapper);
    $wrapper.append($header);
    $header.append($avatarImg);
    $header.append($userName);
    $header.append($userTag);
    $article.append($tweetBody);
    $article.append($footer);
    $footer.append($datePosted);
    $footer.append($socialIcons);
    $socialIcons.append($icon1);
    $socialIcons.append($icon2);
    $socialIcons.append($icon3);
    $socialIcons.append($delete);
    $icon1.attr("src", "/images/heart.png");
    $icon2.attr("src", "/images/refresh.png");
    $icon3.attr("src", "/images/flag.png");
    const convertDate = new Date(datePosted);
    $datePosted.text(convertDate.toDateString());

    return $article;
  }
  // Handles the AJAX - GET Request and renders the Tweets on success
  function loadTweets(url) {
    $.ajax({
      url: url,
      method: "GET",
      success: function(response) {
        renderTweets(response);
      }
    });
  }

  loadTweets("/tweets");

  //Delete button functionality.
  $("#tweets-feed").on("submit", function(event) {
    event.preventDefault();
    const form = event.target;
    const id = $(form)
      .children()
      .attr("id");
    $.ajax({
      method: "DELETE",
      url: "/tweets/" + id,
      success: function(tweets) {
        $("#tweets-feed").empty();
        loadTweets("/tweets");
      }
    });
  });

  // Hides overlayed error message when user clicks
  $(".error-button").on("click", function() {
    $(".error-message").hide();
  });
  $(".error-message").on("click", function() {
    $(".error-message").hide();
  });
  // Handle the AJAX - POST Request
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();
    if ($("textarea").val() === "") {
      $(".error-message").fadeToggle("fast", function() {
        $(".message").text("You Tweet is empty!");
      });
    } else if ($("textarea").val().length > 140) {
      $(".error-message").fadeToggle("fast", function() {
        $(".message").text("That is too long buddy...");
      });
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $("#tweet-form").serialize(),
        success: function(tweets) {
          $("textarea").val("");
          $("#tweets-feed").empty();
          $(".counter").text(140);
          loadTweets("/tweets");
        },
        error: function() {
          alert("Bad Tweet!");
        }
      });
      console.log("POST request sent");
    }
  });
});
