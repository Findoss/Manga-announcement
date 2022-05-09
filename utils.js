export const objToStr = (obj) => {
  return `\`\`\`\n${JSON.stringify(obj, null, 2)}\`\`\``;
};

export const getCommand = (str) => {
  if (typeof str === "string") {
    return str.replace("/", "").replace("@tearoshi_news_bot", "");
  }
  return "help";
};
