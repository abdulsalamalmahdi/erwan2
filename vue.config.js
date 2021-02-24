module.exports = {
  "devServer": {
    "host": "localhost"
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