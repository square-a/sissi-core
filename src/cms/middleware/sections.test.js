import _testState from '%/reducers/_testState';
import * as t from '%/actions/types';

import middleware from './sections';

describe('middleware/sections', () => {
  let mockAction, mockNext, mockStore, mockSelectors;

  beforeEach(() => {
    mockNext = jest.fn();
    mockStore = {
      getState: jest.fn(() => _testState),
      dispatch: jest.fn(),
    };
    mockAction = { type: t.ADD_SECTION, payload: { pageId: 'abc123', sectionType: 'photo' }};
  });

  it('should forward the action if the type is not ADD_SECTION', () => {
    mockAction = { type: 'TEST_ACTION' };

    middleware({})(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should forward the action with new section data if the type is ADD_SECTION', () => {
    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    const testedAction = mockNext.mock.calls[0][0];
    expect(mockNext.mock.calls).toHaveLength(1);
    expect(testedAction).toHaveProperty('type', t.ADD_SECTION);
    expect(testedAction).toHaveProperty('payload');
    expect(testedAction.payload).toHaveProperty('section');
    expect(testedAction.payload.section).toHaveProperty('_id');
    expect(testedAction.payload.section).toHaveProperty('_type', 'photo');
    expect(testedAction.payload.section).toHaveProperty('image', '');
  });
});
