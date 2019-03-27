import * as t from '%/actions/types';
import { ROUTE_PAGE } from '%/router';

import middleware from './interruptRoute';

describe('middleware/interruptRoute', () => {
  let mockAction, mockStore, mockNext, mockSelectors;

  beforeEach(() => {
    mockNext = jest.fn();
    mockStore = {
      getState: jest.fn(),
      dispatch: jest.fn(),
    };
    mockSelectors = {
      getFormNames: jest.fn(() =>() => ['myForm']),
      isDirty: jest.fn(() => () => true),
    };
  })

  it('should forward the action if the type is not SEND_REQUEST', () => {
    mockAction = { type: 'test' };

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should not forward route changes with dirty forms', () => {
    mockAction = {
      type: ROUTE_PAGE,
    };

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    expect(mockNext).not.toBeCalled();
  });

  it('should forward route changes with clean forms', () => {
    mockAction = {
      type: ROUTE_PAGE,
    };
    mockSelectors.isDirty = jest.fn(() => () => false);

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should forward route changes with dirty forms if it is the login form', () => {
    mockAction = {
      type: ROUTE_PAGE,
    };
    mockSelectors.getFormNames = jest.fn(() => () => ['login']);

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should dispatch an alert for dirty forms', () => {
    mockAction = {
      type: ROUTE_PAGE,
    };

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);
    expect(mockStore.dispatch).toBeCalled();

    const action = mockStore.dispatch.mock.calls[0][0];
    expect(action).toHaveProperty('type', t.SET_ALERT);
  });

  it('should forward the interrupted action if the alert is confirmed', () => {
    mockAction = {
      type: ROUTE_PAGE,
    };
    const confirmAction = {
      type: t.CLEAR_ALERTS,
      payload: { isConfirmed: true },
    };

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);
    middleware(mockStore, mockSelectors)(mockNext)(confirmAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should not forward the interrupted action if the alert is not confirmed', () => {
    mockAction = {
      type: ROUTE_PAGE,
    };
    const confirmAction = {
      type: t.CLEAR_ALERTS,
      payload: { isConfirmed: false },
    };

    middleware(mockStore, mockSelectors)(mockNext)(mockAction);
    middleware(mockStore, mockSelectors)(mockNext)(confirmAction);

    expect(mockNext).not.toBeCalledWith(mockAction);
  });
});
