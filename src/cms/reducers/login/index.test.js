import reducer, * as selectors from './index';
import * as t from '%/actions/types';

describe('reducers/login', () => {
  it('should set the token when login is successful', () => {
    const action = { type: t.LOGIN_SUCCESS, payload: { token: '42token24' }};
    const state = reducer({}, action);

    expect(state).toHaveProperty('token', '42token24');
  });

  it('should reset the token', () => {
    const action = { type: t.RESET_SESSION };
    const state = reducer({ token: 'test' }, action);

    expect(state).toHaveProperty('token', null);
  });
});

describe('selectors/login', () => {
  describe('getAuthToken', () => {
    it('should return the correct value from the reducer', () => {
      const mockState = { login: { token: '42token' }};
      const value = selectors.getAuthToken(mockState);

      expect(value).toBe('42token');
    });
  });
});
