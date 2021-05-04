export const capitalize = (text, all) => {
  if (typeof text !== "string" || text.length < 1) return text;
  if (!all) return text[0].toUpperCase() + text.substr(1);

  const tokens = text.split(" ");
  return tokens.map((e) => e[0].toUpperCase() + e.substr(1)).join(" ");
};
