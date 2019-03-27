import _testState from '%/reducers/_testState';
import middleware from './pages';

import * as t from '%/actions/types';

describe('middleware/pages', () => {
  let mockAction, mockNext, mockStore, mockSelectors;

  beforeEach(() => {
    mockStore = {
      getState: jest.fn(() => _testState),
      dispatch: jest.fn(),
    };
    mockNext = jest.fn();
    mockAction = { type: t.ADD_PAGE, payload: { pageType: 'standard' }};
  });

  it('should forward the action if the type is not ADD_PAGE', () => {
    mockAction = { type: 'TEST_ACTION' };

    middleware({})(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should forward the action with new page data if the type is ADD_PAGE', () => {
    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    const testedAction = mockNext.mock.calls[0][0];
    expect(mockNext.mock.calls).toHaveLength(1);
    expect(testedAction).toHaveProperty('type', t.ADD_PAGE);
    expect(testedAction).toHaveProperty('payload');
    expect(testedAction.payload).toHaveProperty('page');
    expect(testedAction.payload.page).toHaveProperty('_id');
    expect(testedAction.payload.page).toHaveProperty('_type');
    expect(testedAction.payload.page).toHaveProperty('_items');
    expect(testedAction.payload.page).toHaveProperty('title', '');
    expect(testedAction.payload.page).toHaveProperty('path', '');
  });

  it('should dispatch addSection until the minimum of sections is created', () => {
    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    const testedAction = mockStore.dispatch.mock.calls;
    expect(testedAction).toHaveLength(1);
    expect(testedAction[0][0].payload).toHaveProperty('pageId');
  });
});
