import { MANGA_DESC_URL } from "./config.js";

export const transformListManga = (arr) => {
  return arr.map((item) => {
    return {
      id: item.season_id,
      title: item.title,
      img: item.vertical_cover,
      time: item.release_time,
    };
  });
};

export const formatTitleManga = (item) => {
  return `[${item.title}](${MANGA_DESC_URL}${item.id}) - ${item.time}`;
};

export const diff = (id, arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (item.id !== id) {
      result.push(item);
    } else {
      break;
    }
  }
  return result.reverse();
};

export const objToStr = (obj) => {
  return `\`\`\`\n${JSON.stringify(obj, null, 2)}\`\`\``;
};

export const getCommand = (str) => {
  if (typeof str === "string") {
    return str.replace("/", "").replace("@tearoshi_news_bot", "");
  }
  return "help";
};
