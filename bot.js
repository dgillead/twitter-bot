var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);
var stream = Twitter.stream('user');

var retweet = function() {
  var params = {
    q: '#codeNewbie, #CodeNewbie, #freecodecamp, #freeCodeCamp',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data) {
    if (!err) {
      var retweetID = data.statuses[0].id_str;
      Twitter.post('statuses/retweet/:id', {
        id: retweetID
      }, function(err, response) {
        if (response) {
          console.log('Retweeted!!!');
        }
        if (err) {
          console.log('Something went wrong while RETWEETING');
        }
      });
    }
    else {
      console.log('Something went wrong while SEARCHING');
    }
  });
}

retweet();
setInterval(retweet, 3000000);

var favoriteTweet = function() {
  var params = {
    q: '#codeNewbie, #CodeNewbie #freecodecamp, #freeCodeCamp',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data) {
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);
    if (typeof randomTweet != 'undefined') {
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response) {
        if (err) {
          console.log('CANNOT BE FAVORITED, ERROR');
        }
        else {
          console.log('FAVORITED');
        }
      });
    }
  });
}

favoriteTweet();
setInterval(favoriteTweet, 3600000);

function ranDom(arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};

stream.on('follow', followed);
function followed(event) {
  console.log('Follow Event is running');
  var
    name = event.source.name,
    screenName = event.source.screen_name;
  tweetNow('@' + screenName + ' Thank you for the follow!');
}

function tweetNow(tweetTxt) {
  var tweet = {
    status: tweetTxt
  }
  Twitter.post('statuses/update', tweet, function(err, data, response) {
    if (err) {
      console.log("Error in replying");
    }
    else {
      console.log("Reply successful");
    }
  });
}
