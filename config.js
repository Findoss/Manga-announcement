export const TG_TOKEN_BOT = process.env["TELEGRAM_BOT_TOKEN"];

export const ADMIN_CHAT_ID = 182531780;

export const ADMIN_COMMANDS = ["start", "pause", "storage"];

export const TEST_CONTENT = {
  text: "Да, ___тест___ | [успешно пройден](https://ru.wikipedia.org/wiki/Тестирование_программного_обеспечения)",
  img: "https://i0.hdslb.com/bfs/manga-static/b4e50000ef6f6fe65e9d2f46a4a084d97ca1127a.jpg",
};

export const TIMERS = {
  intervalUpdateManga: Math.floor(Math.random() * (7000 - 4000) + 4000),
  intervalBroadcast: 3000,
};
