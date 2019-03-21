module.exports = content => content.global._items.map(pageId => {
  const page = content.pages[pageId];
  const isSinglePage = content.global._items.length === 1;

  return {
    content,
    global: content.global,
    page,
    pages: content.global._items.map(pId => content.pages[pId]),
    path: isSinglePage ? '' : `/${page.path}`,
    sections: page._items.map(sectionId => content.sections[sectionId]),
  };
});
