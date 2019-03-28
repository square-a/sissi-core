import middleware from './fieldLists';

import * as t from '%/actions/types';
import _testState from '%/reducers/_testState';

describe('middleware/fieldLists', () => {
  let mockAction, mockNext, mockStore;

  beforeEach(() => {
    mockNext = jest.fn();
    mockStore = {
      getState: jest.fn(() => _testState),
      dispatch: jest.fn(),
    };
  });

  it('should forward the action', () => {
    mockAction = { type: 'TEST_ACTION' };

    middleware({})(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  describe('ADD_LIST_ITEM', () => {
    beforeEach(() => {
      mockAction = {
        type: t.ADD_LIST_ITEM,
        payload: {
          listName: 'people',
        },
      };
    });

    it('should add the parentType and parentId to the action', () => {
      middleware(mockStore)(mockNext)(mockAction);

      expect(mockAction.payload).toHaveProperty('parentType', 'pages');
      expect(mockAction.payload).toHaveProperty('parentId', 'abc123');
    });

    it('should set the default values for a new list item', () => {
      middleware(mockStore)(mockNext)(mockAction);

      expect(mockAction.payload).toHaveProperty('listItem', { title: '', image: '' });
    });
  });

  describe('DELETE_LIST_ITEM', () => {
    beforeEach(() => {
      mockAction = {
        type: t.DELETE_LIST_ITEM,
        payload: {
          listName: 'people',
          itemIndex: 1,
        },
      };
    });

    it('should add the parentType and parentId to the action', () => {
      middleware(mockStore)(mockNext)(mockAction);

      expect(mockAction.payload).toHaveProperty('parentType', 'pages');
      expect(mockAction.payload).toHaveProperty('parentId', 'abc123');
    });
  });
});
