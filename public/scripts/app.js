$( document ).ready(function() {
  //creates all the elements on the page for each tweet
  function createTweetElement(tweet) {
    var html = `
    <article>
        <header>
          <h3>${escape(tweet.user.handle)}</h3>
          <img class="avatar" src="${tweet.user.avatars.regular}">
          <h2>${escape(tweet.user.name)}</h2>
        </header>
        <p>${escape (tweet.content.text)} </p>
        <footer>
          <p>${moment(tweet.created_at).startOf('hour').fromNow()}</p>
        </footer>
      </article>
  `;
    return html;
  }
  //loops throught he tweets and calls on createTweetElement function for each
  function renderTweets(tweets) {
    var $tweetContainer = $('#tweets');
    $tweetContainer.empty();
    tweets.forEach(function(tweet) {
      $tweetContainer.prepend(createTweetElement(tweet));
    });
  }
  //gets all tweest and calls on renderTweets function
  //if successful
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

  loadTweets();
  //sends the tweet data to the server and calls on loadTweets
  //function if successful
  function createNewTweet(data) {

    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: data,
      success: loadTweets
    });
  }
  //error alerts and calls on createNewTweet function
  $('form').submit(function(evt) {
    evt.preventDefault();
    var text = $('textarea').val();
    if (text.length === 0) {
      alert('Please fill in the field');
    } else if (text.length > 140) {
      alert('Character limit exceeded');
    } else {
      var formStuff = $( this ).serialize();
      createNewTweet(formStuff);
      $('textarea').val('');
    }
  });

  //hiding the compose form
  $(".new-tweet").hide();
  //toggles the compose form when the 'compose' button is clicked and scrolls to the top
  $("button").click(function() {
    $(".new-tweet").slideToggle();
    $('textarea').focus();
    $("body").scrollTop(0);
  });

  function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
});