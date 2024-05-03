import TelegramBot from 'node-telegram-bot-api';
import config from './config.js';

let telegramBot = null;

telegramBot = new TelegramBot(config.botApiKey, {
    polling: true
});

telegramBot.on("polling_error", err => console.log(err.data.error.message));

const commands = [
    {
        command: "start",
        description: "Запуск бота"
    },

]

telegramBot.setMyCommands(commands);

export default telegramBot;