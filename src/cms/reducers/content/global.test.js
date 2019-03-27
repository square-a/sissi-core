import * as t from '%/actions/types';
import * as k from '%/constants/keywords';
import _testState from '%/reducers/_testState';

import reducer, * as selectors from './global';

describe('reducers/content/global', () => {
  const mockState = _testState.content.global;

  it('should apply the fetched data', () => {
    const action = {
      type: t.SEND_REQUEST,
      payload: {
        dataType: 'content',
        responseData: {
          global: { metaTitle: 'test' },
        },
      },
    };
    const state = reducer(mockState, action);

    expect(state).toEqual({ metaTitle: 'test' });
  });

  it('should add a page', () => {
    const action = {
      type: t.ADD_PAGE,
      payload: { page: { _id: 'newPage' }},
    };
    const state = reducer(mockState, action);

    expect(state._items).toContain('newPage');
  });

  it('should delete a page', () => {
    const action = {
      type: t.DELETE_PAGE,
      payload: { pageId: 'abc123' },
    };
    const state = reducer(mockState, action);

    expect(state._items).not.toContain('abc123');
  });

  it('should move a page', () => {
    const action = {
      type: t.DRAG_ITEM,
      payload: { itemType: k.PAGES, from: 1, to: 0 },
    };
    const state = reducer(mockState, action);

    expect(state._items).toEqual(['def345', 'abc123']);
  });

  it('should add a list item', () => {
    mockState.testList = ['item1'];
    const action = {
      type: t.ADD_LIST_ITEM,
      payload: {
        parentType: 'global',
        listName: 'testList',
        listItem: 'item2',
      },
    };
    const state = reducer(mockState, action);

    expect(state.testList.length).toBe(2);
    expect(state.testList).toContain('item1');
    expect(state.testList).toContain('item2');
  });

  it('should delete a list item', () => {
    mockState.testList = ['item1', 'item2'];
    const action = {
      type: t.DELETE_LIST_ITEM,
      payload: {
        parentType: 'global',
        listName: 'testList',
        itemIndex: 0,
      },
    };
    const state = reducer(mockState, action);

    expect(state.testList.length).toBe(1);
    expect(state.testList).not.toContain('item1');
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer(mockState, action);

    expect(state).toEqual({});
  });
});

describe('selectors/content/global', () => {
  const mockState = _testState;

  describe('getAllPageIds', () => {
    it('should return the correct value', () => {
      const value = selectors.getAllPageIds(mockState);

      expect(value).toEqual(['abc123', 'def345']);
    });
  });
});
