import axios from "axios";

import { transformListManga } from "./utils.js";
import { MANGA_LIST_URL, MANGA_LIST_BODY } from "./config.js";

export const getManga = async () => {
  return axios
    .post(MANGA_LIST_URL, MANGA_LIST_BODY)
    .then((response) => {
      if (response.status === 200) {
        if (response.data.code === 0) {
          return response.data.data;
        }
      } else {
        console.error("response.status", response.status);
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .then((data) => {
      return transformListManga(data);
    });
};
