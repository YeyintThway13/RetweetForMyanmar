const Twit = require("twit");
const config = require("./config");

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;

const Tweet = new Twit(config);

const params = {
  q: `#WhatsHappeningInMyanmar since:${today}`,
  count: 100,
};

Tweet.get("search/tweets", params, function (err, data, response) {
  const tweets = data.statuses;
  if (!err) {
    for (let tweet of tweets) {
      let retweetID = tweet.id_str;
      Tweet.post(
        "statuses/retweet/:id",
        { id: retweetID },
        function (err, data, response) {
          if (response) {
            console.log(`Post retweeted with id ${retweetID}`);
          }
          if (err) {
            console.log("Already Retweetes");
          }
        }
      );
    }
  }
});
