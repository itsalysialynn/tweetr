function renderTweets(tweets) {
  var $tweetContainer = $('#tweets');
  for (var ii = 0; ii < tweets.length; ii++) {
    let tweet = tweets[ii];
    $tweetContainer.append(createTweetElement(tweet));
  }
}

function createTweetElement(tweet) {
  const html = `
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
  let text = $('textarea').val();
  if (text.length === 0) {
    alert('Please fill in the field');
  } else if (text.length > 141) {
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
    success: renderTweets
  });
}

function createNewTweet (data) {

  $.ajax({
     url: '/tweets',
     type: 'POST',
     dataType: 'json',
     data: data,
     success: loadTweets
   });
}

loadTweets();