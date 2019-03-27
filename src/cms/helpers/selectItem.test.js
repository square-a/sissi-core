import testState from '%/reducers/_testState';
import selectItem from './selectItem';

describe('helpers/selectItem', () => {
  let itemType, itemId;

  describe('global', () => {
    beforeEach(() => {
      itemType = 'global';
      itemId = null;
    });

    it('should return the item content', () => {
      const result = selectItem(testState.content, testState.structure, itemType, itemId);

      expect(result).toHaveProperty('content');
      expect(result.content).toHaveProperty('image', 'abcde.png');
    });

    it('should return the item structure', () => {
      const result = selectItem(testState.content, testState.structure, itemType, itemId);

      expect(result).toHaveProperty('structure');
      expect(result.structure).toHaveProperty('maxItems', 5);
    });

    it('should return the item type', () => {
      const result = selectItem(testState.content, testState.structure, itemType, itemId);

      expect(result).toHaveProperty('type', 'global');
    });

    it('should return the item id', () => {
      const result = selectItem(testState.content, testState.structure, itemType, itemId);

      expect(result).toHaveProperty('id', null);
    });
  });

  describe('pages', () => {
    beforeEach(() => {
      itemType = 'pages';
      itemId = 'abc123';
    });

    it('should return the item content', () => {
      const result = selectItem(testState.content, testState.structure, itemType, itemId);

      expect(result).toHaveProperty('content');
      expect(result.content).toHaveProperty('title', 'Welcome');
    });

    it('should return the item structure', () => {
      const result = selectItem(testState.content, testState.structure, itemType, itemId);

      expect(result).toHaveProperty('structure');
      expect(result.structure).toHaveProperty('maxItems', 6);
    });

    it('should return the item type', () => {
      const result = selectItem(testState.content, testState.structure, itemType, itemId);

      expect(result).toHaveProperty('type', 'pages');
    });

    it('should return the item id', () => {
      const result = selectItem(testState.content, testState.structure, itemType, itemId);

      expect(result).toHaveProperty('id', 'abc123');
    });
  });

  describe('sections', () => {
    beforeEach(() => {
      itemType = 'sections';
      itemId = '345def';
    });

    it('should return the item content', () => {
      const result = selectItem(testState.content, testState.structure, itemType, itemId);

      expect(result).toHaveProperty('content');
      expect(result.content).toHaveProperty('title', 'This is awesome');
    });

    it('should return the item structure', () => {
      const result = selectItem(testState.content, testState.structure, itemType, itemId);

      expect(result).toHaveProperty('structure');
      expect(result.structure).toHaveProperty('label', 'Standard section');
    });

    it('should return the item type', () => {
      const result = selectItem(testState.content, testState.structure, itemType, itemId);

      expect(result).toHaveProperty('type', 'sections');
    });

    it('should return the item id', () => {
      const result = selectItem(testState.content, testState.structure, itemType, itemId);

      expect(result).toHaveProperty('id', '345def');
    });
  });
});
