const TelegramBot = require('node-telegram-bot-api');


// replace the value below with the Telegram token you receive from @BotFather
const token = '6883028473:AAF6YdnT7IozPSL_l3dbQT0eLCaWGNzd_Gg';
const WebUrl='https://rococo-wisp-b5b1a7.netlify.app/'

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text=msg.text;
    if (text==='/start'){
        await bot.sendMessage(chatId,'Down', {
            reply_markup:{
                keyboard:[
                    [{text:'Заполнить форму', web_app: {url: WebUrl + 'form'}}]
                ]
            }
        })


        await bot.sendMessage(chatId,'Check up:', {
            reply_markup:{
                inline_keyboard:[
                    [{text:'Make a check up', web_app: {url: WebUrl}}]
                ]
            }
        })
    }

    if (msg?.web_app_data?.data) {
        try {
            const data=JSON.parse(msg?.web_app_data?.data)

            await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country)
            await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street)
            await bot.sendMessage(chatId, 'Спасибо за форму!')

            setTimeout(async ()=>{
                await bot.sendMessage(chatId,'Всю  ифнормацию можно получить по... Никак!');
            }, 3000)

        }catch(e){
            console.log(e);
        }

        
    }
});