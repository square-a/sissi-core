const Content = require('./Content');
const _testContent = require('./_testData/content');
const _testStructure = require('./_testData/structure');

describe('Content', () => {
  let testContent;

  describe('_addPages', () => {
    beforeEach(() => {
      testContent = new Content({ global: { _items: []}}, _testStructure);
    });

    it('should add the given pages to global', () => {
      testContent._addPages([{ _id: 'test1' }, { _id: 'test2' }]);
      const { global } = testContent.getContent();

      expect(global._items.length).toBe(2);
      expect(global._items).toContain('test1');
      expect(global._items).toContain('test2');
    });

    it('should add the given pages to pages', () => {
      testContent._addPages([{ _id: 'test1' }, { _id: 'test2' }]);
      const { pages } = testContent.getContent();

      expect(pages).toHaveProperty('test1');
      expect(pages).toHaveProperty('test2');
    });
  });

  describe('_addSections', () => {
    beforeEach(() => {
      const pagesContent = {
        test1: {
          _id: 'test1',
          _items: [],
          _type: 'photoAlbum',
        },
        test2: {
          _id: 'test2',
          _items: [],
          _type: 'standard',
        },
      };
      testContent = new Content({ pages: pagesContent }, _testStructure);
    });

    it('should add the given sections to the given page', () => {
      testContent._addSections([{ _id: 'test1' }, { _id: 'test2' }], testContent.content.pages.test2);
      const { pages } = testContent.getContent();

      const testPageItems = pages.test2._items;
      expect(testPageItems.length).toBe(2);
      expect(testPageItems).toContain('test1');
      expect(testPageItems).toContain('test2');
    });

    it('should add the given sections to sections', () => {
      testContent._addSections([{ _id: 'test1' }, { _id: 'test2' }], testContent.content.pages.test1);
      const { sections } = testContent.getContent();

      expect(sections).toHaveProperty('test1');
      expect(sections).toHaveProperty('test2');
    });
  });

  describe('_addMissingFields', () => {
    let validFields;

    beforeEach(() => {
      testContent = new Content(_testContent, _testStructure);
      testContent.structure.fields.newField = { type: 'string' };
      testContent.structure.global.fields = ['title', 'image', 'newField'];
      testContent.structure.pages.standard.fields = ['title', 'path', 'newField'];
      testContent.structure.sections.standard.fields = ['title', 'image', 'newField'];

      validFields = Object.keys(testContent.structure.fields);
    });

    it('should add missing fields to global', () => {
      testContent._addMissingFields(validFields, testContent.structure.global, testContent.content.global);
      const { global } = testContent.getContent();

      expect(global).toHaveProperty('newField', '');
    });

    it('should add missing fields to pages', () => {
      testContent._addMissingFields(
        validFields,
        testContent.structure.pages.standard,
        testContent.content.pages.abc123
      );
      const { pages } = testContent.getContent();

      expect(pages.abc123).toHaveProperty('newField', '');
    });

    it('should add missing fields to sections', () => {
      testContent._addMissingFields(
        validFields,
        testContent.structure.sections.standard,
        testContent.content.sections['345def']
      );
      const { sections } = testContent.getContent();

      expect(sections['345def']).toHaveProperty('newField', '');
    });

    describe('field lists', () => {
      it('should add the minimum amount of items', () => {
        delete testContent.content.pages.def345.gallery;
        testContent._addMissingFields(
          validFields,
          testContent.structure.pages.photoAlbum,
          testContent.content.pages.def345
        );
        const { pages } = testContent.getContent();

        expect(pages.def345).toHaveProperty('gallery');
        expect(pages.def345.gallery.length).toBe(2);
      });

      it('should add missing fields to each item', () => {
        testContent.structure.fields.gallery.fields = ['title', 'image', 'path'];
        testContent._addMissingFields(
          validFields,
          testContent.structure.pages.photoAlbum,
          testContent.content.pages.def345
        );
        const { pages } = testContent.getContent();

        expect(pages.def345.gallery[0]).toHaveProperty('path');
        expect(pages.def345.gallery[1]).toHaveProperty('path');
      });
    });
  });

  describe('_removePages', () => {
    beforeEach(() => {
      testContent = new Content(_testContent, _testStructure);
    });

    it('should remove the pages with the given ids from global', () => {
      testContent._removePages(['abc123']);
      const { global } = testContent.getContent();

      expect(global._items).not.toContain('abc123');
    });

    it('should remove the pages with the given ids from pages', () => {
      testContent._removePages(['abc123']);
      const { pages } = testContent.getContent();

      expect(pages).not.toHaveProperty('abc123');
    });

    it('should not remove pages with other ids', () => {
      testContent._removePages(['abc123']);
      const { global, pages } = testContent.getContent();

      expect(global._items).toContain('def345');
      expect(pages).toHaveProperty('def345');
    });
  });

  describe('_removeSections', () => {
    beforeEach(() => {
      testContent = new Content(_testContent, _testStructure);
    });

    it('should remove the sections with the given ids from pages', () => {
      testContent._removeSections(['123abc']);
      const { pages } = testContent.getContent();

      expect(pages.def345._items).not.toContain('123abc');
    });

    it('should remove the sections with the given ids from sections', () => {
      testContent._removeSections(['123abc']);
      const { sections } = testContent.getContent();

      expect(sections['123abc']).toBeUndefined();
    });

    it('should not remove sections with other ids', () => {
      testContent._removeSections(['123abc']);
      const { pages, sections } = testContent.getContent();

      expect(pages.def345._items).toContain('567ghi');
      expect(pages.def345._items).toContain('789jkl');
      expect(sections).toHaveProperty('567ghi');
      expect(sections).toHaveProperty('789jkl');
    });
  });

  describe('_removeInvalidFields', () => {
    let validFields;

    beforeEach(() => {
      testContent = new Content(_testContent, _testStructure);
      validFields = Object.keys(testContent.structure.fields);
    });

    describe('generally invalid fields', () => {
      beforeEach(() => {
        delete testContent.structure.fields.title;
        validFields = Object.keys(testContent.structure.fields);
      });

      it('should remove fields from global', () => {
        testContent._removeInvalidFields(
          validFields,
          testContent.structure.global,
          testContent.content.global
        );

        const { global } = testContent.getContent();

        expect(global).not.toHaveProperty('title');
      });

      it('should remove fields from pages', () => {
        testContent._removeInvalidFields(
          validFields,
          testContent.structure.pages.standard,
          testContent.content.pages.abc123
        );

        const { pages } = testContent.getContent();

        expect(pages.abc123).not.toHaveProperty('title');
      });

      it('should remove fields from sections', () => {
        testContent._removeInvalidFields(
          validFields,
          testContent.structure.sections.standard,
          testContent.content.sections['345def']
        );

        const { sections } = testContent.getContent();

        expect(sections['345def']).not.toHaveProperty('title');
      });
    });

    it('should remove invalid fields from global', () => {
      testContent.structure.global.fields = ['image'];
      testContent._removeInvalidFields(
        validFields,
        testContent.structure.global,
        testContent.content.global
      );

      const { global } = testContent.getContent();

      expect(global).not.toHaveProperty('title');
    });

    it('should remove invalid fields from pages', () => {
      testContent.structure.pages.standard.fields = ['path'];
      testContent._removeInvalidFields(
        validFields,
        testContent.structure.pages.standard,
        testContent.content.pages.abc123
      );

      const { pages } = testContent.getContent();

      expect(pages.abc123).not.toHaveProperty('title');
    });

    it('should remove invalid fields from sections', () => {
      testContent.structure.sections.standard.fields = ['image'];
      testContent._removeInvalidFields(
        validFields,
        testContent.structure.sections.standard,
        testContent.content.sections['345def']
      );

      const { sections } = testContent.getContent();

      expect(sections['345def']).not.toHaveProperty('title');
    });

    describe('field lists', () => {
      it('should remove items exceeding the maximum', () => {
        testContent.structure.fields.gallery.maxItems = 1;
        testContent._removeInvalidFields(
          validFields,
          testContent.structure.pages.photoAlbum,
          testContent.content.pages.def345
        );

        const { pages } = testContent.getContent();

        expect(pages.def345.gallery.length).toBe(1);
      });

      it('should remove invalid fields from each item', () => {
        testContent.structure.fields.gallery.fields = ['image'];
        testContent._removeInvalidFields(
          validFields,
          testContent.structure.pages.photoAlbum,
          testContent.content.pages.def345
        );

        const { pages } = testContent.getContent();

        expect(pages.def345.gallery[0]).not.toHaveProperty('title');
        expect(pages.def345.gallery[1]).not.toHaveProperty('title');
      });
    });
  });

  describe('migrating initial content', () => {
    beforeEach(() => {
      testContent = new Content({}, _testStructure);
    });

    describe('migratePages', () => {
      it('should add all protected pages', () => {
        const { pages } = testContent.migratePages().getContent();
        const pagesArray = Object.values(pages);

        expect(pagesArray.find(p => p._type === 'photoAlbum')).not.toBeUndefined();
      });

      it('should add the minimum amount of pages', () => {
        const { pages } = testContent.migratePages().getContent();

        expect(Object.keys(pages).length).toBe(2);
      });

      it('should add the new page ids to global', () => {
        const result = testContent.migratePages().getContent();

        expect(result.global._items.length).toBe(2);
      });
    });

    describe('migrateSections', () => {
      beforeEach(() => {
        testContent.content.pages = {
          test1: {
            _id: 'test1',
            _items: [],
            _type: 'photoAlbum',
          },
          test2: {
            _id: 'test2',
            _items: [],
            _type: 'standard',
          },
        };
      });

      it('should add the minimum sections to each page', () => {
        const result = testContent.migrateSections().getContent();

        expect(result.pages.test1).toHaveProperty('_items');
        expect(result.pages.test1._items.length).toBe(4);
      });

      it('should use the first of the allowed section types', () => {
        const { sections } = testContent.migrateSections().getContent();
        const sectionsArray = Object.values(sections);

        expect(sectionsArray.filter(s => s._type === 'photo').length).toBe(4);
        expect(sectionsArray.filter(s => s._type === 'standard').length).toBe(1);
      });

      it('should add the new sections to content.sections', () => {
        const { sections } = testContent.migrateSections().getContent();
        const sectionsArray = Object.values(sections);

        expect(sectionsArray.find(s => s._type === 'photo')).not.toBeUndefined();
      });

      it('should not add sections if minItems is 0 or not defined', () => {
        testContent.structure.pages = {
          standard: {
            maxItems: 6,
            minItems: 0,
            fields: ['title', 'path'],
          },
          photoAlbum: {
            maxItems: 10,
            fields: ['title', 'path'],
            isProtected: true,
          },
        };

        const { pages, sections } = testContent.migrateSections().getContent();

        expect(pages.test1._items.length).toBe(0);
        expect(pages.test2._items.length).toBe(0);
        expect(Object.keys(sections).length).toBe(0);
      });
    });

    describe('migrateFields', () => {
      it('should add fields to global', () => {
        const { global } = testContent.migrateFields().getContent();

        expect(global).toHaveProperty('title', '');
        expect(global).toHaveProperty('image', '');
      });

      it('should add fields to pages', () => {
        testContent.content.pages = {
          test1: {
            _id: 'test1',
            _items: [],
            _type: 'photoAlbum',
          },
          test2: {
            _id: 'test2',
            _items: [],
            _type: 'standard',
          },
        };

        const { pages } = testContent.migrateFields().getContent();

        expect(pages.test1).toHaveProperty('title', '');
        expect(pages.test1).toHaveProperty('path', '');
        expect(pages.test2).toHaveProperty('title', '');
        expect(pages.test2).toHaveProperty('path', '');
      });

      it('should add fields to sections', () => {
        testContent.content.sections = {
          testA: {
            _id: 'testA',
            _type: 'photo',
          },
          testB: {
            _id: 'testB',
            _type: 'standard',
          },
        };

        const { sections } = testContent.migrateFields().getContent();

        expect(sections.testA).toHaveProperty('image', '');
        expect(sections.testB).toHaveProperty('title', '');
        expect(sections.testB).toHaveProperty('image', '');
      });
    });
  });

  describe('migrating existing content', () => {
    beforeEach(() => {
      testContent = new Content(_testContent, _testStructure);
    });

    describe('migratePages', () => {
      it('should filter out all pages with invalid page types', () => {
        testContent.structure.pages = {
          standard: {
            maxItems: 6,
            minItems: 1,
            fields: ['title', 'path'],
          },
          photo: {
            maxItems: 10,
            minItems: 4,
            fields: ['image', 'path'],
          },
        };

        const { global, pages } = testContent.migratePages().getContent();

        expect(global._items).not.toContain('def345');
        expect(pages.def345).toBeUndefined();
      });

      it('should not add pages if all required pages exist', () => {
        const { global, pages } = testContent.migratePages().getContent();

        expect(global._items.length).toBe(2);
        expect(Object.entries(pages).length).toBe(2);
        expect(pages).toHaveProperty('abc123');
        expect(pages).toHaveProperty('def345');
      });

      it('should remove pages over the maximum', () => {
        testContent.structure.global.maxItems = 1;

        const { global, pages } = testContent.migratePages().getContent();

        expect(global._items.length).toBe(1);
        expect(Object.entries(pages).length).toBe(1);
      });

      it('should not remove pages below the maximum', () => {
        const { global, pages } = testContent.migratePages().getContent();

        expect(global._items.length).toBe(2);
        expect(Object.entries(pages).length).toBe(2);
      });

      it('should never remove protected pages', () => {
        testContent.structure.global.maxItems = 1;

        const { global, pages } = testContent.migratePages().getContent();

        expect(global._items.length).toBe(1);
        expect(global._items).toContain('def345');
        expect(Object.entries(pages).length).toBe(1);
        expect(Object.entries(pages)[0][0]).toBe('def345');
      });
    });

    describe('migrateSections', () => {
      beforeEach(() => {
        testContent = new Content(_testContent, _testStructure);
      });

      it('should filter out all sections with invalid section types', () => {
        testContent.structure.sections = {
          standard: {
            fields: ['title', 'path'],
          },
        };

        const { pages, sections } = testContent.migrateSections().getContent();

        expect(pages.def345._items).not.toContain('123abc');
        expect(pages.def345._items).not.toContain('567ghi');
        expect(pages.def345._items).toContain('789jkl');
        expect(sections['123abc']).toBeUndefined();
        expect(sections['567ghi']).toBeUndefined();
      });

      it('should remove sections exceeding the maximum amount for each page', () => {
        testContent.structure.pages.standard.maxItems = 0;
        testContent.structure.pages.standard.minItems = 0;
        testContent.structure.pages.standard.allowedItems = ['standard', 'photo'];

        const { sections } = testContent.migrateSections().getContent();

        expect(sections['345def']).toBeUndefined();
      });
    });

    describe('migrateFields', () => {
      describe('global', () => {
        it('should remove generally invalid fields', () => {
          testContent.structure.fields = { image: {}};
          const { global } = testContent.migrateFields().getContent();

          expect(global).not.toHaveProperty('title');
        });

        it('should remove fields invalid for global', () => {
          testContent.structure.global.fields = ['image'];
          const { global } = testContent.migrateFields().getContent();

          expect(global).not.toHaveProperty('title');
        });

        it('should add missing fields', () => {
          testContent.structure.global.fields = ['title', 'image', 'path'];
          const { global } = testContent.migrateFields().getContent();

          expect(global).toHaveProperty('path', '');
        });

        it('should not overwrite existing fields', () => {
          const { global } = testContent.migrateFields().getContent();

          expect(global).toHaveProperty('title', 'Test Project Title');
        });
      });

      describe('pages', () => {
        it('should remove generally invalid fields', () => {
          testContent.structure.fields = { image: {}};
          const { pages } = testContent.migrateFields().getContent();

          expect(pages.abc123).not.toHaveProperty('path');
          expect(pages.abc123).not.toHaveProperty('title');
        });

        it('should remove fields invalid for the page', () => {
          testContent.structure.pages.standard.fields = ['image'];
          const { pages } = testContent.migrateFields().getContent();

          expect(pages.abc123).not.toHaveProperty('path');
          expect(pages.abc123).not.toHaveProperty('title');
        });

        it('should add missing fields', () => {
          testContent.structure.pages.standard.fields = ['title', 'path', 'image'];

          const { pages } = testContent.migrateFields().getContent();

          expect(pages.abc123).toHaveProperty('image', '');
        });

        it('should not overwrite exising fields', () => {
          const { pages } = testContent.migrateFields().getContent();

          expect(pages.abc123).toHaveProperty('title', 'Welcome');
        });
      });

      describe('sections', () => {
        it('should remove generally invalid fields', () => {
          testContent.structure.fields = { image: {}};
          const { sections } = testContent.migrateFields().getContent();

          expect(sections['345def']).not.toHaveProperty('title');
        });

        it('should remove fields invalid for the section', () => {
          testContent.structure.sections.standard.fields = ['image'];
          const { sections } = testContent.migrateFields().getContent();

          expect(sections['345def']).not.toHaveProperty('title');
        });

        it('should add missing fields', () => {
          testContent.structure.sections.standard.fields = ['title', 'path', 'image'];

          const { sections } = testContent.migrateFields().getContent();

          expect(sections['345def']).toHaveProperty('image', '');
          expect(sections['345def']).toHaveProperty('path', '');
        });

        it('should not overwrite exising fields', () => {
          const { sections } = testContent.migrateFields().getContent();

          expect(sections['345def']).toHaveProperty('title', 'This is awesome');
        });
      });

      describe('field lists', () => {
        it('should remove generally invalid fields', () => {
          delete testContent.structure.fields.title;
          const { pages } = testContent.migrateFields().getContent();

          expect(pages.def345.gallery[0]).not.toHaveProperty('title');
          expect(pages.def345.gallery[1]).not.toHaveProperty('title');
        });

        it('should remove invalid fields for the given field list', () => {
          testContent.structure.fields.gallery.fields = ['image'];
          const { pages } = testContent.migrateFields().getContent();

          expect(pages.def345.gallery[0]).not.toHaveProperty('title');
          expect(pages.def345.gallery[1]).not.toHaveProperty('title');
        });

        it('should add missing fields', () => {
          testContent.structure.fields.gallery.fields = ['image', 'title', 'path'];

          const { pages } = testContent.migrateFields().getContent();

          expect(pages.def345.gallery[0]).toHaveProperty('path', '');
          expect(pages.def345.gallery[1]).toHaveProperty('path', '');
        });
      });
    });
  });
});
