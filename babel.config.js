module.exports = {
  ignore: [
    'src/cms', // will be processed by webpack
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
    'minify',
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
