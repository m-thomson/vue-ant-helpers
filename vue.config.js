module.exports = {
  runtimeCompiler: true,
  css: {   // https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
    sourceMap: true,
    loaderOptions: {
      // pass Less.js Options to less-loader
      less: {
        // http://lesscss.org/usage/#less-options-strict-units
        lessOptions: {
          javascriptEnabled: true, // Fix for: https://github.com/ant-design/ant-design/issues/7927
          // globalVars: {
          //   primary: '#fff'
          // },
        }
      }
    }
  },
}
