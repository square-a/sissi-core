import reducer, * as selectors from './index';
import * as t from '%/actions/types';

describe('reducers/images', () => {
  it('should apply the fetched data', () => {
    const action = {
      type: t.SEND_REQUEST,
      payload: {
        dataType: 'images',
        method: 'get',
        responseData: ['a', 'b', 'c'],
      },
    };
    const state = reducer([], action);

    expect(state).toEqual(['a', 'b', 'c']);
  });

  it('should store image names', () => {
    const action = {
      type: t.SEND_REQUEST,
      payload: {
        dataType: 'images',
        method: 'post',
        responseData: {
          fileName: 'testImage',
        },
      },
    };
    const state = reducer(['anotherImage'], action);

    expect(state).toEqual(['anotherImage', 'testImage']);
  });

  it('should reset the state', () => {
    const action = {
      type: t.RESET_SESSION,
    };
    const state = reducer(['a', 'b', 'c'], action);

    expect(state).toEqual([]);
  });
});

describe('selectors/images', () => {
  describe('getAllImages', () => {
    it('should return the stored images', () => {
      const mockState = {
        images: ['a', 'b', 'c'],
      };
      const value = selectors.getAllImages(mockState);

      expect(value).toEqual(['a', 'b', 'c']);
    });
  });
});
