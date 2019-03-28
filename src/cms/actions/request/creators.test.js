import * as t from './types';
import * as actions from './creators';

describe('actions/request', () => {
  describe('fetchData', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.fetchData('test');

      expect(action).toHaveProperty('type', t.SEND_REQUEST);
      expect(action.payload).toHaveProperty('method', 'get');
      expect(action.payload).toHaveProperty('dataType', 'test');
    });
  });

  describe('postContent', () => {
    it('should return a thunk that dispatches the correct action', () => {
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn();
      const mockGetFormNames = jest.fn(() => () => ['myForm']);
      const thunk = actions.postContent();
      thunk(mockDispatch, mockGetState, mockGetFormNames);

      expect(mockDispatch.mock.calls).toHaveLength(1);

      const action = mockDispatch.mock.calls[0][0];

      expect(action).toHaveProperty('type', t.SEND_REQUEST);
      expect(action.payload).toHaveProperty('method', 'post');
      expect(action.payload).toHaveProperty('dataType', 'content');
      expect(action.payload).toHaveProperty('formName', 'myForm');
      expect(action.payload).toHaveProperty('onSuccess');
    });
  });

  describe('saveImage', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.saveImage('test');

      expect(action).toHaveProperty('type', t.SEND_REQUEST);
      expect(action.payload).toHaveProperty('method', 'post');
      expect(action.payload).toHaveProperty('dataType', 'images');
      expect(action.payload).toHaveProperty('contentType', 'file');
      expect(action.payload).toHaveProperty('requestData', 'test');
    });
  });

  describe('login', () => {
    it('should return a thunk that dispatches the correct action', () => {
      const mockDispatch = jest.fn();
      const mockGetState = jest.fn();
      const mockGetFormValues = jest.fn(() => () => ({ username: 'testUser', password: 'pass_word' }));
      const thunk = actions.login();
      thunk(mockDispatch, mockGetState, mockGetFormValues);

      expect(mockDispatch.mock.calls).toHaveLength(1);

      const action = mockDispatch.mock.calls[0][0];

      expect(action).toHaveProperty('type', t.SEND_REQUEST);
      expect(action.payload).toHaveProperty('method', 'post');
      expect(action.payload).toHaveProperty('dataType', 'login');
      expect(action.payload).toHaveProperty('onSuccess');
      expect(action.payload).toHaveProperty('requestData');
      expect(action.payload.requestData).toHaveProperty('username', 'testUser');
      expect(action.payload.requestData).toHaveProperty('password', 'pass_word');
    });
  });

  describe('loginSuccess', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.loginSuccess({ token: '42xyz42' });

      expect(action).toHaveProperty('type', t.LOGIN_SUCCESS);
      expect(action).toHaveProperty('payload', { token: '42xyz42' });
    });
  });

  describe('resetSession', () => {
    it('should dispatch an action with the correct type and payload', () => {
      const action = actions.resetSession();

      expect(action).toHaveProperty('type', t.RESET_SESSION);
    });
  });
});
