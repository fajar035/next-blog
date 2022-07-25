export const search = (keywords, data) => {
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    const { name } = data[i];
    if (name.toLowerCase().includes(keywords.toLowerCase())) {
      result.push(data[i]);
    }
  }
  return result;
};
