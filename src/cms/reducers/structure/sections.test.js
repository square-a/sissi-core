import _testState from '%/reducers/_testState';
import * as t from '%/actions/types';

import reducer, * as selectors from './sections';

describe('reducers/structure/sections', () => {
  const mockState = _testState.structure.sections;

  it('should return the fetched state', () => {
    const action = {
      type: t.SEND_REQUEST,
      payload: {
        dataType: 'structure',
        responseData: {
          sections: { standard: 'test' },
        },
      },
    };
    const state = reducer(mockState, action);

    expect(state).toHaveProperty('standard', 'test');
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer(mockState, action);

    expect(state).toEqual({});
  });
});

describe('selectors/structure/sections', () => {
  const mockState = _testState;

  describe('getStructureSections', () => {
    it('should return the structure sections', () => {
      const value = selectors.getStructureSections(mockState);

      expect(value).toHaveProperty('standard');
      expect(value.standard).toHaveProperty('label', 'Standard section');
    });
  });
});
