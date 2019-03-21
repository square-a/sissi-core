module.exports = {
  fields: {
    title: {
      label: 'Title',
      placeholder: 'Your title',
      type: 'string',
    },
    path: {
      label: 'Path',
      placeholder: 'about-me',
      type: 'string',
    },
    image: {
      label: 'Image',
      type: 'image',
    },
    gallery: {
      label: 'Gallery',
      type: 'list',
      itemLabel: 'Photo',
      maxItems: 10,
      minItems: 2,
      fields: ['title', 'image'],
    },
  },
  global: {
    maxItems: 5,
    minItems: 2,
    fields: ['title', 'image'],
  },
  pages: {
    standard: {
      maxItems: 6,
      minItems: 1,
      fields: ['title', 'path'],
    },
    photoAlbum: {
      maxItems: 10,
      minItems: 4,
      allowedItems: ['photo', 'standard'],
      fields: ['title', 'path', 'gallery'],
      isProtected: true,
    },
  },
  sections: {
    standard: {
      fields: ['title', 'image'],
    },
    photo: {
      fields: ['image'],
    },
  },
};
