import middleware from './localStorage';

describe('middleware/localStorage', () => {
  it('should write the token to the localStorage if it changed', () => {
    const stateBefore = { login: { token: 'token before' } };
    const stateAfter = { login: { token: 'token after' } };
    const mockGetState = jest.fn(() => stateAfter)
      .mockImplementationOnce(() => stateBefore);
    const mockStore = {
      getState: mockGetState,
    };
    const mockLocalStorage = {
      setItem: jest.fn(),
    };
    const mockNext = jest.fn();
    const mockAction = { test: true };

    middleware(mockStore, mockLocalStorage)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
    expect(mockLocalStorage.setItem).toBeCalledWith('token', 'token after');
  });
});
