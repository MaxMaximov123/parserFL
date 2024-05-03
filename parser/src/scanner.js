import puppeteer from 'puppeteer';
import { db } from './database.js';
import config from './config.js';
import telegramBot from './bot-telegram.js';

export default class Scanner {
  browser = null;
  page = null;
  postKeys = null;

  constructor() {
    this.start().catch((error) => {
      console.log(error);
    });
  }

  async waitForTimeout(time) {
    await new Promise((resolve) => setTimeout(resolve, time));
  }

  async scanning() {
    while (true) {
      for (let pageNumber = 1; pageNumber < 4; pageNumber++) {
        await this.page.goto(`https://www.fl.ru/projects/page-${pageNumber}/`);

        let postElements = await this.page.$$('.b-post');
        let newPosts = [];

        await this.waitForTimeout(5000);

        for (let postElement of postElements) {
          let post = {
          };

          post.title = (await (await (await postElement.$('.b-post__grid')).$('.b-post__title')).evaluate(element => {
            return element.textContent
          })).trim();

          post.url = (await (await (await postElement.$('.b-post__grid')).$('.b-post__title')).$eval('a', element => element.href)).trim();

          post.description = (await(
            await (await (await postElement.$('.b-post__grid')).$('.b-post__body')).$('.b-post__txt')
            ).evaluate(element => {
            return element.textContent
          })).trim();

          post.price = (await(
            await (await postElement.$('.b-post__grid')).$('.b-post__price')
            ).evaluate(element => {
            return element.textContent
          })).trim();

          post.key = (await postElement.evaluate(element => {
            return element.id
          })).trim();

          let postInfo = (await(
            await (await postElement.$('.b-post__foot')).$('.b-post__txt')
            ).evaluate(element => {
            return element.textContent
          })).split('  ').filter(item => item);

          post.answers = postInfo[0].trim();
          post.views = postInfo[1].trim();
          post.addedAt = postInfo[2].trim();

          post.createdAt = new Date();

          if (!this.postKeys.includes(post.key)) {
            this.postKeys.push(post.key);
            Object.values(config.botUserIds).map(userId => {
              telegramBot.sendMessage(
                userId,
                `<b>${post.title.toUpperCase()}</b>\n\n` +
                `${post.description}\n\n` +
                `💰 <b>${post.price}</b>\n` +
                `👀 <b>${post.views}</b>\n` +
                `💬 <b>${post.answers}</b>\n` +
                `<b>${post.addedAt}</b>\n` +
                `<a href='${post.url}'>Просмотр</a>` +
                `<a href='${post.url}'>.</a>`, 
                {
                  parse_mode: "HTML",
                  reply_markup: {
                    inline_keyboard: [
                      [{text: 'Просмотрено', callback_data: 'delete'}]
                    ]
                  },
                  disable_web_page_preview: true,
                }
              );
            });
          }

          console.log(post);
          newPosts.push(post);
        }

        if (newPosts.length > 0) {
          await db('posts').insert(newPosts).onConflict(['key']).merge();
        }
      }

      await this.waitForTimeout(1000 * 60);
    }
  }

  async start() {
    this.browser = await puppeteer.launch(
      {
        args: ['--no-sandbox'],
        headless: 'new',
        // headless: false
      }
    );
    this.page = await this.browser.newPage();

    await this.page.setExtraHTTPHeaders({
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
    });

    this.postKeys = (await db('posts').select('key')).map(obj => obj.key);
    this.scanning();

    telegramBot.on('text', async msg => {
			try {
				console.log(msg);
				if (msg.text == '/start') {
					await topFeedsInspectorBot.sendMessage(msg.chat.id, `Вы запустили бота!`);
				} else {
					await telegramBot.sendMessage(
						msg.chat.id, 
						`В базе ${this.postKeys.length} заказов`,
						);
				}
			}
			catch(error) {
				logger.error(`TopFeedsInspectorBot error ${error}`);
			}
		})
  }
}