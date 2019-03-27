import cloneDeep from 'lodash.clonedeep';
import testState from '%/reducers/_testState';

import * as selectors from './editor';

describe('selectors/editor', () => {
  let mockState;

  beforeEach(() => {
    mockState = cloneDeep(testState);
  });

  describe('getPropsForEditor', () => {
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

      it('should return false for canDelete', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('canDelete', false);
      });

      it('should return fieldNames', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('fieldNames', ['title', 'image']);
      });

      it('should return the formName', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('formName', 'global');
      });

      it('should return initialValues', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('initialValues');
        expect(result.initialValues).toHaveProperty('title');
        expect(result.initialValues).not.toHaveProperty('_items');
      });

      it('should return 1 as viewLevel', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('viewLevel', 1);
      });
    });

    describe('pages', () => {
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

      describe('canDelete', () => {
        it('should be true when amount of pages is over minimum', () => {
          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('canDelete', true);
        });

        it('should be false when amount of pages is at minimum', () => {
          mockState.structure.global.minItems = 2;

          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('canDelete', false);
        });

        it('should be false for protected pages', () => {
          mockState.location.payload.pageId = 'def345';

          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('canDelete', false);
        });
      });

      it('should return fieldNames', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('fieldNames', ['title', 'path']);
      });

      it('should return the formName', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('formName', 'pages-abc123');
      });

      it('should return initialValues', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('initialValues');
        expect(result.initialValues).toHaveProperty('title', 'Welcome');
        expect(result.initialValues).not.toHaveProperty('_id');
      });

      it('should return 3 as viewLevel', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('viewLevel', 3);
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

      describe('canDelete', () => {
        it('should be true when amount of sections is over minimum', () => {
          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('canDelete', true);
        });

        it('should be false when amount of sections is at minimum', () => {
          mockState.structure.pages.standard.minItems = 2;

          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('canDelete', false);
        });
      });

      it('should return fieldNames', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('fieldNames', ['title']);
      });

      it('should return the formName', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('formName', 'sections-345def');
      });

      it('should return initialValues', () => {
        const result = selectors.getPropsForEditor(mockState);

        expect(result).toHaveProperty('initialValues');
        expect(result.initialValues).toHaveProperty('title', 'This is awesome');
        expect(result.initialValues).not.toHaveProperty('_id');
      });

      describe('viewLevel', () => {
        it('should be 2 for single pages', () => {
          mockState.structure.global.maxItems = 1;
          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('viewLevel', 2);
        });

        it('should be 4 when multiple pages are allowed', () => {
          const result = selectors.getPropsForEditor(mockState);

          expect(result).toHaveProperty('viewLevel', 4);
        });
      });
    });
  });
});
