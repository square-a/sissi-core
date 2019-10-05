import * as actions from '%/actions';
import * as t from '%/actions/types';
import * as k from '%/constants/keywords';
import * as selectors from '%/selectors';
import getRandomString from '%/helpers/getRandomString';
import appendEmptyField from '%/helpers/appendEmptyField';

// eslint-disable-next-line consistent-return
export default ({ dispatch, getState }) => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_SECTION) {
    let _type = payload.sectionType;

    if (!payload.sectionType) {
      const allowedSectionTypes = selectors.getAllowedSectionTypesForPageId(payload.pageId)(getState());

      if (allowedSectionTypes.length > 1) {
        return dispatch(actions.openModal(k.TYPE_PICKER, { pageId: payload.pageId }));
      }

      _type = allowedSectionTypes[0].name;
    }

    const newSection = {
      _type,
      _id: getRandomString(),
    };

    const fields = selectors.getFieldsForSectionType(_type)(getState());
    fields.forEach(field => appendEmptyField(field, newSection));

    payload.section = newSection;
  }

  next(action);
};
