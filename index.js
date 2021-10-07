const Slimbot = require("slimbot");
const {
  telegram_api_key,
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
  chat_id
} = require("./secret.json");
const Twitter = require("twitter");

const slimbot = new Slimbot(telegram_api_key);

const client = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token,
  access_token_secret: access_token_secret,
});

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function getLastTweet() {
  var lastTweet = "";

  while (true) {
    var params = { list_id: "1432403151492091911", tweet_mode: "extended" };
    client.get(
        "lists/statuses.json",
        params,
        function (error, tweets, response) {
          if (!error && tweets.length > 0) {
            if (tweets[0].full_text != lastTweet) {
              sendMessage(tweets[0].full_text);
              lastTweet = tweets[0].full_text;
            }
          } else if (error) {
            console.log(error);
          }
        }
      );

    await delay(5000);
  }
}

function sendMessage(text) {
  slimbot.sendMessage(chat_id, text);
}

function main() {
console.log('Kripto Para Listesi Dinlemeye Alındı...');
  getLastTweet();
}

main();
