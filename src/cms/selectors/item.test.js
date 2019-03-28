import cloneDeep from 'lodash.clonedeep';
import testState from '%/reducers/_testState';

import * as c from '%/constants';
import * as selectors from './item';

describe('selectors/item', () => {
  let mockState;

  beforeEach(() => {
    mockState = cloneDeep(testState);
  });

  describe('getCurrentItemBlueprintWithParent', () => {
    describe('global', () => {
      beforeEach(() => {
        mockState.location = {
          routesMap: {
            globalRoute: {
              itemType: 'global',
            },
          },
          type: 'globalRoute',
        };
      });

      describe('item', () => {
        it('should be returned', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result).toHaveProperty('item');
        });

        it('should contain null as id', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result.item).toHaveProperty('id', null);
        });

        it('should contain "global" as type', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result.item).toHaveProperty('type', c.GLOBAL);
        });
      });

      describe('parent', () => {
        it('should be null', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result).toHaveProperty('parent', null);
        });
      });
    });

    describe('pages', () => {
      beforeEach(() => {
        mockState.location = {
          payload: {
            pageId: 'def345',
          },
          routesMap: {
            pagesRoute: {
              itemType: 'pages',
            },
          },
          type: 'pagesRoute',
        };
      });

      describe('item', () => {
        it('should be returned', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result).toHaveProperty('item');
        });

        it('should contain the id', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result.item).toHaveProperty('id', 'def345');
        });

        it('should contain "pages" as type', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result.item).toHaveProperty('type', c.PAGES);
        });
      });

      describe('parent', () => {
        it('should be returned', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result).toHaveProperty('parent');
        });

        it('should contain null as id', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result.parent).toHaveProperty('id', null);
        });

        it('should contain "global" as type', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result.parent).toHaveProperty('type', c.GLOBAL);
        });
      });
    });

    describe('sections', () => {
      beforeEach(() => {
        mockState.location = {
          payload: {
            pageId: 'abc123',
            sectionId: '345def',
          },
          routesMap: {
            sectionsRoute: {
              itemType: 'sections',
            },
          },
          type: 'sectionsRoute',
        };
      });

      describe('item', () => {
        it('should be returned', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result).toHaveProperty('item');
        });

        it('should contain the id', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result.item).toHaveProperty('id', '345def');
        });

        it('should contain "sections" as type', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result.item).toHaveProperty('type', c.SECTIONS);
        });
      });

      describe('parent', () => {
        it('should be returned', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result).toHaveProperty('parent');
        });

        it('should contain the page id as id', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result.parent).toHaveProperty('id', 'abc123');
        });

        it('should contain "pages" as type', () => {
          const result = selectors.getCurrentItemBlueprintWithParent(mockState);

          expect(result.parent).toHaveProperty('type', c.PAGES);
        });
      });
    });
  });

  describe('getCurrentItemWithParent', () => {
    describe('global', () => {
      beforeEach(() => {
        mockState.location = {
          routesMap: {
            globalRoute: {
              itemType: 'global',
            },
          },
          type: 'globalRoute',
        };
      });

      describe('item', () => {
        it('should be returned', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result).toHaveProperty('item');
        });

        it('should contain null as id', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.item).toHaveProperty('id', null);
        });

        it('should contain "global" as type', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.item).toHaveProperty('type', c.GLOBAL);
        });

        it('should contain the content', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.item).toHaveProperty('content');
          expect(result.item.content).toHaveProperty('image', 'abcde.png');
        });

        it('should contain the structure', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.item).toHaveProperty('structure');
          expect(result.item.structure).toHaveProperty('minItems', 1);
        });
      });

      describe('parent', () => {
        it('should be null', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result).toHaveProperty('parent', null);
        });
      });
    });

    describe('pages', () => {
      beforeEach(() => {
        mockState.location = {
          payload: {
            pageId: 'def345',
          },
          routesMap: {
            pagesRoute: {
              itemType: 'pages',
            },
          },
          type: 'pagesRoute',
        };
      });

      describe('item', () => {
        it('should be returned', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result).toHaveProperty('item');
        });

        it('should contain the id', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.item).toHaveProperty('id', 'def345');
        });

        it('should contain "pages" as type', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.item).toHaveProperty('type', c.PAGES);
        });

        it('should contain the content', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.item).toHaveProperty('content');
          expect(result.item.content).toHaveProperty('path', 'photos');
        });

        it('should contain the structure', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.item).toHaveProperty('structure');
          expect(result.item.structure).toHaveProperty('minItems', 4);
        });
      });

      describe('parent', () => {
        it('should be returned', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result).toHaveProperty('parent');
        });

        it('should contain null as id', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.parent).toHaveProperty('id', null);
        });

        it('should contain "global" as type', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.parent).toHaveProperty('type', c.GLOBAL);
        });

        it('should contain the content', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.parent).toHaveProperty('content');
          expect(result.parent.content).toHaveProperty('image', 'abcde.png');
        });

        it('should contain the structure', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.parent).toHaveProperty('structure');
          expect(result.parent.structure).toHaveProperty('minItems', 1);
        });
      });
    });

    describe('sections', () => {
      beforeEach(() => {
        mockState.location = {
          payload: {
            pageId: 'abc123',
            sectionId: '345def',
          },
          routesMap: {
            sectionsRoute: {
              itemType: 'sections',
            },
          },
          type: 'sectionsRoute',
        };
      });

      describe('item', () => {
        it('should be returned', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result).toHaveProperty('item');
        });

        it('should contain the id', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.item).toHaveProperty('id', '345def');
        });

        it('should contain "sections" as type', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.item).toHaveProperty('type', c.SECTIONS);
        });

        it('should contain the content', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.item).toHaveProperty('content');
          expect(result.item.content).toHaveProperty('title', 'This is awesome');
        });

        it('should contain the structure', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.item).toHaveProperty('structure');
          expect(result.item.structure).toHaveProperty('label', 'Standard section');
        });
      });

      describe('parent', () => {
        it('should be returned', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result).toHaveProperty('parent');
        });

        it('should contain the page id as id', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.parent).toHaveProperty('id', 'abc123');
        });

        it('should contain "pages" as type', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.parent).toHaveProperty('type', c.PAGES);
        });

        it('should contain the content', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.parent).toHaveProperty('content');
          expect(result.parent.content).toHaveProperty('title', 'Welcome');
        });

        it('should contain the structure', () => {
          const result = selectors.getCurrentItemWithParent(mockState);

          expect(result.parent).toHaveProperty('structure');
          expect(result.parent.structure).toHaveProperty('minItems', 1);
        });
      });
    });
  });

  describe('getItemWithParent(testId, testType)', () => {
    let testId, testType;

    describe('global', () => {
      beforeEach(() => {
        testId = null;
        testType = 'global';
      });

      describe('item', () => {
        it('should be returned', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result).toHaveProperty('item');
        });

        it('should contain null as id', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.item).toHaveProperty('id', null);
        });

        it('should contain "global" as type', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.item).toHaveProperty('type', c.GLOBAL);
        });

        it('should contain the content', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.item).toHaveProperty('content');
          expect(result.item.content).toHaveProperty('image', 'abcde.png');
        });

        it('should contain the structure', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.item).toHaveProperty('structure');
          expect(result.item.structure).toHaveProperty('minItems', 1);
        });
      });

      describe('parent', () => {
        it('should be null', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result).toHaveProperty('parent', null);
        });
      });
    });

    describe('pages', () => {
      beforeEach(() => {
        testId = 'def345';
        testType = 'pages';
      });

      describe('item', () => {
        it('should be returned', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result).toHaveProperty('item');
        });

        it('should contain the id', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.item).toHaveProperty('id', 'def345');
        });

        it('should contain "pages" as type', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.item).toHaveProperty('type', c.PAGES);
        });

        it('should contain the content', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.item).toHaveProperty('content');
          expect(result.item.content).toHaveProperty('path', 'photos');
        });

        it('should contain the structure', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.item).toHaveProperty('structure');
          expect(result.item.structure).toHaveProperty('minItems', 4);
        });
      });

      describe('parent', () => {
        it('should be returned', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result).toHaveProperty('parent');
        });

        it('should contain null as id', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.parent).toHaveProperty('id', null);
        });

        it('should contain "global" as type', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.parent).toHaveProperty('type', c.GLOBAL);
        });

        it('should contain the content', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.parent).toHaveProperty('content');
          expect(result.parent.content).toHaveProperty('image', 'abcde.png');
        });

        it('should contain the structure', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.parent).toHaveProperty('structure');
          expect(result.parent.structure).toHaveProperty('minItems', 1);
        });
      });
    });

    describe('sections', () => {
      beforeEach(() => {
        testId = '345def';
        testType = 'sections';
      });

      describe('item', () => {
        it('should be returned', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result).toHaveProperty('item');
        });

        it('should contain the id', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.item).toHaveProperty('id', '345def');
        });

        it('should contain "sections" as type', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.item).toHaveProperty('type', c.SECTIONS);
        });

        it('should contain the content', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.item).toHaveProperty('content');
          expect(result.item.content).toHaveProperty('title', 'This is awesome');
        });

        it('should contain the structure', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.item).toHaveProperty('structure');
          expect(result.item.structure).toHaveProperty('label', 'Standard section');
        });
      });

      describe('parent', () => {
        it('should be returned', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result).toHaveProperty('parent');
        });

        it('should contain the page id as id', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.parent).toHaveProperty('id', 'abc123');
        });

        it('should contain "pages" as type', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.parent).toHaveProperty('type', c.PAGES);
        });

        it('should contain the content', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.parent).toHaveProperty('content');
          expect(result.parent.content).toHaveProperty('title', 'Welcome');
        });

        it('should contain the structure', () => {
          const result = selectors.getItemWithParent(testId, testType)(mockState);

          expect(result.parent).toHaveProperty('structure');
          expect(result.parent.structure).toHaveProperty('minItems', 1);
        });
      });
    });
  });
});
