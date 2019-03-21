const _cloneDeep = require('lodash.clonedeep');

const _testContent = require('./_testData/content');
const _testStructure = require('./_testData/structure');
const migrations = require('./sections');

describe('migrations/sections', () => {
  let testContent, testStructure;

  beforeEach(() => {
    testContent = _cloneDeep(_testContent);
    testStructure = _cloneDeep(_testStructure);
  });

  describe('_createSection', () => {
    it('should return a section with the desired type', () => {
      const result = migrations._createSection('photo');

      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('_type', 'photo');
    });

    it('should return a section with the standard type if no type is specified', () => {
      const result = migrations._createSection();

      expect(result).toHaveProperty('_id');
      expect(result).toHaveProperty('_type', 'standard');
    });
  });

  describe('getInvalidSectionIds', () => {
    it('should return an array of sections with invalid section types', () => {
      testStructure.sections = { standard: {}};
      const result = migrations.getInvalidSectionIds(testStructure, testContent);

      expect(result).toEqual(['123abc', '567ghi']);
    });

    it('should include invalid section types for each page type', () => {
      testStructure.pages.photoAlbum.allowedItems = ['standard'];
      const result = migrations.getInvalidSectionIds(testStructure, testContent);

      expect(result).toEqual(['123abc', '567ghi']);
    });

    it('should return an empty array if all existing sections have valid types', () => {
      testStructure.pages.standard = { allowedItems: ['standard', 'photo']};

      const result = migrations.getInvalidSectionIds(testStructure, testContent);

      expect(result).toEqual([]);
    });
  });

  describe('getRequiredSectionsForPage', () => {
    it('should return an array with the minimum amount of sections for the given page', () => {
      testContent.pages = {
        test1: {
          _id: 'test1',
          _items: [],
          _type: 'photoAlbum',
        },
        test2: {
          _id: 'test2',
          _items: [],
          _type: 'standard',
        },
      };

      const result = migrations.getRequiredSectionsForPage(testStructure.pages, testContent.pages.test1);

      expect(result.length).toBe(4);
    });
  });

  describe('getSectionsOverMaximum', () => {
    it('should return an array with section ids for each section exceeding the maximum amount', () => {
      testStructure.pages.photoAlbum.maxItems = 1;

      const result = migrations.getSectionsOverMaximum(testStructure.pages, testContent.pages.def345);

      expect(result.length).toBe(2);
    });
  });
});
