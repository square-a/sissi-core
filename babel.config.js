const options = {
  ignore: [],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: true,
        },
      },
    ],
    '@babel/preset-react',
    ['minify', { builtIns: false }],
  ],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '%': './src/cms',
        },
      },
    ],
  ],
};

if (!process.env.SISSI_CMS && process.env.NODE_ENV !== 'test') { // will be processed by webpack
  options.ignore.push('src/cms');
}

if (process.env.NODE_ENV !== 'test') {
  options.ignore.push('src/__testSetup__');
}

module.exports = options;
