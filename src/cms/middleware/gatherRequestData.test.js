import middleware from './gatherRequestData';
import testState from '%/reducers/_testState';
import * as t from '%/actions/types';

describe('middleware/gatherRequestData', () => {
  let mockAction,
    mockGetFormValues,
    mockNext,
    mockStore;

  beforeEach(() => {
    mockAction = {
      type: t.SEND_REQUEST,
      payload: {
        method: 'post',
        formName: 'global',
        dataType: 'content',
      }};
    mockGetFormValues = jest.fn(() => () => ({}));
    mockNext = jest.fn();
    mockStore = {
      dispatch: jest.fn(),
      getState: jest.fn(() => testState),
    };
  });

  it('should forward the action if the type is not SEND_REQUEST', () => {
    mockAction = { type: 'test' };

    middleware(mockStore, mockGetFormValues)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should forward the action if the method is not "post"', () => {
    mockAction = { type: t.SEND_REQUEST, payload: { method: 'test' }};

    middleware(mockStore, mockGetFormValues)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should add requestData before forwarding the action', () => {
    middleware(mockStore, mockGetFormValues)(mockNext)(mockAction);

    expect(mockAction.payload).toHaveProperty('requestData');
    expect(mockAction.payload.requestData).toHaveProperty('global');
    expect(mockAction.payload.requestData).toHaveProperty('pages');
    expect(mockAction.payload.requestData).toHaveProperty('sections');
    expect(mockNext).toBeCalled();
  });

  it('should transform markdown to HTML before forwarding the action', () => {
    testState.structure.fields.text = { type: 'markdown' };
    mockGetFormValues = jest.fn(() => () => ({ text: '# heading\nparagraph' }));

    middleware(mockStore, mockGetFormValues)(mockNext)(mockAction);

    expect(mockAction.payload.requestData.global.text).toBe('<h1>heading</h1><p>paragraph</p>\n');
  });

  describe('global', () => {
    it('should merge the reducer data with the form data', () => {
      mockGetFormValues = jest.fn(() => () => ({ image: 'blubb.png' }));

      middleware(mockStore, mockGetFormValues)(mockNext)(mockAction);

      const globalData = mockAction.payload.requestData.global;
      expect(globalData).toHaveProperty('image', 'blubb.png');
      expect(globalData).toHaveProperty('title', 'Test Project Title');
    });
  });

  describe('pages', () => {
    it('should merge the reducer data with the form data', () => {
      mockAction = {
        type: t.SEND_REQUEST,
        payload: {
          method: 'post',
          formName: 'pages-abc123',
          dataType: 'content',
        },
      };
      mockGetFormValues = jest.fn(() => () => ({ title: 'New Title' }));

      middleware(mockStore, mockGetFormValues)(mockNext)(mockAction);

      const pageData = mockAction.payload.requestData.pages.abc123;
      expect(pageData).toHaveProperty('title', 'New Title');
      expect(pageData).toHaveProperty('path', '');
    });
  });

  describe('sections', () => {
    it('should merge the reducer data with the form data', () => {
      mockAction = {
        type: t.SEND_REQUEST,
        payload: {
          method: 'post',
          formName: 'sections-123abc',
          dataType: 'content',
        }};
        mockGetFormValues = jest.fn(() => () => ({ title: 'Nanana' }));

      middleware(mockStore, mockGetFormValues)(mockNext)(mockAction);

      const sectionData = mockAction.payload.requestData.sections['123abc'];
      expect(sectionData).toHaveProperty('title', 'Nanana');
      expect(sectionData).toHaveProperty('image', 'bfbfbfb.png');
    });
  });
});
