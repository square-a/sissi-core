module.exports = (content, { params, url }) => {
  const isSinglePage = content.global._items.length === 1;

  const { pageSlug = '', sectionSlug } = params;
  const page = Object
    .values(content.pages)
    .find(p => p.path === pageSlug);

  let section;

  if (!isSinglePage && sectionSlug) {
    section = page._items
      .map(sId => content.sections[sId])
      .find(s => s.path === sectionSlug);
  }

  return {
    page,
    section,
    content,
    path: url,
    global: content.global,
    pages: content.global._items.map(pageId => content.pages[pageId]),
    sections: page._items.map(sectionId => content.sections[sectionId]),
  };
};
