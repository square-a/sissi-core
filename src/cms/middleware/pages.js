import * as actions from '%/actions';
import * as t from '%/actions/types';
import * as k from '%/constants/keywords';
import * as selectors from '%/selectors';
import getRandomString from '%/helpers/getRandomString';

// eslint-disable-next-line consistent-return
export default ({ dispatch, getState }) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_PAGE) {
    let _type = payload.pageType;

    if (!payload.pageType) {
      const allowedTypes = selectors.getAllowedPageTypes(getState());

      if (allowedTypes.length > 1) {
        return dispatch(actions.openModal(k.TYPE_PICKER));
      }

      _type = allowedTypes[0].name;
    }

    const _id = getRandomString();
    const newPage = {
      _id,
      _items: [],
      _type,
    };

    const fields = selectors.getFieldsForPageType(_type)(getState());
    fields.forEach(field => {
      if (field.type === k.LIST) {
        const { fields: itemFieldNames, minItems } = field;
        newPage[field._name] = [];

        for (let i = 0; i < minItems; i += 1) {
          const newItem = {};
          itemFieldNames.forEach(fieldName => newItem[fieldName] = '');
          newPage[field._name].push(newItem);
        }

      } else {
        newPage[field._name] = '';
      }
    })

    payload.page = newPage;
    next(action);

    const minSectionsPerPage = selectors.getMinAmountOfSectionsForPageType(_type)(getState());
    let currentAmountOfSections = selectors.getSectionIdsForPage(_id)(getState()).length;

    while (currentAmountOfSections < minSectionsPerPage) {
      dispatch(actions.addSection(_id));
      currentAmountOfSections += 1;
    }

  } else if (type === t.DELETE_PAGE) {
    const { pageId } = payload;
    const sectionIds = selectors.getSectionIdsForPage(pageId)(getState());
    sectionIds.forEach(sectionId => dispatch(actions.deleteSection(pageId, sectionId)));
    next(action);

  } else {
    next(action);
  }
};
