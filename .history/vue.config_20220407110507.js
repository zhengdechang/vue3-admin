const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    },
    css: {
      modules: {
        localsConvention: 'camelCase' // 默认只支持驼峰，修改为同事支持横线和驼峰
      },
      preprocessorOptions: {
        // scss: { additionalData: `@import "@/styles/vars.scss";` },
        less: {
          javascriptEnabled: true,
          additionalData: `@import "@/styles/default.less";`
        }
      }
    }
  },


});
