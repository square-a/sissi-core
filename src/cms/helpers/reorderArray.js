export default (items, from, to) => {
  const result = [...items];
  const [itemToMove] = result.splice(from, 1);
  result.splice(to, 0, itemToMove);

  return result;
};
