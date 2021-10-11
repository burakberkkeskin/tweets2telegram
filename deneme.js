const Slimbot = require("slimbot");
const {
  telegram_api_key,
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret,
  chat_id,
} = require("./secret.json");

const slimbot = new Slimbot(telegram_api_key);

var subscribedChatIds = [];

slimbot.on("message", (message) => {

  if (message.text == "/start") {
    slimbot.sendMessage(message.chat.id,"Welcome To Latest Important Crypto News\nSend /subscribe to subcribe the bot\nSend /unsubscribe to unsubscribe from the bot.");
  } 

  else if (message.text.toLowerCase() == "/subscribe") {
    if(!subscribedChatIds.includes(message.chat.id)){
      subscribedChatIds.push(message.chat.id);
      slimbot.sendMessage(message.chat.id, "Subscribed To Crypto News!");
      console.log(subscribedChatIds);
    } else{
      slimbot.sendMessage(message.chat.id, "You Are Already Subscribed To Crypto News!");
    }
  }

  else if(message.text.toLowerCase() == "/unsubscribe"){
    if(subscribedChatIds.includes(message.chat.id)){
      subscribedChatIds.push(message.chat.id);
      slimbot.sendMessage(message.chat.id, "Unsubscribed From Crypto News!");
      console.log(subscribedChatIds);
    }
    else{
      slimbot.sendMessage(message.chat.id, "You Haven't Subscribed To Crypto News!");
    }
  }
});

slimbot.startPolling();
