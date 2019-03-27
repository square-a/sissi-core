import _testState from '%/reducers/_testState';
import * as t from '%/actions/types';

import reducer, * as selectors from './global';

describe('reducers/structure/global', () => {
  const mockState = _testState.structure.global;

  it('should return the fetched state', () => {
    const action = {
      type: t.SEND_REQUEST,
      payload: {
        dataType: 'structure',
        responseData: {
          global: { testField: 'test' },
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

describe('selectors/structure/global', () => {
  const mockState = _testState;

  describe('getMaxAmountOfPages', () => {
    it('should return the max amount of pages', () => {
      const value = selectors.getMaxAmountOfPages(mockState);

      expect(value).toBe(5);
    });
  });
});
