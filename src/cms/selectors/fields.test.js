import _cloneDeep from 'lodash.clonedeep';

import _testState from '%/reducers/_testState';

import * as selectors from './fields';

describe('selectors/form', () => {
  let mockState;

  beforeEach(() => {
    mockState = _cloneDeep(_testState);
  });

  describe('getFieldWithName', () => {
    it('should return the field with an added "name" parameter', () => {
      const result = selectors.getFieldWithName('title')(mockState);

      expect(result).toHaveProperty('name', 'title');
      expect(result).toHaveProperty('placeholder', 'Your title');
    });
  });

  describe('getFieldsForPageType', () => {
    it('should return an array of field objects for the given page type', () => {
      const value = selectors.getFieldsForPageType('standard')(mockState);

      expect(value.length).toBe(2);
      expect(value[0]).toHaveProperty('_name', 'title');
      expect(value[1]).toHaveProperty('_name', 'path');
    });
  });

  describe('getFieldsForSectionType', () => {
    it('should return an array of field objects for the given section type', () => {
      const value = selectors.getFieldsForSectionType('photo')(mockState);

      expect(value.length).toBe(1);
      expect(value[0]).toHaveProperty('_name', 'image');
    });
  });

  describe('getPropsForFieldList', () => {
    beforeEach(() => {
      mockState.location = {
        payload: {
          pageId: 'qwe567',
        },
        routesMap: {
          pagesRoute: {
            itemType: 'pages',
          },
        },
        type: 'pagesRoute',
      };
    });

    describe('canAdd', () => {
      it('should be true when more items can be added', () => {
        const value = selectors.getPropsForFieldList('people')(mockState);

        expect(value).toHaveProperty('canAdd');
        expect(value.canAdd).toBe(true);
      });

      it('should be false when items are at maximum', () => {
        mockState.structure.fields.people.maxItems = 3;
        const value = selectors.getPropsForFieldList('people')(mockState);

        expect(value).toHaveProperty('canAdd');
        expect(value.canAdd).toBe(false);
      });
    });

    describe('canDelete', () => {
      it('should be true when items can be deleted', () => {
        const value = selectors.getPropsForFieldList('people')(mockState);

        expect(value).toHaveProperty('canDelete');
        expect(value.canDelete).toBe(true);
      });

      it('should be false when items are at minimum', () => {
        mockState.structure.fields.people.minItems = 3;
        const value = selectors.getPropsForFieldList('people')(mockState);

        expect(value).toHaveProperty('canDelete');
        expect(value.canDelete).toBe(false);
      });
    });

    it('should return the item label', () => {
      const value = selectors.getPropsForFieldList('people')(mockState);

      expect(value).toHaveProperty('itemLabel', 'Person');
    });

    it('should return the list label', () => {
      const value = selectors.getPropsForFieldList('people')(mockState);

      expect(value).toHaveProperty('listLabel', 'People');
    });
  });
});
