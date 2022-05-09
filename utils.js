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
