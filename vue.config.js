const publicPath = process.env.NODE_ENV === 'production' ? '/agent/' : '/'

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: publicPath,
})
