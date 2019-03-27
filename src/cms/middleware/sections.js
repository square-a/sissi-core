import * as actions from '%/actions';
import * as t from '%/actions/types';
import * as k from '%/constants/keywords';
import getRandomString from '%/helpers/getRandomString';
import * as selectors from '%/selectors';

export default ({ dispatch, getState }) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_SECTION) {
    let _type = payload.sectionType;

    if (!payload.sectionType) {
      const allowedSectionTypes = selectors.getAllowedSectionTypesForPageId(payload.pageId)(getState());

      if (allowedSectionTypes.length > 1) {
        return dispatch(actions.openModal(k.TYPE_PICKER, { pageId: payload.pageId }));
      } else {
        _type = allowedSectionTypes[0].name;
      }
    }

    const newSection = {
      _type,
      _id: getRandomString(),
    };

    const fields = selectors.getFieldsForSectionType(_type)(getState());
    fields.forEach(field => {
      if (field.type === k.LIST) {
        const { fields: itemFieldNames, minItems } = field;
        newSection[field._name] = [];

        for (let i = 0; i < minItems; i++) {
          const newItem = {};
          itemFieldNames.forEach(fieldName => newItem[fieldName] = '');
          newSection[field._name].push(newItem);
        }

      } else {
        newSection[field._name] = '';
      }
    });

    payload.section = newSection;
  }

  next(action);
}
