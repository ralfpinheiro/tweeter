$(document).ready(function() {

    $( ".compose" ).click(function() {
        $(".new-tweet").toggle( "fast", function() {
            $('textarea').focus();
        });
      });
// Loops through DB and pull data from each tweet to create and prepend them
  function renderTweets(tweets) {
    tweets.forEach(tweet => {
      let $tweet = createTweetElement(tweet);
      $("#tweets-feed").prepend($tweet);
    });
  }
// Creates HTML structure for the new tweet
  function createTweetElement(tweet) {
// Pull tweet data from DB structure
    let userName = tweet.user.name;
    let avatar = tweet.user.avatars.small;
    let userTag = tweet.user.handle;
    let userText = tweet.content.text;
    let datePosted = tweet.created_at;
// Build each HTML tag for new tweet
    let $article = $("<article>");
    let $header = $("<header>").addClass("tweet-header");
    let $avatarImg = $("<img/>").attr("src", avatar);
    let $userName = $("<h3>").addClass("user-name").text(userName);
    let $userTag = $("<p>").text(userTag);
    let $tweetBody = $("<aside>").addClass("tweet-body").text(userText);
    let $footer = $("<footer>");
    let $datePosted = $("<p>").text(datePosted);
    let $socialIcons = $("<div>").addClass("social-icons");
    let $icon1 = $("<img>");
    let $icon2 = $("<img>");
    let $icon3 = $("<img>");
// Append HTML tags to its respective parent tag
    $article.append($header);
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
    $icon1.attr("src", "/images/flag.png");
    $icon2.attr("src", "/images/refresh.png");
    $icon3.attr("src", "/images/heart.png");
    let convertDate = new Date(datePosted);
    $datePosted.text(convertDate.toDateString());

    return $article;
  }

  // Handles the AJAX - GET Request and render the Tweets on success
function loadTweets(url) {
    $.ajax({
      url: url,
      method: "GET",
      success: function(response) {
        renderTweets(response);
      }
    });
  }

  $('.error-button').on('click', function(){
    $('.error-message').hide(); 
  });
  $('.error-message').on('click', function(){
    $('.error-message').hide(); 
  });


// Handle the AJAX - POST Request
$("#tweet-form").on('submit', function(event) {
    event.preventDefault();
    if ($('textarea').val() === '') {
        $(".error-message").toggle( "fast", function() {
            $('.message').text('You Tweet is empty!');
        });  
    }  else if ($('textarea').val().length > 140) {
        $(".error-message").toggle( "fast", function() {
            $('.message').text('Please make your Tweet shorter!');
        }); 
     } else {

    $.ajax({
        type: "POST",
        url:'/tweets',
        data: $('#tweet-form').serialize(),
        success: function(tweets) {
            $('textarea').val('');
            $('#tweets-feed').empty();
            $('.counter').text(140);
            loadTweets('/tweets');        },
        error: function() {
            alert('Bad Tweet!');
        }
      });
      console.log('POST request sent')
    }
});

});

