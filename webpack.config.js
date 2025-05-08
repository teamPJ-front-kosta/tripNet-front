module.exports = {
  // ... existing code ...
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [/node_modules\/react-datepicker/]
      }
    ]
  },
  ignoreWarnings: [
    /Failed to parse source map/,
    /Failed to parse source map from.*react-datepicker/
  ]
  // ... existing code ...
}; 