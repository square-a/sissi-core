import * as t from '%/actions/types';
import * as selectors from '%/selectors';

export default store => next => action => {
  const { type, payload } = action;

  if (type === t.ADD_LIST_ITEM || type === t.DELETE_LIST_ITEM) {
    const { item: listParent } = selectors.getCurrentItemBlueprintWithParent(store.getState());

    payload.parentId = listParent.id;
    payload.parentType = listParent.type;
  }

  if (type === t.ADD_LIST_ITEM) {
    const fields = selectors.getFieldListFields(payload.listName)(store.getState());
    const newItem = {};
    fields.forEach(fieldName => newItem[fieldName] = '');

    payload.listItem = newItem;
  }

  next(action);
};
