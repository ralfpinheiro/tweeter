$(document).ready(function() {
  // Test / driver code (temporary). Eventually will get this from the server.
//   const data = [
//     {
//       user: {
//         name: "Newton",
//         avatars: {
//           small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//           regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//           large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//         },
//         handle: "@SirIsaac"
//       },
//       content: {
//         text: "If I have seen further it is by standing on the shoulders of giants"
//       },
//       created_at: 1461116232227
//     },
//     {
//       user: {
//         name: "Descartes",
//         avatars: {
//           small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//           regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//           large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//         },
//         handle: "@rd"
//       },
//       content: {
//         text: "Je pense , donc je suis"
//       },
//       created_at: 1461113959088
//     },
//     {
//       user: {
//         name: "Johann von Goethe",
//         avatars: {
//           small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//           regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//           large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//         },
//         handle: "@johann49"
//       },
//       content: {
//         text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//       },
//       created_at: 1461113796368
//     }
//   ];
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

//   renderTweets(data);

function loadTweets(url) {
    console.log('Button clicked, performing ajax call...');
    $.ajax({
      url: url,
      method: "GET",
      success: function(response) {
        renderTweets(response);
      }
    });
  }


$("#tweet-form").on('submit', function(event) {
    event.preventDefault();

    if ($('textarea').val() === '') {
    console.log('Please fill in the form!');
    } 

    $.ajax({
        type: "POST",
        url:'/tweets',
        data: $('#tweet-form').serialize(),
        success: function(tweets) {
            // console.log('SUCCESSS!');
        },
        error: function() {
            alert('Bad Tweet!');
        }
      });
      console.log('POST request sent')
});

});

