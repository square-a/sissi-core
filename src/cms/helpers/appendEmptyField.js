import * as k from '%/constants/keywords';
import { getFieldWithName } from '%/selectors';

const appendEmptyField = (field, parent, state) => {
  /* eslint-disable no-param-reassign */
  switch (field.type) {
    case k.LIST: {
      const { fields: fieldNames, minItems } = field;
      const list = [];

      for (let i = 0; i < minItems; i += 1) {
        const newListItem = {};
        fieldNames.forEach(fieldName => {
          const nestedField = getFieldWithName(fieldName)(state);
          appendEmptyField(nestedField, newListItem, state);
        });
        list.push(newListItem);
      }
      parent[field._name] = list;
      break;
    }

    case k.BOOLEAN:
      parent[field._name] = false;
      break;

    case k.TAGS:
      parent[field._name] = [];
      break;

    default:
      parent[field._name] = '';
  }
  /* eslint-enable */
};

export default appendEmptyField;
