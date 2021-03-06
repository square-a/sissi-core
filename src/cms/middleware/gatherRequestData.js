import { getFormValues } from 'redux-form';
import _merge from 'lodash.merge';

import * as t from '%/actions/types';
import * as constants from '%/constants/keywords';
import * as selectors from '%/selectors';
import { transformToHtml } from '%/helpers/markdownHtmlConverter';
import generatePaths from '%/helpers/generatePaths';

export default ({ getState }, selectFormValues = getFormValues) => next => action => {
  const { type, payload } = action;
  const isPostRequest = type === t.SEND_REQUEST && payload.method === constants.POST;

  if (isPostRequest && payload.dataType === constants.CONTENT) {
    const state = getState();
    const { formName } = payload;
    const [itemType, itemId] = formName.split('-');
    const formValues = selectFormValues(formName)(state);
    let contentUpdate;

    if (itemId) {
      contentUpdate = {
        [itemType]: {
          [itemId]: formValues,
        },
      };
    } else {
      contentUpdate = {
        [itemType]: formValues,
      };
    }

    const newContent = _merge({}, selectors.getContent(state), contentUpdate);
    const transformedData = transformToHtml(newContent, selectors.getFields(state));
    const contentWithPaths = generatePaths(transformedData);

    // eslint-disable-next-line no-param-reassign
    action.payload.requestData = contentWithPaths;
  }
  next(action);
};
