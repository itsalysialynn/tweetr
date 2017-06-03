$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    var max = 140;
    var counter = $(this).closest(".new-tweet").find(".counter");
    var length = max - $(this).val().length;
    counter.text(length);
    if (length <= 0) {
      counter.addClass("redmax");
    } else {
      counter.removeClass("redmax");
      $(".errors p").slideUp("fast");
    }
  });
});
