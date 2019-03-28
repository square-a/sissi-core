import _cloneDeep from 'lodash.clonedeep';

import _testState from '%/reducers/_testState';
import * as t from './types';
import * as k from '%/constants/keywords';
import * as actions from './creators';
import * as routes from '%/router';

describe('actions/content', () => {
  describe('addPage', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.addPage('testType');

      expect(action).toHaveProperty('type', t.ADD_PAGE);
      expect(action.payload).toHaveProperty('pageType', 'testType');
    });
  });

  describe('addSection', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.addSection('testPage', 'testType');

      expect(action).toHaveProperty('type', t.ADD_SECTION);
      expect(action.payload).toHaveProperty('pageId', 'testPage');
      expect(action.payload).toHaveProperty('sectionType', 'testType');
    });
  });

  describe('addListItem', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.addListItem('listAbc');

      expect(action).toHaveProperty('type', t.ADD_LIST_ITEM);
      expect(action.payload).toHaveProperty('listName', 'listAbc');
    });
  });

  describe('deleteItem', () => {
    let mockDispatch, mockGetState;

    it('should return a thunk', () => {
      const thunk = actions.deleteItem();

      expect(typeof thunk).toBe('function');
    });

    describe('current item type is section', () => {
      beforeEach(() => {
        const mockState = _cloneDeep(_testState);
        mockState.location = {
          payload: {
            pageId: 'abc123',
            sectionId: '345def',
          },
          routesMap: {
            sectionsRoute: {
              itemType: 'sections',
            },
          },
          type: 'sectionsRoute',
        };
        mockDispatch = jest.fn();
        mockGetState = jest.fn(() => mockState);
      });

      it('should dispatch deleteSection', () => {
        actions.deleteItem()(mockDispatch, mockGetState);

        const action = mockDispatch.mock.calls[0][0];
        expect(action).toHaveProperty('type', t.DELETE_SECTION);
        expect(action.payload).toHaveProperty('pageId', 'abc123');
        expect(action.payload).toHaveProperty('sectionId', '345def');
      });

      it('should dispatch redirectToPage', () => {
        actions.deleteItem()(mockDispatch, mockGetState);

        const action = mockDispatch.mock.calls[1][0];
        expect(action).toHaveProperty('type', routes.ROUTE_PAGE);
        expect(action.payload).toHaveProperty('pageId', 'abc123');
      });
    });

    describe('current item type is page', () => {
      beforeEach(() => {
        mockDispatch = jest.fn();
        mockGetState = jest.fn(() => _testState);
      });

      it('should dispatch deletePage', () => {
        actions.deleteItem()(mockDispatch, mockGetState);

        const action = mockDispatch.mock.calls[0][0];
        expect(action).toHaveProperty('type', t.DELETE_PAGE);
        expect(action.payload).toHaveProperty('pageId', 'abc123');
      });

      it('should dispatch redirectToIndex', () => {
        actions.deleteItem()(mockDispatch, mockGetState);

        const action = mockDispatch.mock.calls[1][0];
        expect(action).toHaveProperty('type', routes.ROUTE_INDEX);
      });
    });
  });

  describe('deletePage', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.deletePage('testPage');

      expect(action).toHaveProperty('type', t.DELETE_PAGE);
      expect(action.payload).toHaveProperty('pageId', 'testPage');
    });
  });

  describe('deleteSection', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.deleteSection('testPage', 'testSection');

      expect(action).toHaveProperty('type', t.DELETE_SECTION);
      expect(action.payload).toHaveProperty('pageId', 'testPage');
      expect(action.payload).toHaveProperty('sectionId', 'testSection');
    });
  });

  describe('deleteListItem', () => {
    it('should return an action with the correct type and payload', () => {
      const action = actions.deleteListItem('listAbc', 4);

      expect(action).toHaveProperty('type', t.DELETE_LIST_ITEM);
      expect(action.payload).toHaveProperty('listName', 'listAbc');
      expect(action.payload).toHaveProperty('itemIndex', 4);
    });
  });

  describe('dragItem', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.dragItem(k.SECTIONS, 3, 2, 'abc123');

      expect(action).toHaveProperty('type', t.DRAG_ITEM);
      expect(action.payload).toHaveProperty('itemType', k.SECTIONS);
      expect(action.payload).toHaveProperty('from', 3);
      expect(action.payload).toHaveProperty('to', 2);
      expect(action.payload).toHaveProperty('pageId', 'abc123');
    });
  });
});
