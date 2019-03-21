const _cloneDeep = require('lodash.clonedeep');

const _testContent = require('./_testData/content');
const _testStructure = require('./_testData/structure');
const migrations = require('./pages');

describe('migrations/pages', () => {
  let testContent, testStructure;

  beforeEach(() => {
    testContent = _cloneDeep(_testContent);
    testStructure = _cloneDeep(_testStructure);
  });

  describe('_createPage', () => {
    it('should return a page with the desired type', () => {
      const result = migrations._createPage('photoAlbum');

      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('_type', 'photoAlbum');
    });

    it('should return a page with the standard type if no type is specified', () => {
      const result = migrations._createPage();

      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('_type', 'standard');
    });
  });

  describe('_getProtectedPageTypes', () => {
    it('should return an array with protected page types', () => {
      const result = migrations._getProtectedPageTypes(_testStructure.pages);

      expect(result).toEqual(['photoAlbum']);
    });
  });

  describe('getInvalidPageIds', () => {
    it('should return an array of pages with invalid page types', () => {
      const result = migrations.getInvalidPageIds({ standard: {}, newPage: {}}, testContent.pages);

      expect(result).toEqual(['def345']);
    });

    it('should return an empty array if all existing pages have valid types', () => {
      const result = migrations.getInvalidPageIds(testStructure.pages, testContent.pages);

      expect(result).toEqual([]);
    });
  });

  describe('getPagesOverMaximum', () => {
    it('should return an array with page ids for each page exceeding the maximum amount', () => {
      testStructure.global.maxItems = 1;

      const result = migrations.getPagesOverMaximum(testStructure, testContent.pages);

      expect(result.length).toBe(1);
    });

    it('should not include protected pages', () => {
      testStructure.global.maxItems = 1;
      testStructure.pages.standard.isProtected = true;

      const result = migrations.getPagesOverMaximum(testStructure, testContent.pages);

      expect(result).not.toContain('abc123');
      expect(result).not.toContain('def345');
    });
  });

  describe('getRequiredPages', () => {
    it('should return an array with the minimum amount of pages', () => {
      const result = migrations.getRequiredPages(testStructure, {});

      expect(result.length).toBe(2);
    });

    it('should include a new page for each protected page type', () => {
      const result = migrations.getRequiredPages(testStructure, {});

      expect(result.find(page => page._type === 'photoAlbum')).not.toBeUndefined();
    });
  });
});
