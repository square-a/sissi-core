import _cloneDeep from 'lodash.clonedeep';
import slugify from 'slugify';

const slugOpts = { remove: /[*+~.()'"!:@]/g };

export default input => {
  const content = _cloneDeep(input);
  const paths = {
    pages: new Set(),
    sections: new Set(),
  };

  const findPath = (item, type, fallback) => {
    const pathName = item.path || item.title || item.name || fallback;
    let _path = pathName ? slugify(pathName, slugOpts).toLowerCase() : fallback;

    if (_path !== undefined && paths[type].has(_path)) {
      _path = `${_path}_${item._id}`;
    }

    paths[type].add(_path);
    content[type][item._id]._path = _path;
  };

  const firstPage = content.pages[content.global._items[0]];
  firstPage._path = '';
  paths.pages.add(firstPage._path);

  Object.values(content.pages).forEach(page => {
    if (page._id !== firstPage._id) {
      findPath(page, 'pages', '');
    }
  });

  Object.values(content.sections).forEach(section => findPath(section, 'sections'));

  return content;
};
