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

export const checkServer = () => {
  exec("pm2 list", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    return stdout;
  });
};
