import { exec } from "child_process";

export const objToStr = (obj) => {
  return `\`\`\`\n${JSON.stringify(obj, null, 2)}\`\`\``;
};

export const getCommand = (str) => {
  if (typeof str === "string") {
    return str.replace("/", "").replace("@tearoshi_news_bot", "");
  }
  return "help";
};

export const diff = (oldArr, newArr) => {
  return newArr
    .filter((newItem) => {
      return !oldArr.includes(newItem.id);
    })
    .reverse();
};

export const checkServer = () => {
  return new Promise((res, rej) => {
    exec("pm2 jlist", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        rej();
      }

      const obj = JSON.parse(stdout);

      const formatted = obj.map((v) => {
        return {
          pid: v.pid,
          name: v.name,
          status: v.status,
          pm_uptime: v.pm2_env.pm_uptime,
          restart_time: v.pm2_env.restart_time,
          unstable_restarts: v.pm2_env.unstable_restarts,
          version: v.version,
          monit: v.monit,
        };
      });

      res(formatted);
    });
  });
};
