require('raf/polyfill');
const React = require('react');
const ReactDOM = require('react-dom');
const { BrowserRouter } = require('react-router-dom');

const buildRouteContent = require('@/utils/buildRouteContent');
const SissiRoutes = require('./SissiRoutes');

module.exports = function render(EntryComponent, content) {
  if (process.env.NODE_ENV !== 'production') {
    ReactDOM.render(
      <BrowserRouter>
        <SissiRoutes routes={buildRouteContent(content)}>
          <EntryComponent />
        </SissiRoutes>
      </BrowserRouter>,
      document.querySelector('#sissi')
    );
  }
};
