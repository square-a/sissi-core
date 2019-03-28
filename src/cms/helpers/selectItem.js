export default (contentState, structureState, type, id) => {
  const content = id
    ? contentState[type][id]
    : contentState[type];

  const structure = content && content._type
    ? structureState[type][content._type]
    : structureState[type];

  return {
    content: content || {},
    structure: structure || {},
    type,
    id,
  };
};
