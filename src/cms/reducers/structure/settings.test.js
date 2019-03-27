import _testState from '%/reducers/_testState';
import * as t from '%/actions/types';

import reducer, * as selectors from './settings';

describe('reducers/structure/settings', () => {
  const mockState = _testState.structure.settings;

  it('should return the fetched state', () => {
    const action = {
      type: t.SEND_REQUEST,
      payload: {
        dataType: 'structure',
        responseData: {
          settings: { language: 'de' },
        },
      },
    };
    const state = reducer(mockState, action);

    expect(state).toHaveProperty('language', 'de');
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer(mockState, action);

    expect(state).toEqual({});
  });
});

describe('selectors/structure/settings', () => {
  const mockState = _testState;

  describe('getSettingsLanguage', () => {
    it('should return the correct value from the state', () => {
      const value = selectors.getSettingsLanguage(mockState);

      expect(value).toBe('en');
    });
  });
});
