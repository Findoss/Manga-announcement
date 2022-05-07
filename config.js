export const TG_TOKEN_BOT = "5205485761:AAE9EIDUvZEtHryqsr7a6zXUSrqlrmb6r9k";

export const TEST_CONTENT = {
  text: "Да, тест [успешно пройден](https://ru.wikipedia.org/wiki/Тестирование_программного_обеспечения)",
  img: "https://i0.hdslb.com/bfs/manga-static/b4e50000ef6f6fe65e9d2f46a4a084d97ca1127a.jpg",
};

export const HOST = "https://manga.bilibili.com";

export const MANGA_LIST_URL = `${HOST}/twirp/comic.v1.Comic/ClassPage?device=pc&platform=web`;
export const MANGA_DESC_URL = `${HOST}/detail/mc`;

export const MANGA_LIST_BODY = {
  style_id: -1,
  area_id: 1,
  is_finish: -1,
  order: 3,
  page_num: 1,
  page_size: 2,
  is_free: -1,
};

export const TIMERS = {
  intervalUpdateManga: 5000,
  intervalBroadcast: 2000,
};