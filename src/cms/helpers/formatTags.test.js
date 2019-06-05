import {
  stringsToTags,
  tagsToStrings,
} from './formatTags';

describe('helpers/formatTags', () => {
  describe('stringsToTags', () => {
    it('should transform an array of strings into an array of tags', () => {
      const strings = ['strings', 'to', 'transform'];
      const expectedOutput = [
        { id: 'strings', name: 'strings' },
        { id: 'to', name: 'to' },
        { id: 'transform', name: 'transform' },
      ];

      const value = stringsToTags(strings);

      expect(value).toEqual(expectedOutput);
    });
  });

  describe('tagsToStrings', () => {
    it('should transform an array of tags into an array of strings', () => {
      const tags = [
        { id: 'tags', name: 'tags' },
        { id: 'into', name: 'into' },
        { id: 'strings', name: 'strings' },
      ];
      const expectedOutput = ['tags', 'into', 'strings'];

      const value = tagsToStrings(tags);

      expect(value).toEqual(expectedOutput);
    });
  });
});
