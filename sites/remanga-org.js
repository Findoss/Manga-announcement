import axios from "axios";

export const REMANGA_HOST = "https://api.remanga.org";

export const REMANGA_LIST_URL = `${REMANGA_HOST}/api/search/catalog/?ordering=-id&page=1&salt=&status=3&count=30`;
export const REMANGA_DESC_URL = `${REMANGA_HOST}/manga`;
export const REMANGA_IMG_URL = `${REMANGA_HOST}/media`;

export const formatTitleManga = (item) => {
  return `___${item.id}___ | [${item.rus_name}](${REMANGA_DESC_URL}/${item.dir})`;
};

export const transformListManga = (arr) => {
  return arr.map((item) => {
    return {
      site: "remanga_org",
      id: item.id,
      title: formatTitleManga(item),
      img: null,
      // img: `${REMANGA_IMG_URL}/${item.cover_high}`,
    };
  });
};

export const getManga = async () => {
  return axios
    .get(REMANGA_LIST_URL)
    .then((response) => {
      if (response.status === 200) {
        return response.data.content;
      } else {
        throw new Error(`${REMANGA_HOST} error`);
      }
    })
    .then((data) => {
      return transformListManga(data);
    });
};

export const remanga_org = {
  getManga,
};
