import _testState from '%/reducers/_testState';
import * as t from '%/actions/types';

import reducer, * as selectors from './fields';

describe('reducers/structure/fields', () => {
  const mockState = _testState.structure.fields;

  it('should apply the fetched data', () => {
    const action = {
      type: t.SEND_REQUEST,
      payload: {
        dataType: 'structure',
        responseData: {
          fields: { testField: 'test' },
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

describe('selectors/structure/fields', () => {
  const mockState = _testState;

  describe('getFields', () => {
    it('should return the fields structure object', () => {
      const value = selectors.getFields(mockState);

      expect(value).toHaveProperty('title');
      expect(value).toHaveProperty('people');
    });
  });

  describe('getFieldList', () => {
    it('should return the field list object for the given name', () => {
      const value = selectors.getFieldList('people')(mockState);

      expect(value).toHaveProperty('label', 'People');
      expect(value).toHaveProperty('type', 'list');
    });
  });

  describe('getFieldListFields', () => {
    it('should return an array of field names for the given field list name', () => {
      const value = selectors.getFieldListFields('people')(mockState);

      expect(value.length).toBe(2);
      expect(value).toContain('image');
    });
  });
});
