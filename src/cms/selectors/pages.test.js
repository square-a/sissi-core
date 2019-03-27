import _cloneDeep from 'lodash.clonedeep';
import testState from '%/reducers/_testState';

import * as selectors from './pages';

describe('selectors/pages', () => {
  let mockState;

  beforeEach(() => {
    mockState = _cloneDeep(testState);
  });

  describe('getSinglePageId', () => {
    it('should return the id of a single page', () => {
      mockState.structure.global.maxItems = 1;
      const result = selectors.getSinglePageId(mockState);

      expect(result).toBe('abc123');
    });

    it('should return null if multiple pages are allowed', () => {
      const result = selectors.getSinglePageId(mockState);

      expect(result).toBe(null);
    })
  });

  describe('getMaxSectionsForPage', () => {
    it('should return the maximum amount of sections for the given page id', () => {
      const result = selectors.getMaxSectionsForPage('abc123')(mockState);

      expect(result).toBe(6);
    });
  });

  describe('getActivePageId', () => {
    describe('single page', () => {
      it('should return the id of the single page', () => {
        mockState.structure.global.maxItems = 1;
        mockState.content.global._items = ['singlePage'];
        mockState.content.pages = {
          singlePage: {
            _id: 'singlePage',
            _items: ['345def', '123abc'],
            _type: 'standard',
          },
        };
        const result = selectors.getActivePageId(mockState);

        expect(result).toBe('singlePage');
      });
    });

    describe('multiple pages', () => {
      it('should return the id of the selected page', () => {
        const result = selectors.getActivePageId(mockState);

        expect(result).toBe('abc123');
      });

      it('should return null if no page is selected', () => {
        mockState.location = {};
        const result = selectors.getActivePageId(mockState);

        expect(result).toBe(null);
      });
    });
  });

  describe('getAllowedPageTypes', () => {
    it('should return an array with allowed page types', () => {
      const result = selectors.getAllowedPageTypes(mockState);

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('name', 'standard');
      expect(result[1]).toHaveProperty('name', 'team');
    });
  });

  describe('getAllowedSectionTypesForPageId', () => {
    it('should return an array with allowed section types', () => {
      const result = selectors.getAllowedSectionTypesForPageId('def345')(mockState);

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('name', 'photo');
    });

    it('should return an array with "standard" if no allowed types are specified', () => {
      const result = selectors.getAllowedSectionTypesForPageId('abc123')(mockState);

      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('name', 'standard');
    });

    it('should return an array with all section types for single pages', () => {
      mockState.structure.global.maxItems = 1;
      const result = selectors.getAllowedSectionTypesForPageId('abc123')(mockState);

      expect(result).toHaveLength(3);
      expect(result[0]).toHaveProperty('name', 'standard');
      expect(result[1]).toHaveProperty('name', 'photo');
      expect(result[2]).toHaveProperty('name', 'friends');
    });
  });
});
