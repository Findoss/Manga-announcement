import "dotenv/config";
import axios from "axios";
import Slimbot from "slimbot";
import { diff, objToStr, getCommand, checkServer } from "./utils.js";
import { placeholderImage } from "./image.js";

import {
  TG_TOKEN_BOT,
  TEST_CONTENT,
  TIMERS,
  ADMIN_CHAT_ID,
  ADMIN_COMMANDS,
} from "./config.js";

import { store } from "./store.js";
import { sites } from "../sites/index.js";

const slimbot = new Slimbot(TG_TOKEN_BOT);
const bot = {
  sendMsg(id, text) {
    slimbot.sendMessage(id, text, { parse_mode: "Markdown" }).catch((error) => {
      throw new Error(error.message);
    });
  },
  sendImg(id, img = placeholderImage, text) {
    slimbot
      .sendPhoto(id, img, { caption: text, parse_mode: "Markdown" })
      .catch((error) => {
        throw new Error(error.message);
      });
  },
  brodcast({ img, title }) {
    if (store.idChanals.length > 0) {
      store.idChanals.map((id) => {
        this.sendImg(id, img, title);
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
    store.save();
    bot.sendMsg(id, `Канал, \`${id}\` добавлен в рассылку`);
  }
};

const remove = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  store.removeChanal(id);
  store.save();

  bot.sendMsg(id, `Канал, \`${id}\` удален из рассылки`);
};

const status = (msg) => {
  const { chat } = msg;
  const { id } = chat;

  const status = checkServer();
  console.log(status);
  bot.sendMsg(id, objToStr(store.toString()));
};

const start = () => {
  if (store.timers.length > 0) {
    bot.sendMsg(
      ADMIN_CHAT_ID,
      `Поиск анонсов уже запущен, что бы остановить используйте команду /pause`
    );
    return;
  }

  bot.sendMsg(ADMIN_CHAT_ID, `start bot ${objToStr(store.toString())}`);

  const idTimerUpdateManga = setInterval(async () => {
    Object.entries(sites).map(async ([name, site]) => {
      try {
        const newData = await site.getManga();
        const diffManga = diff(store.getLastId(name), newData);

        store.setLastUpdateTime(name, Date.now());

        if (diffManga.length > 0) {
          store.addDiff(diffManga);
          store.setLastId(name, diffManga[diffManga.length - 1].id);
        }

        store.save();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return;
        }

        if (error.code === "ECONNRESET") {
          return;
        }

        console.error(error);
        // bot.sendMsg(ADMIN_CHAT_ID, `Error #001 ${error}`);
      }
    });
  }, TIMERS.intervalUpdateManga);

  const idTimerBroadcastManga = setInterval(async () => {
    if (store.diffList.length > 0) {
      try {
        bot.brodcast(store.shiftDiff());
      } catch (error) {
        bot.sendMsg(ADMIN_CHAT_ID, `Error #002 ${error}`);
      }
    }
  }, TIMERS.intervalBroadcast);

  store.addTimers(idTimerUpdateManga, idTimerBroadcastManga);

  bot.sendMsg(ADMIN_CHAT_ID, `Поиск анонсов - запущен`);
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
    Справка по командам 
    ***Общие команды***
      /help - справка
      /add - добавление канала в рассылку
      /remove - удаление канала из рассылки

    ***Админские команды***
      /test - проверка работы бота
      /start - запуск поиска анонсов
      /pause - пауза поиска анонсов
      /status - состояние бота

    Создатель @findoss
  `;

  bot.sendMsg(id, helpText);
};

const commands = {
  test,
  add,
  help,
  status,
  remove,
  start,
  pause,
};

slimbot.on("message", (msg) => {
  const cmd = getCommand(msg.text);

  if (ADMIN_COMMANDS.includes(cmd) && msg.chat.id !== ADMIN_CHAT_ID) {
    bot.sendMsg(msg.chat.id, "Нужны права админа, запростите у @Findoss");
    return;
  }

  if (commands.hasOwnProperty(cmd)) {
    commands[cmd](msg);
  } else {
    commands.help(msg);
  }
});

slimbot.startPolling();
start();

// slimbot.stopPolling();
