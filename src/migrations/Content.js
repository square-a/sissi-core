/* eslint-disable no-param-reassign */
const _cloneDeep = require('lodash.clonedeep');

const pages = require('./pages');
const sections = require('./sections');

module.exports = class Content {
  constructor(content, structure) {
    this.content = {
      global: {},
      pages: {},
      sections: {},
      ..._cloneDeep(content),
    };
    this.structure = {
      global: {},
      pages: {},
      sections: {},
      fields: {},
      ..._cloneDeep(structure),
    };
  }

  getContent() {
    return this.content;
  }

  _addPages(newPages) {
    newPages.forEach(page => {
      this.content.global._items.push(page._id);
      this.content.pages[page._id] = page;
    });
  }

  _addSections(newSections, page) {
    newSections.forEach(section => {
      page._items.push(section._id);
      this.content.sections[section._id] = section;
    });
  }

  _addMissingFields(validFields, itemStructure = {}, itemContent) {
    const { fields = []} = itemStructure;

    const itemFields = Object.keys(itemContent)
      .filter(prop => !prop.startsWith('_'));

    const missingItemFields = validFields.filter(field => (
      fields.includes(field) && !itemFields.includes(field)
    ));

    missingItemFields.forEach(fieldName => {
      const fieldType = this.structure.fields[fieldName].type;
      if (fieldType === 'list' || fieldType === 'tags') {
        itemContent[fieldName] = [];
      } else {
        itemContent[fieldName] = '';
      }
      itemFields.push(fieldName);
    });

    itemFields.forEach(fieldName => {
      const fieldStructure = this.structure.fields[fieldName];
      if (fieldStructure.type === 'list') {
        while (itemContent[fieldName].length < fieldStructure.minItems) {
          itemContent[fieldName].push({});
        }

        itemContent[fieldName].forEach(listContent => {
          this._addMissingFields(validFields, this.structure.fields[fieldName], listContent);
        });
      }
    });
  }

  _removePages(pageIdsToRemove) {
    pageIdsToRemove.forEach(id => {
      this.content.global._items = this.content.global._items.filter(pageId => pageId !== id);

      delete this.content.pages[id];
    });
  }

  _removeSections(sectionIdsToRemove) {
    sectionIdsToRemove.forEach(id => {
      Object.values(this.content.pages).forEach(page => {
        page._items = page._items.filter(sectionId => sectionId !== id);
      });

      delete this.content.sections[id];
    });
  }

  _removeInvalidFields(validFields, itemStructure = {}, itemContent) {
    const { fields = []} = itemStructure;

    Object.keys(itemContent)
      .filter(prop => !prop.startsWith('_'))
      .forEach(fieldName => {
        const validItemFields = validFields.filter(field => fields.includes(field));

        if (validItemFields.includes(fieldName)) {
          const fieldStructure = this.structure.fields[fieldName];
          if (fieldStructure.type === 'list') {
            while (itemContent[fieldName].length > fieldStructure.maxItems) {
              itemContent[fieldName].pop();
            }

            itemContent[fieldName].forEach(listContent => {
              this._removeInvalidFields(validFields, fieldStructure, listContent);
            });
          }
        } else {
          delete itemContent[fieldName];
        }
      });
  }

  migratePages() {
    this.content.global._items = this.content.global._items || [];

    const invalidPageIds = pages.getInvalidPageIds(this.structure.pages, this.content.pages);
    this._removePages(invalidPageIds);

    const requiredPages = pages.getRequiredPages(this.structure, this.content.pages);
    this._addPages(requiredPages);

    const pagesOverMaximum = pages.getPagesOverMaximum(this.structure, this.content.pages);
    this._removePages(pagesOverMaximum);

    return this;
  }

  migrateSections() {
    const invalidSectionIds = sections.getInvalidSectionIds(this.structure, this.content);
    this._removeSections(invalidSectionIds);

    Object.values(this.content.pages).forEach(page => {
      const requiredSections = sections.getRequiredSectionsForPage(this.structure.pages, page);
      this._addSections(requiredSections, page);

      const sectionsOverMaximum = sections.getSectionsOverMaximum(this.structure.pages, page);
      this._removeSections(sectionsOverMaximum);
    });

    return this;
  }

  migrateFields() {
    const validFields = Object.keys(this.structure.fields);

    this._removeInvalidFields(validFields, this.structure.global, this.content.global);
    this._addMissingFields(validFields, this.structure.global, this.content.global);

    Object.values(this.content.pages).forEach(page => {
      const pageStructure = this.structure.pages[page._type];
      const pageContent = this.content.pages[page._id];
      this._removeInvalidFields(validFields, pageStructure, pageContent);
      this._addMissingFields(validFields, pageStructure, pageContent);
    });

    Object.values(this.content.sections).forEach(section => {
      const sectionStructure = this.structure.sections[section._type];
      const sectionContent = this.content.sections[section._id];
      this._removeInvalidFields(validFields, sectionStructure, sectionContent);
      this._addMissingFields(validFields, sectionStructure, sectionContent);
    });

    return this;
  }
};
