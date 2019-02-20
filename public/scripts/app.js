$(document).ready(function() {
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    user: {
      name: "Newton",
      avatars: {
        small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      handle: "@SirIsaac"
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  };

  function createTweetElement(tweetData) {
    let $article = $("<article>");
    let $header = $("<header>").addClass("tweet-header");
    $article.append($header);
    let $avatarImg = $("<img>");
    $header.append($avatarImg);
    let $userName = $("<h3>").addClass("user-name");
    $header.append($userName);
    let $userTag = $("<p>");
    $header.append($userTag);
    let $tweetBody = $("<aside>").addClass("tweet-body");
    $article.append($tweetBody);
    let $footer = $("<footer>");
    $article.append($footer);
    let $datePosted = $("<p>");
    $footer.append($datePosted);
    let $socialIcons = $("<div>").addClass("social-icons");
    $footer.append($socialIcons);
    let $icons = $("<img>");
    $socialIcons.append("$icons");
    return $article;
  }

  let $tweet = createTweetElement(tweetData);

  $("#tweets-feed").append($tweet);
});
