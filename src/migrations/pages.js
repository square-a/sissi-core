const getContentId = require('@/utils/getContentId');

const TYPE_STANDARD = 'standard';

module.exports = {
  _createPage: (_type = TYPE_STANDARD) => ({
    _id: getContentId(),
    _items: [],
    _path: '',
    _type,
  }),

  _getProtectedPageTypes(pages) {
    return Object.entries(pages)
      .reduce((acc, [type, page]) => {
        if (page.isProtected) {
          acc.push(type);
        }

        return acc;
      }, []);
  },

  getInvalidPageIds(pagesStructure, pagesContent) {
    const invalidPageIds = [];
    const validPageTypes = [...Object.keys(pagesStructure), TYPE_STANDARD];

    Object.values(pagesContent).forEach(page => {
      if (!validPageTypes.includes(page._type)) {
        invalidPageIds.push(page._id);
      }
    });

    return invalidPageIds;
  },

  getPagesOverMaximum(structure, pagesContent) {
    const pagesOverMaximum = [];
    const protectedPageTypes = this._getProtectedPageTypes(structure.pages);
    const maxAmountOfPages = structure.global.maxItems;
    const existingPagesArray = Object.values(pagesContent).reverse();

    while (existingPagesArray.length > maxAmountOfPages) {
      const pageIndex = existingPagesArray
        .findIndex(({ _type }) => !protectedPageTypes.includes(_type));

      if (pageIndex !== -1) {
        const [pageToRemove] = existingPagesArray.splice(pageIndex, 1);
        pagesOverMaximum.push(pageToRemove._id);

      } else {
        break;
      }
    }

    return pagesOverMaximum;
  },

  getRequiredPages(structure, pagesContent) {
    const requiredPages = [];
    const protectedPageTypes = this._getProtectedPageTypes(structure.pages);
    const minAmountOfPages = structure.global.minItems;
    const existingPagesArray = Object.values(pagesContent);

    protectedPageTypes.forEach(type => {
      const hasType = existingPagesArray.some(page => type === page._type);
      if (!hasType) {
        requiredPages.push(this._createPage(type));
      }
    });

    let totalAmountOfPages = existingPagesArray.length + requiredPages.length;
    while (totalAmountOfPages < minAmountOfPages) {
      requiredPages.push(this._createPage());
      totalAmountOfPages += 1;
    }

    return requiredPages;
  },
};
