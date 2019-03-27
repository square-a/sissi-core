import _cloneDeep from 'lodash.clonedeep';
import testState from '%/reducers/_testState';

import * as selectors from './navigation';

describe('selectors/navigation', () => {
  let mockState;

  beforeEach(() => {
    mockState = _cloneDeep(testState);
  });

  describe('single page', () => {
    beforeEach(() => {
      mockState.structure.global.maxItems = 1;
      mockState.content.global._items = ['singlePage'];
      mockState.content.pages = {
        singlePage: {
          _id: 'singlePage',
          _items: ['345def', '123abc'],
          _type: 'standard',
        },
      };
    });

    describe('getPropsForNavItem', () => {
      describe('isActive', () => {
        it('should be true if the item is currently selected', () => {
          mockState.location = {
            payload: {
              pageId: 'singlePage',
              sectionId: '345def',
            },
            routesMap: {
              sectionsRoute: {
                itemType: 'sections',
              },
            },
            type: 'sectionsRoute',
          };
          const result = selectors.getPropsForNavItem('345def', 'sections')(mockState);

          expect(result).toHaveProperty('isActive', true);
        });

        it('should be false is the item is not selected', () => {
          const result = selectors.getPropsForNavItem('345def', 'sections')(mockState);

          expect(result).toHaveProperty('isActive', false);
        });
      });

      describe('backLinkArray', () => {
        it('should point to index', () => {
          const result = selectors.getPropsForNavItem('345def', 'sections')(mockState);

          expect(result).toHaveProperty('backLinkArray');
          expect(result.backLinkArray).toEqual([]);
        });
      });

      describe('linkArray', () => {
        it('should point to the given section', () => {
          const result = selectors.getPropsForNavItem('345def', 'sections')(mockState);

          expect(result).toHaveProperty('linkArray');
          expect(result.linkArray).toEqual(['pages', 'singlePage', 'sections', '345def']);
        });
      });

      describe('title', () => {
        it('should use the title from content', () => {
          const result = selectors.getPropsForNavItem('345def', 'sections')(mockState);

          expect(result).toHaveProperty('title', 'This is awesome');
        });

        it('should use the label if there is no title in content', () => {
          mockState.content.sections['345def'].title = undefined;
          const result = selectors.getPropsForNavItem('345def', 'sections')(mockState);

          expect(result).toHaveProperty('title', 'Standard section');
        });
      });
    });

    describe('getPropsForPageNav', () => {
      it('should return null', () => {
        const result = selectors.getPropsForPageNav(mockState);

        expect(result).toBe(null);
      });
    });

    describe('getPropsForSectionNav', () => {
      describe('itemIds', () => {
        it('should be an array of all section ids', () => {
          const result = selectors.getPropsForSectionNav('singlePage')(mockState);

          expect(result).toHaveProperty('itemIds');
          expect(result.itemIds).toContain('345def');
          expect(result.itemIds).toContain('123abc');
        });
      });

      describe('canAdd', () => {
        it('should be true if more sections can be added', () => {
          const result = selectors.getPropsForSectionNav('singlePage')(mockState);

          expect(result).toHaveProperty('canAdd', true);
        });

        it('should be false if no more sections can be added', () => {
          mockState.structure.pages.standard.maxItems = 2;
          const result = selectors.getPropsForSectionNav('singlePage')(mockState);

          expect(result).toHaveProperty('canAdd', false);
        });
      });
    });
  });

  describe('multiple pages', () => {
    describe('getPropsForNavItem', () => {
      describe('pages', () => {
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

        describe('isActive', () => {
          it('should be true if the item is currently selected', () => {
            mockState.location = {
              payload: {
                pageId: 'abc123',
              },
              routesMap: {
                pagesRoute: {
                  itemType: 'pages',
                },
              },
              type: 'pagesRoute',
            };
            const result = selectors.getPropsForNavItem('abc123', 'pages')(mockState);

            expect(result).toHaveProperty('isActive', true);
          });

          it('should be false is the item is not selected', () => {
            const result = selectors.getPropsForNavItem('abc123', 'pages')(mockState);

            expect(result).toHaveProperty('isActive', false);
          });
        });

        describe('backLinkArray', () => {
          it('should point to index', () => {
            const result = selectors.getPropsForNavItem('abc123', 'pages')(mockState);

            expect(result).toHaveProperty('backLinkArray');
            expect(result.backLinkArray).toEqual([]);
          });
        });

        describe('linkArray', () => {
          it('should point to the given page', () => {
            const result = selectors.getPropsForNavItem('abc123', 'pages')(mockState);

            expect(result).toHaveProperty('linkArray');
            expect(result.linkArray).toEqual(['pages', 'abc123']);
          });
        });

        describe('title', () => {
          it('should use the title from content', () => {
            const result = selectors.getPropsForNavItem('abc123', 'pages')(mockState);

            expect(result).toHaveProperty('title', 'Welcome');
          });

          it('should use the label if there is no title in content', () => {
            mockState.content.pages['abc123'].title = undefined;
            const result = selectors.getPropsForNavItem('abc123', 'pages')(mockState);

            expect(result).toHaveProperty('title', 'Standard page');
          });
        });
      });

      describe('sections', () => {
        beforeEach(() => {
          mockState.location = {
            payload: {
              pageId: 'abc123',
            },
            routesMap: {
              pagesRoute: {
                itemType: 'pages',
              },
            },
            type: 'pagesRoute',
          };
        });

        describe('isActive', () => {
          it('should be true if the item is currently selected', () => {
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
            const result = selectors.getPropsForNavItem('345def', 'sections')(mockState);

            expect(result).toHaveProperty('isActive', true);
          });

          it('should be false is the item is not selected', () => {
            const result = selectors.getPropsForNavItem('345def', 'sections')(mockState);

            expect(result).toHaveProperty('isActive', false);
          });
        });

        describe('backLinkArray', () => {
          it('should point to the parent page', () => {
            const result = selectors.getPropsForNavItem('345def', 'sections')(mockState);

            expect(result).toHaveProperty('backLinkArray');
            expect(result.backLinkArray).toEqual(['pages', 'abc123']);
          });
        });

        describe('linkArray', () => {
          it('should point to the given section', () => {
            const result = selectors.getPropsForNavItem('345def', 'sections')(mockState);

            expect(result).toHaveProperty('linkArray');
            expect(result.linkArray).toEqual(['pages', 'abc123', 'sections', '345def']);
          });
        });

        describe('title', () => {
          it('should use the title from content', () => {
            const result = selectors.getPropsForNavItem('345def', 'sections')(mockState);

            expect(result).toHaveProperty('title', 'This is awesome');
          });

          it('should use the label if there is no title in content', () => {
            mockState.content.sections['345def'].title = undefined;
            const result = selectors.getPropsForNavItem('345def', 'sections')(mockState);

            expect(result).toHaveProperty('title', 'Standard section');
          });
        });
      });
    });

    describe('getPropsForPageNav', () => {
      describe('itemIds', () => {
        it('should be an array of all page ids', () => {
          const result = selectors.getPropsForPageNav(mockState);

          expect(result).toHaveProperty('itemIds');
          expect(result.itemIds).toContain('abc123');
          expect(result.itemIds).toContain('def345');
        });
      });

      describe('canAdd', () => {
        it('should be true if more pages can be added', () => {
          const result = selectors.getPropsForPageNav(mockState);

          expect(result).toHaveProperty('canAdd', true);
        });

        it('should be false if no more pages can be added', () => {
          mockState.structure.global.maxItems = 2;
          const result = selectors.getPropsForPageNav(mockState);

          expect(result).toHaveProperty('canAdd', false);
        });
      });
    });

    describe('getPropsForSectionNav', () => {
      describe('itemIds', () => {
        it('should be an array of all section ids', () => {
          const result = selectors.getPropsForSectionNav('abc123')(mockState);

          expect(result).toHaveProperty('itemIds');
          expect(result.itemIds).toContain('345def');
          expect(result.itemIds).toContain('123abc');
        });
      });

      describe('canAdd', () => {
        it('should be true if more sections can be added', () => {
          const result = selectors.getPropsForSectionNav('abc123')(mockState);

          expect(result).toHaveProperty('canAdd', true);
        });

        it('should be false if no more sections can be added', () => {
          mockState.structure.pages.standard.maxItems = 2;
          const result = selectors.getPropsForSectionNav('abc123')(mockState);

          expect(result).toHaveProperty('canAdd', false);
        });
      });

      it('should return the pageId', () => {
        const result = selectors.getPropsForSectionNav('abc123')(mockState);

        expect(result).toHaveProperty('pageId', 'abc123');
      });

      it('should return null if the page with the given id can not have sections', () => {
        mockState.structure.pages.standard.maxItems = 0;
        const result = selectors.getPropsForSectionNav('abc123')(mockState);

        expect(result).toBe(null);
      });
    });
  });
});
