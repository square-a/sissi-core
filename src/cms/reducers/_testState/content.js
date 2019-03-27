export default {
  global: {
    _items: ['abc123', 'def345'],
    image: 'abcde.png',
    title: 'Test Project Title',
  },
  pages: {
    'abc123': {
      _id: 'abc123',
      _items: ['345def', '123abc'],
      _type: 'standard',
      path: '',
      title: 'Welcome',
    },
    'def345': {
      _id: 'def345',
      _items: ['123abc'],
      _type: 'gallery',
      path: 'photos',
      title: 'My Album',
    },
    'qwe567': {
      _id: 'qwe567',
      _type: 'team',
      path: 'about-us',
      title: 'This is us',
      people: [
        { title: 'Papa', image: 'paps.jpeg' },
        { title: 'Mama', image: 'mom.jpeg' },
        { title: 'Kid', image: 'kiddo.jpeg' },
      ],
    },
  },
  sections: {
    '123abc': {
      _id: '123abc',
      _type: 'photo',
      image: 'bfbfbfb.png',
    },
    '345def': {
      _id: '345def',
      _type: 'standard',
      title: 'This is awesome',
    },
    '567qwe': {
      _id: '567qwe',
      _type: 'friends',
      title: 'A list of friends',
      people: [
        { title: 'Harold', image: 'harold.png' },
        { title: 'Maude', image: 'maude.png' },
      ],
    },
  },
};
