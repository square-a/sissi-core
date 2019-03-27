import _cloneDeep from 'lodash.clonedeep';

import * as t from '%/actions/types';
import _testState from '%/reducers/_testState';

import reducer, * as selectors from './loading';

describe('reducers/ui/loading', () => {
  let mockState;

  beforeEach(() => {
    mockState = _cloneDeep(_testState.ui.loading);
  });

  it('should increment loading', () => {
    const action = { type: t.SET_LOADING, payload: { diff: 1 }};
    const state = reducer(mockState, action);

    expect(state).toBe(1);
  });

  it('should decrement loading', () => {
    mockState = 4;
    const action = { type: t.SET_LOADING, payload: { diff: -1 }};
    const state = reducer(mockState, action);

    expect(state).toBe(3);
  });
});

describe('selectors/ui/loading', () => {
  let mockState;

  beforeEach(() => {
    mockState = _cloneDeep(_testState);
  });

  describe('getIsLoading', () => {
    it('should return true if the state is bigger than 0', () => {
      mockState.ui.loading = 2;
      const value = selectors.getIsLoading(mockState);

      expect(value).toBe(true);
    });

    it('should return false if the state is 0', () => {
      const value = selectors.getIsLoading(mockState);

      expect(value).toBe(false);
    });
  });
});
