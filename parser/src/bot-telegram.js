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

telegramBot.on('callback_query', async ctx => {

    try {
        switch(ctx.data) {
            case "delete":
                await telegramBot.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
                break;
        }
    }
    catch(error) {
        console.log(`telegramBot error ${error}`);
    }

})

export default telegramBot;