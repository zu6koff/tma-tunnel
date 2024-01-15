#!/usr/bin/env node

const ngrok = require('ngrok');

const config = require('require-module')('./tma-tunnel.config.json');
const axios = require('axios');

const TG_API_URL = 'https://api.telegram.org/bot';

const apiInstance = axios.create();

let started = false;

function handleBotApiError(err) {
  console.error(`Bot API error: ${err.response.data.description}`);
  process.exit(1);
}

async function setMenuButton({
  userId,
  url,
  type = 'web_app',
  text
}) {
  await apiInstance.post('/setChatMenuButton', {
    chat_id: userId,
    menu_button: {
      type,
      text,
      web_app: {
        url,
      }
    }
  })
}

async function getBotInfo() {
  const {data} = await apiInstance.get('/getMe');
  return data.result;
}

async function run() {
  if (!config.botToken) {
   console.log('Please include botToken in tma-tunnel.config.json');
   process.exit(0);
  }

  for (let i = 2; i < process.argv.length; i++) {
    const [option, value] = process.argv[i].split('=');
    if (option === '--port') {
      process.env.PORT = value;
    }
  }

  const {botToken, userIds} = config;

  apiInstance.defaults.baseURL = `${TG_API_URL}${botToken}`;

  const url = await ngrok.connect(process.env.PORT || 5172);
  const promises = [];

  for (let i = 0; i < userIds.length; i++) {
    promises.push(setMenuButton({
      userId: userIds[i],
      url,
      type: 'web_app',
      text: 'Start (dev)'
    }).catch((err) => {
      const errorMessage = {
        400: `The user ${userIds[i]} can not be found or the user has not opened a dialogue with the bot yet`,
      }[err.response.data.error_code];

      if (errorMessage) {
        console.error(errorMessage);
        process.exit(1);
        return;
      }

      handleBotApiError(err)
    }));
  }

  await Promise.all(promises);

  const botInfo = await getBotInfo().catch((err) => handleBotApiError(err));

  console.log(`
Tunnel URL: ${url}
Bot URL: https://t.me/${botInfo.username}
  `);

  started = true;
}

process.on('SIGINT', async () => {
  if (!started) return;

  const promises = [];

  const {userIds} = config;

  for (let i = 0; i < userIds.length; i++) {
    promises.push(setMenuButton({
      userId: userIds[i],
      type: 'default',
    }).catch((err) => handleBotApiError(err)));
  }

  await Promise.all(promises);

  process.exit();
});

run().catch((err) => console.log(err))
