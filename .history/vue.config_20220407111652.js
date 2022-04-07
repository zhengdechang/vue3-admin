const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // css: {
  //   loaderOptions: {
  //     less: {
  //       javascriptEnabled: true,//允许链式调用的换行
  //     }
  //   }
  // },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true
        }
      }
    }
  }
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: []
  //   },
  // },
});
