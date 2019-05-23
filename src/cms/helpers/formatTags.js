export function stringsToTags(stringArray) {
  if (stringArray.length > 0) {
    return stringArray.map(tagName => ({ id: tagName, name: tagName }));
  }

  return [];
}

export function tagsToStrings(tagArray) {
  if (tagArray.length > 0) {
    return tagArray.map(tag => tag.name);
  }

  return [];
}
