import JSONdb from "simple-json-db";
const db = new JSONdb("./db.json", {
  asyncWrite: true,
});

export const LIMIT_OLD_POSTS = 100;

export const store = {
  sites: {},
  idChanals: [],
  diffList: [],
  timers: [],
  saveFileds: ["sites", "idChanals"],

  initSite(name) {
    if (this.sites[name] === undefined) {
      this.sites[name] = {
        posts: [],
        lastTime: 0,
      };
    }
  },

  addDiff(manga) {
    this.diffList.push(...manga);
  },

  shiftDiff() {
    return this.diffList.shift();
  },

  addPosts(name, arr) {
    this.initSite(name);

    while (this.sites[name].posts.length > LIMIT_OLD_POSTS) {
      this.sites[name].posts.shift();
    }

    this.sites[name].posts.push(...arr);
  },

  setLastUpdateTime(name, time) {
    this.initSite(name);
    this.sites[name].lastTime = time;
  },

  getPosts(name) {
    return this.sites[name]?.posts;
  },

  addChanal(id) {
    this.idChanals.push(id);
  },

  hasChanal(id) {
    return this.idChanals.includes(id);
  },

  removeChanal(id) {
    this.idChanals = this.idChanals.filter((v) => v !== id);
  },

  clearTimers() {
    this.timers.map((timerId) => {
      clearInterval(timerId);
    });
    this.timers = [];
  },

  addTimers(...timers) {
    this.timers.push(...timers);
  },

  load() {
    this.saveFileds.map((key) => {
      if (db.has(key)) {
        this[key] = JSON.parse(db.get(key));
      }
    });
  },

  save() {
    this.saveFileds.map((key) => {
      db.set(key, JSON.stringify(this[key]));
    });
  },

  toString() {
    return {
      sites: Object.entries(this.sites).map(([key, site]) => {
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };

        const date = new Intl.DateTimeFormat("ru-RU", options).format(
          new Date(site?.lastTime ?? 0)
        );

        return {
          [key]: {
            posts: site?.posts.at(-1),
            lastTime: date,
          },
        };
      }),
      idChanals: this.idChanals,
      diffList: this.diffList,
      progress: this.timers.length ? true : false,
    };
  },
};

store.load();
