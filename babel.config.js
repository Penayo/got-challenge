

module.exports = api => {
  return {
    presets: [
      [
        '@quasar/babel-preset-app',
        api.caller(caller => caller && caller.target === 'node')
          ? { targets: { node: 'current' } }
          : {}
      ]
    ],
    plugins: [
      ["@babel/proposal-decorators", { "legacy": true }],
      ["@babel/proposal-class-properties", { "loose": true }]
    ]    
  }
}

