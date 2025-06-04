const { Telegraf, Markup } = require('telegraf');

// Токен из переменной окружения
const BOT_TOKEN = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';

// URL вашего Web App
const WEB_APP_URL = 'https://chimerical-kitten-5e244a.netlify.app';

if (!BOT_TOKEN || BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
    console.error('❌ BOT_TOKEN не найден! Установите переменную окружения BOT_TOKEN');
    process.exit(1);
}

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

// Обработка ошибок
bot.catch((err, ctx) => {
    console.error('❌ Ошибка бота:', err);
    console.error('Context:', ctx.update);
});

// Запуск бота
bot.launch()
    .then(() => {
        console.log('🤖 Бот успешно запущен!');
        console.log('📱 Токен:', BOT_TOKEN.substring(0, 20) + '...');
        console.log('🌐 Web App URL:', WEB_APP_URL);
    })
    .catch((err) => {
        console.error('❌ Ошибка запуска бота:', err);
        process.exit(1);
    });

// Graceful shutdown
process.once('SIGINT', () => {
    console.log('🛑 Получен сигнал SIGINT, останавливаем бота...');
    bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
    console.log('🛑 Получен сигнал SIGTERM, останавливаем бота...');
    bot.stop('SIGTERM');
});