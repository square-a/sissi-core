import _testState from '%/reducers/_testState';
import * as t from '%/actions/types';

import reducer, * as selectors from './pages';

describe('reducers/structure/pages', () => {
  const mockState = _testState.structure.pages;

  it('should return the fetched state', () => {
    const action = {
      type: t.SEND_REQUEST,
      payload: {
        dataType: 'structure',
        responseData: {
          pages: { testField: 'test' },
        },
      },
    };
    const state = reducer(mockState, action);

    expect(state).toHaveProperty('testField', 'test');
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer(mockState, action);

    expect(state).toEqual({});
  });
});

describe('selectors/structure/pages', () => {
  const mockState = _testState;

  describe('getStructurePages', () => {
    it('should return the structure pages', () => {
      const value = selectors.getStructurePages(mockState);

      expect(value).toHaveProperty('standard');
      expect(value.standard).toHaveProperty('maxItems', 6);
    });
  });

  describe('getMinAmountOfSectionsForPageType', () => {
    it('should return the minimum amount of sections for the given page type', () => {
      const value = selectors.getMinAmountOfSectionsForPageType('standard')(mockState);

      expect(value).toBe(1);
    });
  });
});
