import getRandomString from './getRandomString';

describe('helpers/getRandomString', () => {
  it('should return a random string', () => {
    const value = getRandomString();
    const value2 = getRandomString();

    expect(typeof value).toBe('string');
    expect(value2).not.toBe(value);
  });
});
