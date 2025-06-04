const { Telegraf, Markup } = require('telegraf');

// Замените на ваш токен бота от BotFather
const BOT_TOKEN = '8095938160:AAGLCJBZkfB46kFZWON1865C7fBoSTYn6M0';

// URL вашего Web App
const WEB_APP_URL = 'https://t.me/project_rps_bot/rps_app';

const bot = new Telegraf(BOT_TOKEN);

// Команда /start
bot.start((ctx) => {
    const user = ctx.from;
    const firstName = user.first_name || 'друг';

    ctx.reply(
        `🎮 Привет, ${firstName}! Добро пожаловать в Rock Paper Scissors!\n\n` +
        `🎯 Играй в классическую игру "Камень, Ножницы, Бумага"\n` +
        `🏆 Зарабатывай очки и поднимайся в рейтинге\n` +
        `💰 Собирай игровую валюту\n\n` +
        `👇 Нажми кнопку ниже чтобы начать игру:`,
        Markup.inlineKeyboard([
            [Markup.button.webApp('🎮 Играть', WEB_APP_URL)]
        ])
    );
});

// Команда /game (дополнительная)
bot.command('game', (ctx) => {
    ctx.reply(
        '🎯 Запускаем игру...',
        Markup.inlineKeyboard([
            [Markup.button.webApp('🎮 Открыть игру', WEB_APP_URL)]
        ])
    );
});

// Команда /help
bot.help((ctx) => {
    ctx.reply(
        `🆘 Помощь по боту:\n\n` +
        `🎮 /start - Начать игру\n` +
        `🎯 /game - Открыть игру\n` +
        `❓ /help - Эта справка\n\n` +
        `Для игры просто нажми кнопку "🎮 Играть"!`
    );
});

// Обработка любых других сообщений
bot.on('message', (ctx) => {
    ctx.reply(
        '🎮 Привет! Я бот для игры Rock Paper Scissors.\n\n' +
        'Нажми /start чтобы начать игру!',
        Markup.inlineKeyboard([
            [Markup.button.webApp('🎮 Играть', WEB_APP_URL)]
        ])
    );
});

// Запуск бота
bot.launch();

console.log('🤖 Бот запущен! Нажмите Ctrl+C для остановки.');

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));