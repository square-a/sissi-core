import marked from 'marked';
import TurndownService from 'turndown';

const t = {
  toHtml(markdown) {
    const renderer = new marked.Renderer();
    renderer.heading = (text, level) => `<h${level}>${text}</h${level}>`;
    marked.setOptions({
      renderer,
      gfm: true,
      breaks: true,
    });
    return marked(markdown);
  },
  toMarkdown(html) {
    const options = {
      headingStyle: 'atx',
    };
    const turndownService = new TurndownService(options);
    const markdown = turndownService.turndown(html);
    return markdown.replace(/(#.*)(\n\n)/g, '$1\n');
  },
};

export function transformToHtml(data, fields) {
  return transform('toHtml', data, fields);
}

export function transformToMarkdown(data, fields) {
  return transform('toMarkdown', data, fields);
}

function transform(targetFormat, data, fields) {
  if (Array.isArray(data)) {
    return transformArray(targetFormat, data, fields);
  } else if (isObject(data)) {
    return transformObject(targetFormat, data, fields);
  }
  return data;
}

function transformArray(targetFormat, data, fields) {
  return data.map(entry => transform(targetFormat, entry, fields));
}

function transformObject(targetFormat, data, fields) {
  const output = {};

  Object.entries(data).forEach(entry => {
    if (isString(entry[1])) {
      if (needsTransforming(entry[0], fields)) {
        output[entry[0]] = t[targetFormat](entry[1]);
      } else {
        output[entry[0]] = entry[1];
      }
    } else {
      output[entry[0]] = transform(targetFormat, entry[1], fields);
    }
  });
  return output;
}

function isString(data) {
  return typeof data === 'string';
}

function isObject(data) {
  return typeof data === 'object' && data !== null;
}

function needsTransforming(key, fields) {
  return fields[key] && fields[key].type === 'markdown';
}
