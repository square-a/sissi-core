import ajax from './ajax';

describe('adapters/ajax', () => {
  it('should return an object exposing GET and POST methods', () => {
    const requestObject = ajax('http://localhost:1234');

    expect(requestObject).toHaveProperty('get');
    expect(requestObject).toHaveProperty('post');
  });

  it('should make a request', async () => {
    const requestObject = ajax('http://localhost:1234');
    const response = {
      ok: true,
      status: 200,
      headers: {
        get: jest.fn(() => 'json'),
      },
      json: jest.fn(() => ({})),
    };
    window.fetch = jest.fn((uri, options) => new Promise(resolve => resolve(response)));

    await requestObject.get();

    expect(window.fetch).toBeCalled();
  });

  it('should reject if there is a server error', async () => {
    const requestObject = ajax('http://localhost:1234');
    window.fetch = jest.fn((uri, options) => new Promise((resolve, reject) => reject()));

    await expect(requestObject.get()).rejects.toHaveProperty('status', 500);
  });

  it('should respond with a parsed object if the content type is json', async () => {
    const requestObject = ajax('http://localhost:1234');
    const response = {
      ok: true,
      status: 200,
      headers: {
        get: jest.fn(() => 'json'),
      },
      body: { isParsedJson: true },
      json: jest.fn(() => ({ isParsedJSON: true })),
    };
    window.fetch = jest.fn((uri, options) => new Promise(resolve => resolve(response)));

    const answer = await requestObject.get();
    expect(answer[0]).toHaveProperty('isParsedJSON', true);
  });

  it('should respond with the error status if not successful', async () => {
    expect.assertions(2);
    const requestObject = ajax('http://localhost:1234');
    const response = {
      ok: false,
      status: 400,
      headers: {
        get: jest.fn(() => 'text'),
      },
    };
    window.fetch = jest.fn((uri, options) => new Promise(resolve => resolve(response)));

    try {
      await requestObject.get();
    } catch(e) {
      expect(e).toHaveLength(2);
      expect(e[0]).toHaveProperty('status', 400);
    }
  });
});
