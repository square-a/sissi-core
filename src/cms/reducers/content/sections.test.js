import * as t from '%/actions/types';
import _testState from '%/reducers/_testState';

import reducer, * as selectors from './sections';

describe('reducers/content/sections', () => {
  const mockState = _testState.content.sections;

  it('should apply the fetched data', () => {
    const action = {
      type: t.SEND_REQUEST,
      payload: {
        dataType: 'content',
        responseData: {
          sections: {
            section1: {},
            section2: {},
          },
        },
      },
    };
    const state = reducer(mockState, action);

    expect(state).toEqual({ section1: {}, section2: {} });
  });

  it('should add a section', () => {
    const action = {
      type: t.ADD_SECTION,
      payload: { section: { _id: 'newSection' }},
    };
    const state = reducer(mockState, action);

    expect(state).toHaveProperty('newSection');
  });

  it('should delete a section', () => {
    const action = {
      type: t.DELETE_SECTION,
      payload: { sectionId: '123abc' },
    };
    const state = reducer(mockState, action);

    expect(state).not.toHaveProperty('123abc');
  });

  it('should add a list item', () => {
    const action = {
      type: t.ADD_LIST_ITEM,
      payload: {
        parentType: 'sections',
        parentId: '567qwe',
        listName: 'people',
        listItem: { title: '', image: '' },
      },
    };
    const state = reducer(mockState, action);

    const list = state['567qwe'].people;
    expect(list.length).toBe(3);
    expect(list[0]).toHaveProperty('title', 'Harold');
    expect(list[1]).toHaveProperty('title', 'Maude');
    expect(list[2]).toHaveProperty('title', '');
  });

  it('should delete a list item', () => {
    mockState['123abc'].testList = ['item1', 'item2'];
    const action = {
      type: t.DELETE_LIST_ITEM,
      payload: {
        parentType: 'sections',
        parentId: '567qwe',
        listName: 'people',
        itemIndex: 0,
      },
    };
    const state = reducer(mockState, action);

    const list = state['567qwe'].people;
    expect(list.length).toBe(1);
    expect(list[0]).toHaveProperty('title', 'Maude');
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer(mockState, action);

    expect(state).toEqual({});
  });
});

describe('selectors/content/sections', () => {
  const mockState = _testState;

  describe('getContentSections', () => {
    it('should return the content sections', () => {
      const value = selectors.getContentSections(mockState);

      expect(value).toHaveProperty('123abc');
      expect(value).toHaveProperty('345def');
    });
  });
});
