const customWebpack = require('../webpack.dev.config.js');
const customWebpackCSS = require('../webpack.css.dev.config.js');

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y"
  ]
}
