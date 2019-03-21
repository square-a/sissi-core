module.exports = function getContentId() {
  return Math.random().toString(36).substring(2, 9);
};
