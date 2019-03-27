import * as t from '%/actions/types';
import * as k from '%/constants/keywords';
import _testState from '%/reducers/_testState';

import reducer, * as selectors from './modal';

describe('reducers/ui/modal', () => {
  const mockState = _testState.ui.modal;

  it('should set the given modal type', () => {
    const action = {
      type: t.SET_MODAL,
      payload: {
        type: k.GUIDE,
      },
    };
    const state = reducer(mockState, action);

    expect(state).toHaveProperty('type', k.GUIDE);
  });
});

describe('selectors/ui/modal', () => {
  const mockState = _testState;

  describe('getModalState', () => {
    it('should return the modal type', () => {
      const value = selectors.getModalState(mockState);

      expect(value).toHaveProperty('type', '');
    });
  });
});
