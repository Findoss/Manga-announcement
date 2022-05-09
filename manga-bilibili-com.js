import axios from "axios";

export const MANGA_BILIBILI_COM_HOST = "https://manga.bilibili.com";

export const MANGA_BILIBILI_COM_LIST_URL = `${MANGA_BILIBILI_COM_HOST}/twirp/comic.v1.Comic/ClassPage?device=pc&platform=web`;
export const MANGA_BILIBILI_COM_DESC_URL = `${MANGA_BILIBILI_COM_HOST}/detail/mc`;

export const MANGA_BILIBILI_COM_LIST_BODY = {
  style_id: -1,
  area_id: 1,
  is_finish: -1,
  order: 3,
  page_num: 1,
  page_size: 5,
  is_free: -1,
};

export const formatTitleManga = (item) => {
  return `___${item.season_id}___ | [${item.title}](${MANGA_BILIBILI_COM_DESC_URL}${item.id}) - ${item.release_time}`;
};

export const transformListManga = (arr) => {
  return arr.map((item) => {
    return {
      id: item.season_id,
      title: formatTitleManga(item),
      img: item.vertical_cover,
    };
  });
};

export const getManga = async () => {
  return axios
    .post(MANGA_BILIBILI_COM_LIST_URL, MANGA_BILIBILI_COM_LIST_BODY)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.code === 0) {
          return response.data.data;
        }
      } else {
        throw new Error(`${MANGA_BILIBILI_COM_HOST} error`);
      }
    })
    .then((data) => {
      return transformListManga(data);
    });
};

export const diffManga = (id, arr) => {
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

export const manga_bilibili_com = {
  getManga,
  diffManga,
};
