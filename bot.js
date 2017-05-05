var twit = require('twit');
var config = require('./config.js')
var Twitter = new twit(config);

var retweet = function() {
  var params = {
    q: '#nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data) {
    if (!err) {
      var retweetID = data.statuses[0].id_str;
      Twitter.post('statuses/retweet/:id'), {
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
      console.log('Something went wrong while SEARCHING')
    }
  });
}

retweet();
setInterval(retweet, 3000000);

var favoriteTweet = function() {
  var params = {
    q: '#nodejs, #Nodejs',
    result_type: 'recent',
    lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data) {
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);
    if (typeof randomTweet != 'undefined') {
      Twitter.post('favorites/create', {id: randomTweet.id_str}, function(err, response) {
        if (err) {
          console.log('CANNOT BE FAVORITE, ERROR');
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

function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};
