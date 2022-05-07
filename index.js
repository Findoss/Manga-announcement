import "dotenv/config";
import Slimbot from "slimbot";
import { store } from "./store.js";
import { objToStr, diff, formatTitleManga, getCommand } from "./utils.js";

import { getManga } from "./parse.js";

import { TG_TOKEN_BOT, TEST_CONTENT, TIMERS } from "./config.js";

const slimbot = new Slimbot(TG_TOKEN_BOT);
const bot = {
  sendMsg(id, text) {
    slimbot.sendMessage(id, text, { parse_mode: "Markdown" });
  },
  sendImg(id, img, text) {
    slimbot.sendPhoto(id, img, { caption: text, parse_mode: "Markdown" });
  },
  brodcast({ img, text }) {
    if (store.idChanals.length > 0) {
      store.idChanals.map((id) => {
        this.sendImg(id, img, text);
      });
    }
  },
};

const test = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  bot.sendImg(id, TEST_CONTENT.img, `${TEST_CONTENT.text}\n${objToStr(msg)}`);
};

const add = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  if (store.hasChanal(id)) {
    bot.sendMsg(id, `Канал, \`${id}\` уже в списке`);
  } else {
    store.addChanal(id);
    bot.sendMsg(id, `Канал, \`${id}\` добавлен в рассылку`);
  }
};

const remove = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  store.removeChanal(id);

  bot.sendMsg(id, `Канал, \`${id}\` удален из рассылки`);
};

const storage = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  bot.sendMsg(id, objToStr(store.toString()));
};

const start = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  if (store.timers.length > 0) {
    bot.sendMsg(
      id,
      `Поиск анонсов уже запущен, что бы остановить используйте команду /pause`
    );
    return;
  }

  const idTimerUpdateManga = setInterval(async () => {
    const newData = await getManga();
    const diffManga = diff(store.idLastItem, newData);

    if (diffManga.length > 0) {
      store.addDiff(diffManga);
      store.updateLastId(diffManga[diffManga.length - 1].id);
    }
  }, TIMERS.intervalUpdateManga);

  const idTimerBroadcastManga = setInterval(async () => {
    if (store.diffList.length > 0) {
      const manga = store.shiftDiff();
      bot.brodcast({ img: manga.img, text: formatTitleManga(manga) });
    }
  }, TIMERS.intervalBroadcast);

  store.addTimers(idTimerUpdateManga, idTimerBroadcastManga);

  bot.sendMsg(id, `Поиск анонсов - запущен`);
};

const pause = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  store.clearTimers();

  bot.sendMsg(id, `Поиск анонсов - остановлен, возобновить командой /start`);
};

const help = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  const helpText = `
    Краткая справка по командам 
      /help - справка
      /start - запуск поиска анонсов
      /pause - пауза поиска анонсов
      /test - проверка работы бота
      /add - добавление канала в рассылку
      /remove - удаление канала из рассылки
      /storage - состояние бота
    Создатель @findoss
  `;

  bot.sendMsg(id, helpText);
};

const commands = {
  test,
  add,
  help,
  storage,
  remove,
  start,
  pause,
};

slimbot.on("message", (msg) => {
  const cmd = getCommand(msg.text);

  console.log("cmd", cmd);

  if (commands.hasOwnProperty(cmd)) {
    commands[cmd](msg);
  } else {
    commands.help(msg);
  }
});

slimbot.startPolling();
console.log("start bot");
// slimbot.stopPolling();
