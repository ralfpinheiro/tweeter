$(document).ready(function() {
  // Text area character count
  $("textarea").on("keyup", function() {
    var maxlength = 140;
    var textAreaLength = $(this).val().length;
    var charactersRemaining = maxlength - textAreaLength;
    console.log($(".counter").text("Characters left: " + charactersRemaining));
    // If text area character count exceeds the limit, char count text turn red
    var counter = $(this)
      .parent()
      .find(".counter");
    if (charactersRemaining < 0) {
      counter.addClass("error");
    } else {
      counter.removeClass("error");
    }
  });
});
