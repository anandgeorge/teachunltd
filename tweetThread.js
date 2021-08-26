// const TwitThread = require("twit-thread");
import tt from "twit-thread"

const config = {
  consumer_key:"jHbq93O8UUMXPVwtS2XP5SMiV",
  consumer_secret:"RBngDERlPp7wSba6gGkbJ8pY2ENkEN2pBgS5CNOjfUA2ZYLNiB",
//   access_token:"202876984-28AP7tzBZcr1hiADaIdvEOPUzPXQZT5BXEJv9jdD",
  access_token:"nFEbwgAAAAAAvMBZAAABeBJ_hHw",
//   access_token_secret:"NVCln7XEmLvtQyl8aMlrvJLFCbCvf3EQeJGdIFxuVj87G",
  access_token_secret:"DdJPCx9y1cuHpIo2LcnaRWzf94ccjPxr",
//   timeout_ms:60*1000,
//   strictSSL: true,
};

async function tweetThread() {
   const t = new tt.TwitThread(config);
   await t.tweetThread([{"text":"Fail Fast \nI learned an important lesson in business when I launched a new retail category early in my career at Amazon: Fail Fast! I spent 18 months shipping a product that should have taken a few months, delaying the opportunity to learn and adjust to our initial failure. 1/8"},{"text":"Joining Amazon \nI was originally hired at Amazon on the business development team. After a year I got recruited to help ship a new computer store and run merchandising. I jumped at the opportunity to launch a new business and learn new skills. Amazon was great at creating these opportunities. 2/8"}]);
}

tweetThread();