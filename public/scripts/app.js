function renderTweets(tweets) {
  var $tweetContainer = $('#tweets');
  $tweetContainer.empty();
  tweets.forEach(function(tweet) {
    $tweetContainer.prepend(createTweetElement(tweet));
  });
}

function createTweetElement(tweet) {
  var html = `
   <article>
      <header>
        <h3>${tweet.user.handle}</h3>
        <img class="avatar" src="${tweet.user.avatars.regular}">
        <h2>${tweet.user.name}</h2>
      </header>
      <p>${tweet.content.text} </p>
      <footer>
        <p>${new Date(tweet.created_at)}
      </footer>
    </article>
`;
  return html;
}


$('form').submit(function(evt) {
  evt.preventDefault();
  var text = $('textarea').val();
  if (text.length === 0) {
    alert('Please fill in the field');
  } else if (text.length > 140) {
    alert('Character limit exceeded');
  } else {
    var formStuff = $( this ).serialize();
    createNewTweet (formStuff);
  }
});

function loadTweets() {
  $.ajax({
    url: '/tweets',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      renderTweets(data);
    }
  });
}

function createNewTweet(data) {

  $.ajax({
     url: '/tweets',
     type: 'POST',
     data: data,
     success: loadTweets
   });
}

loadTweets();

$(".new-tweet").hide();

$("button").click(function() {
  $(".new-tweet").slideToggle()
  $('textarea').focus();
});
