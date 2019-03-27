const options = {
  ignore: [
    'src/__testSetup__',
  ],
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

if (!process.env.SISSI_CMS) { // will be processed by webpack
  options.ignore.push('src/cms');
}

module.exports = options;
