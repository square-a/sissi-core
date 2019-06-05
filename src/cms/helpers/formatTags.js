export const stringsToTags = stringArray => stringArray.map(tagName => ({ id: tagName, name: tagName }));

export const tagsToStrings = tagArray => tagArray.map(tag => tag.name);
