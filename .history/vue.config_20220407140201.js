const { defineConfig } = require("@vue/cli-service");

const path = require("path");

import { viteAntdTheme } from 'vite-plugin-antd-theme';

const themesEntry = [
  // 暗黑主题
  {
    entryPath: [
      path.resolve(__dirname, './node_modules/ant-design-vue/lib/style/themes/dark.less'),
      path.resolve(__dirname, './src/styles/dark.less')
    ],
    outputName: 'dark',
    outputPath: './src/config'
  },
  // 默认主题
  {
    entryPath: path.resolve(__dirname, './src/styles/default.less'),
    outputName: 'light',
    outputPath: './src/config'
  }
];

const options = {
  themesEntry,
  // 是否提取全部变量，默认false，优先级低于设置themeVariables
  allVariables: true,
  // 以下是antd-theme-generator配置项
  antDir: path.join(__dirname, './node_modules/ant-design-vue'),
  stylesDir: path.join(__dirname, './src'), // all files with .less extension will be processed
  varFile: path.join(__dirname, './src/styles/default.less'), // default path is Ant Design default.less file
  themeVariables: [],
  outputFilePath: path.join(__dirname, './public/static/color.less'), // if provided, file will be created with generated less/styles
  customColorRegexArray: [/^fade\(.*\)$/] // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
};



module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/styles/default.less")]
    },
  },
  plugins: [
    viteAntdTheme(options)
  ],
});
