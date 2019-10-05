import * as k from '%/constants/keywords';

export default (field, parent) => {
  switch (field.type) {
    case k.LIST: {
      const { fields: itemFieldNames, minItems } = field;
      parent[field._name] = [];

      for (let i = 0; i < minItems; i += 1) {
        const newItem = {};
        itemFieldNames.forEach(fieldName => newItem[fieldName] = '');
        parent[field._name].push(newItem);
      }
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
};
