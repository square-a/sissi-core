require('raf/polyfill');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');

const SissiRoutes = require('./SissiRoutes');

module.exports = function renderStatic(EntryComponent, content, path) {
  const url = /^\//.test(path) ? path : `/${path}`;

  return ReactDOMServer.renderToStaticMarkup(
    <StaticRouter context={{}} location={url}>
      <SissiRoutes
        content={content}
        EntryComponent={EntryComponent}
      />
    </StaticRouter>
  );
};
