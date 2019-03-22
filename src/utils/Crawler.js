const renderServer = require('@/components/renderServer');

export const SISSI_LINK = /<a[^>]*data-type=('|")sissi-internal('|")[^>]*>/g;
export const LINK_HREF = /href=('|")([^']*)('|")/;
export const TARGET_FILTER = /^\/?([^?#\s]*)/;
export const SISSI_CONTAINER = /(<div[^<]*id=('|")sissi('|")[^\/]*>)(<\/div>)/;


module.exports = class Crawler {
  constructor(Page, content, template) {
    this.Page = Page;
    this.content = content;
    this.template = template;

    this.paths = [''];
    this.staticPages = {};
  }

  async crawl() {
    return new Promise(resolve => {
      this.takeSnapshot(this.paths.shift(), resolve);
    });
  }

  // eslint-disable-next-line consistent-return
  takeSnapshot(pathName, resolve) {
    if (pathName === undefined) {
      return resolve(this.staticPages);
    }

    if (!this.staticPages[pathName]) {
      const staticPage = renderServer(this.Page, this.content, pathName);
      this.staticPages[pathName] = this.insertContent(staticPage);

      this.extractLinks(staticPage);
    }

    this.takeSnapshot(this.paths.shift(), resolve);
  }

  extractLinks(staticPage) {
    let anchorElem = SISSI_LINK.exec(staticPage);

    while (anchorElem) {
      const hrefMatch = LINK_HREF.exec(anchorElem[0]) || [];
      const href = hrefMatch[2] || '';
      const target = TARGET_FILTER.exec(href)[1];

      if (!this.staticPages[target]) {
        this.paths.push(target);
      }

      anchorElem = SISSI_LINK.exec(staticPage);
    }
  }

  insertContent(staticPage) {
    return this.template.replace(SISSI_CONTAINER, `$1${staticPage}$4`);
  }
};
