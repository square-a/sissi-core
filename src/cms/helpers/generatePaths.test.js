import _cloneDeep from 'lodash.clonedeep';
import generatePaths from './generatePaths';
import _testState from '%/reducers/_testState';

describe('helpers/generatePaths', () => {
  let mockContent;

  beforeEach(() => {
    mockContent = _cloneDeep(_testState.content);
  });

  describe('pages', () => {
    it('should add a valid _path attribute for each page', () => {
      const result = generatePaths(mockContent);

      expect(result.pages.abc123).toHaveProperty('_path');
      expect(result.pages.def345).toHaveProperty('_path');
      expect(result.pages.qwe567).toHaveProperty('_path');
    });

    it('should set an empty string as _path for the first page', () => {
      const result = generatePaths(mockContent);

      expect(result.pages.abc123).toHaveProperty('_path', '');
    });

    it('should use the content of the path field as _path', () => {
      const result = generatePaths(mockContent);

      expect(result.pages.def345).toHaveProperty('_path', 'photos');
    });

    it('should use the content of the title field if no path is defined', () => {
      mockContent.pages.def345.path = undefined;
      const result = generatePaths(mockContent);

      expect(result.pages.def345).toHaveProperty('_path', 'my-album');
    });

    it('should use the content of the name field if no path and title is defined', () => {
      mockContent.pages.def345.path = undefined;
      mockContent.pages.def345.title = undefined;
      mockContent.pages.def345.name = 'My New Name';
      const result = generatePaths(mockContent);

      expect(result.pages.def345).toHaveProperty('_path', 'my-new-name');
    });

    it('should add the page id for _path duplicates', () => {
      mockContent.pages.def345.path = 'url1';
      mockContent.pages.qwe567.path = 'url1';
      const result = generatePaths(mockContent);

      expect(result.pages.def345).toHaveProperty('_path', 'url1');
      expect(result.pages.qwe567).toHaveProperty('_path', 'url1_qwe567');
    });
  });

  describe('sections', () => {
    it('should use the content of the path field as _path', () => {
      mockContent.sections['123abc'].path = 'section_url';
      const result = generatePaths(mockContent);

      expect(result.sections['123abc']).toHaveProperty('_path', 'section_url');
    });

    it('should use the content of the title field if no path is defined', () => {
      const result = generatePaths(mockContent);

      expect(result.sections['345def']).toHaveProperty('_path', 'this-is-awesome');
    });

    it('should use the content of the name field if no path and title is defined', () => {
      mockContent.sections['123abc'].name = 'Pippi Langstrumpf';
      const result = generatePaths(mockContent);

      expect(result.sections['123abc']).toHaveProperty('_path', 'pippi-langstrumpf');
    });

    it('should set the _path to undefined if no path, title and name is defined', () => {
      const result = generatePaths(mockContent);

      expect(result.sections['123abc']).toHaveProperty('_path', undefined);
    });

    it('should add the section id for _path duplicates', () => {
      mockContent.sections['123abc'].path = 'urlA';
      mockContent.sections['345def'].path = 'urlA';
      const result = generatePaths(mockContent);

      expect(result.sections['123abc']).toHaveProperty('_path', 'urla');
      expect(result.sections['345def']).toHaveProperty('_path', 'urla_345def');
    });
  });
});
