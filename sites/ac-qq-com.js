import axios from "axios";
import jsdom from "jsdom";

const { JSDOM } = jsdom;

export const MANGA_AC_QQ_COM_HOST = "https://ac.qq.com";

export const MANGA_AC_QQ_COM_LIST_URL = `${MANGA_AC_QQ_COM_HOST}/Comic/all/finish/1/search/time/page/1`;
export const MANGA_AC_QQ_COM_DESC_URL = `${MANGA_AC_QQ_COM_HOST}/Comic/comicInfo/id/`;

export const formatTitleManga = (item) => {
  return `___${item.id}___ | [${item.title}](${MANGA_AC_QQ_COM_DESC_URL}${item.id})`;
};

export const parseListManga = (rawText) => {
  const dom = new JSDOM(rawText);
  const { document } = dom.window;
  const $list = document.querySelectorAll(
    "ul.ret-search-list li.ret-search-item"
  );
  const rawList = [...$list];

  const list = rawList.map(($item) => {
    const $a = $item.querySelector(".ret-works-title a");
    const id = $a.href.slice($a.href.lastIndexOf("/") + 1);
    const title = $a.textContent;

    const img = $item
      .querySelector(".mod-cover-list-thumb img")
      .getAttribute("data-original");

    return {
      id,
      title,
      img,
    };
  });

  return list;
};

export const transformListManga = (arr) => {
  return arr.map((item) => {
    return {
      site: "manga_ac_qq_com",
      id: item.id,
      title: formatTitleManga(item),
      img: item.img,
    };
  });
};

export const getManga = async () => {
  return axios
    .post(MANGA_AC_QQ_COM_LIST_URL)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`${MANGA_AC_QQ_COM_HOST} error`);
      }
    })
    .then((data) => {
      return parseListManga(data);
    })
    .then((data) => {
      return transformListManga(data);
    });
};

export const manga_ac_qq_com = {
  getManga,
};
