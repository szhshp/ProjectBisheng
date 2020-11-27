module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@src': './src',
      }
    }],
    ["@babel/plugin-proposal-optional-chaining"]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
