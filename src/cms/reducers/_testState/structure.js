export default {
  settings: {
    language: 'en',
  },
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
    people: {
      label: 'People',
      itemLabel: 'Person',
      maxItems: 4,
      minItems: 2,
      fields: ['title', 'image'],
      type: 'list',
    },
  },
  global: {
    maxItems: 5,
    minItems: 1,
    fields: ['title', 'image'],
  },
  pages: {
    standard: {
      maxItems: 6,
      minItems: 1,
      label: 'Standard page',
      fields: ['title', 'path'],
    },
    gallery: {
      maxItems: 10,
      minItems: 4,
      label: 'Gallery page',
      fields: ['title', 'path'],
      allowedItems: ['photo'],
      isProtected: true,
    },
    team: {
      maxItems: 0,
      minItems: 0,
      label: 'Team page',
      fields: ['title', 'people', 'path'],
    },
  },
  sections: {
    standard: {
      label: 'Standard section',
      fields: ['title'],
    },
    photo: {
      label: 'Photo section',
      fields: ['image'],
    },
    friends: {
      label: 'Friends section',
      fields: ['title', 'people'],
    },
  },
};
