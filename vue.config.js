module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 默认配置,因为router和store都可以直接通过$store和$router拿到且只用在app里注册
        // '@': 'src'
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
        // .set('@assets',resolve('src/assets'))
      }
    }
  }
}