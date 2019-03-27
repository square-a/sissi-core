import * as converter from './markdownHtmlConverter';

describe('helpers/markdownHtmlConverter', () => {
  let data, expectedOutput;
  const fields = {
    positive: { type: 'markdown' },
    negative: { type: 'other' },
  };

  const markdownString = '# heading\n## subheading\nparagraph with _emphasized_ text\n\n*   list item 1\n*   list item 2\n\nanother paragraph with [link](https://test) and image: ![alt](https://image)';

  const htmlString = '<h1>heading</h1><h2>subheading</h2><p>paragraph with <em>emphasized</em> text</p>\n<ul>\n<li>list item 1</li>\n<li>list item 2</li>\n</ul>\n<p>another paragraph with <a href="https://test">link</a> and image: <img src="https://image" alt="alt"></p>\n';

  describe('markdown to HTML', () => {
    it('should convert markdown to HTML', () => {
      data = { positive: markdownString };
      expectedOutput = { positive: htmlString };

      const output = converter.transformToHtml(data, fields);

      expect(output).toEqual(expectedOutput);
    });

    it('should not convert values that are not specified as markdown', () => {
      data = { negative: 'some other string with # markdown\n* characters' };
      expectedOutput = data;

      const output = converter.transformToHtml(data, fields);

      expect(output).toEqual(expectedOutput);
    });

    it('should convert nested objects', () => {
      data = {
        level1: {
          level2: {
            positive: markdownString,
          },
        },
      };
      expectedOutput = {
        level1: {
          level2: {
            positive: htmlString,
          },
        },
      };

      const output = converter.transformToHtml(data, fields);

      expect(output).toEqual(expectedOutput);
    });

    it('should convert objects within arrays', () => {
      data = [
        { positive: markdownString, negative: true },
        { positive: markdownString, negative: 'some value' },
      ];
      expectedOutput = [
        { positive: htmlString, negative: true },
        { positive: htmlString, negative: 'some value' },
      ];

      const output = converter.transformToHtml(data, fields);

      expect(output).toEqual(expectedOutput);
    });

    it('should not convert strings', () => {
      data = markdownString;
      expectedOutput = data;

      const output = converter.transformToHtml(data, fields);

      expect(output).toEqual(expectedOutput);
    });
  });

  describe('HTML to markdown', () => {
    it('should convert HTML to markdown', () => {
      data = { positive: htmlString };
      expectedOutput = { positive: markdownString };

      const output = converter.transformToMarkdown(data, fields);

      expect(output).toEqual(expectedOutput);
    });

    it('should not convert values that are not specified as markdown', () => {
      data = { negative: 'some other string with # markdown\n* characters' };
      expectedOutput = data;

      const output = converter.transformToMarkdown(data, fields);

      expect(output).toEqual(expectedOutput);
    });

    it('should convert nested objects', () => {
      data = {
        level1: {
          level2: {
            positive: htmlString,
          },
        },
      };
      expectedOutput = {
        level1: {
          level2: {
            positive: markdownString,
          },
        },
      };

      const output = converter.transformToMarkdown(data, fields);

      expect(output).toEqual(expectedOutput);
    });

    it('should convert objects within arrays', () => {
      data = [
        { positive: htmlString, negative: true },
        { positive: htmlString, negative: 'some value' },
      ];
      expectedOutput = [
        { positive: markdownString, negative: true },
        { positive: markdownString, negative: 'some value' },
      ];

      const output = converter.transformToMarkdown(data, fields);

      expect(output).toEqual(expectedOutput);
    });

    it('should not convert strings', () => {
      data = htmlString;
      expectedOutput = data;

      const output = converter.transformToMarkdown(data, fields);

      expect(output).toEqual(expectedOutput);
    });
  });
});
