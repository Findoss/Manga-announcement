export const store = {
  idLastItem: 31523,
  idChanals: [],
  diffList: [],
  timers: [],

  addDiff(manga) {
    this.diffList.push(...manga);
  },

  shiftDiff() {
    return this.diffList.shift();
  },

  updateLastId(id) {
    this.idLastItem = id;
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

  toString() {
    return {
      idLastItem: this.idLastItem,
      idChanals: this.idChanals,
      diffList: this.diffList,
      progress: this.timers.length ? true : false,
    };
  },
};
