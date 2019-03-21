const _get = require('lodash.get');

const getContentId = require('@/utils/getContentId');

const TYPE_STANDARD = 'standard';

module.exports = {
  _createSection(type) {
    return {
      _id: getContentId(),
      _type: type || TYPE_STANDARD,
    };
  },

  getInvalidSectionIds(structure, content) {
    let invalidSectionIds = [];
    const validSectionTypes = Object.keys(structure.sections);

    Object.values(content.pages).forEach(page => {
      const validSectionTypesForPage = structure.global.maxItems > 1
        ? structure.pages[page._type].allowedItems || [TYPE_STANDARD]
        : validSectionTypes;

      const invalidSectionIdsForPage = page._items.filter(sectionId => {
        const sectionType = content.sections[sectionId]._type;

        return !(validSectionTypes.includes(sectionType) && validSectionTypesForPage.includes(sectionType));
      });
      invalidSectionIds = [...invalidSectionIds, ...invalidSectionIdsForPage];
    });

    return invalidSectionIds;
  },

  getRequiredSectionsForPage(pagesStructure, page) {
    const requiredSections = [];
    const allowedSectionTypes = _get(pagesStructure, `${page._type}.allowedItems`, [TYPE_STANDARD]);
    const minSections = _get(pagesStructure, `${page._type}.minItems`, 0);

    let totalAmountOfSections = page._items.length;
    while (totalAmountOfSections < minSections) {
      requiredSections.push(this._createSection(allowedSectionTypes[0]));
      totalAmountOfSections += 1;
    }

    return requiredSections;
  },

  getSectionsOverMaximum(pagesStructure, page) {
    const maxSections = _get(pagesStructure, `${page._type}.maxItems`, Infinity);

    return page._items.slice(maxSections);
  },
};
