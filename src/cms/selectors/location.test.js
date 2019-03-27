import _cloneDeep from 'lodash.clonedeep';

import _testState from '%/reducers/_testState';
import * as selectors from './location';

describe('selectors/location', () => {
  let mockState;

  beforeEach(() => {
    mockState = _cloneDeep(_testState);
  });

  describe('getLocation', () => {
    it('should return the location object', () => {
      const value = selectors.getLocation(mockState);

      expect(value).toHaveProperty('type', 'pagesRoute');
      expect(value).toHaveProperty('routesMap');
      expect(value).toHaveProperty('payload');
    });
  });

  describe('getLocationPageId', () => {
    it('should return the id of the currently active page', () => {
      const value = selectors.getLocationPageId(mockState);

      expect(value).toBe('abc123');
    });

    it('should return null if no page is active', () => {
      mockState.location = {
        routesMap: {
          globalRoute: {
            itemType: 'global',
          },
        },
        type: 'globalRoute',
      };
      const value = selectors.getLocationPageId(mockState);

      expect(value).toBe(null);
    });
  });

  describe('getCurrentRoute', () => {
    it('should return the type of the active route', () => {
      const value = selectors.getCurrentRoute(mockState);

      expect(value).toBe('pagesRoute');
    });
  });

  describe('getIsInitialDataFetched', () => {
    it('should return true if there is content in store', () => {
      const value = selectors.getIsInitialDataFetched(mockState);

      expect(value).toBe(true);
    });

    it('should return false if there is no content in store', () => {
      mockState.content = {
        global: {},
        pages: {},
        sections: {},
      };
      const value = selectors.getIsInitialDataFetched(mockState);

      expect(value).toBe(false);
    });
  });
});
