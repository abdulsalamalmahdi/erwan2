//const path =require('path')
module.exports = {
  // outputDir: path.resolve(__dirname, ''),
  // proxyTable: {
  //   '/api': {
  //     target: 'http://localhost:4000/',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': ''
  //     }
  //   }},
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000/',
        changeOrigin: true
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  pluginOptions: {
    electronBuilder: {
        externals: ['sqlite3'],
        nodeIntegration: true
      },
    }
}