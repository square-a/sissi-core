import getNavLink from './getNavLink';

describe('helpers/getNavLink', () => {

  it('should return a shortened array if the same id is selected', () => {
    const inputArray = ['page', 'abc123', 'section'];
    const value = getNavLink('el1', 'el1', inputArray);

    expect(value).toEqual(['page', 'abc123']);
  });

  it('should return an array with the added id if a new id is selected', () => {
    const inputArray = ['page', 'abc123', 'section'];
    const value = getNavLink('el1', 'el2', inputArray);

    expect(value).toEqual(['page', 'abc123', 'section', 'el2']);
  });
});
