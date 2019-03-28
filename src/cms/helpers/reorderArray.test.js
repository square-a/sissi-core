import reorderArray from './reorderArray';

describe('helpers/reorderArray', () => {
  it('should move an item to the front', () => {
    const items = ['page1', 'page2', 'page3', 'page4'];

    const result = reorderArray(items, 2, 0);

    expect(result).toEqual(['page3', 'page1', 'page2', 'page4']);
  });

  it('should move an item to the back', () => {
    const items = ['page1', 'page2', 'page3', 'page4'];

    const result = reorderArray(items, 1, 3);

    expect(result).toEqual(['page1', 'page3', 'page4', 'page2']);
  });
});
