import * as t from '%/actions/types';
import _testState from '%/reducers/_testState';

import reducer, * as selectors from './alert';

describe('reducers/ui/alert', () => {
  const mockState = _testState.ui.alert;

  it('should set the given alert', () => {
    const action = {
      type: t.SET_ALERT,
      payload: {
        message: 'this is bad',
        title: 'sorry',
        type: 'error',
      },
    };
    const state = reducer(mockState, action);

    expect(state).toHaveProperty('message', 'this is bad');
    expect(state).toHaveProperty('title', 'sorry');
    expect(state).toHaveProperty('type', 'error');
  });

  it('should clear the alert', () => {
    const action = { type: t.CLEAR_ALERTS };
    const state = reducer(mockState, action);

    expect(state).toHaveProperty('message', '');
    expect(state).toHaveProperty('title', '');
    expect(state).toHaveProperty('type', '');
  });
});

describe('selectors/ui/alert', () => {
  const mockState = _testState;

  describe('getAlert', () => {
    it('should return the alert state', () => {
      const value = selectors.getAlert(mockState);

      expect(value).toHaveProperty('message', 'this is great');
      expect(value).toHaveProperty('title', 'it works');
      expect(value).toHaveProperty('type', 'success');
    });
  });
});
