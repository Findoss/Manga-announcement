import axios from "axios";

export const MANGA_KUAIKANMANHUA_HOST = "https://www.kuaikanmanhua.com";

export const MANGA_KUAIKANMANHUA_LIST_URL = `${MANGA_KUAIKANMANHUA_HOST}/tag/0?state=1&sort=3&page=1`;
export const MANGA_KUAIKANMANHUA_DESC_URL = `${MANGA_KUAIKANMANHUA_HOST}/web/topic/`;

export const formatTitleManga = (item) => {
  return `___${item.id}___ | [${item.title}](${MANGA_KUAIKANMANHUA_DESC_URL}${item.id})`;
};

export const transformListManga = (arr) => {
  return arr.map((item, i) => {
    return {
      site: "manga_kuaikanmanhua",
      id: item.id,
      title: formatTitleManga(item),
      img: decodeURIComponent(JSON.parse(`"${item.vertical_image_url}"`)),
    };
  });
};

export const parseListManga = (rawText) => {
  let rawJS = rawText.match(/<script>window\.__NUXT__=(.*)\;<\/script>/i).pop();

  const js = eval(rawJS);
  const list = js.data[0].dataList;

  return list;
};

export const getManga = async () => {
  return axios
    .get(MANGA_KUAIKANMANHUA_LIST_URL, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`${MANGA_BILIBILI_COM_HOST} error`);
      }
    })
    .then((data) => {
      return parseListManga(data);
    })
    .then((data) => {
      return transformListManga(data);
    });
};

export const manga_kuaikanmanhua = {
  getManga,
};
