// NOTE H5 端使用 devServer 实现跨域，需要修改 package.json 的运行命令，加入环境变量
const isH5 = process.env.CLIENT_ENV === 'h5'
const HOST = '"https://miniapp.you.163.com"'
const HOST_M = '"https://m.you.163.com"'
const REAL_HOST = '"https://int-tax-dev.azurewebsites.net"'
//const REAL_HOST = '"http://localhost:7001"'
// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    HOST: isH5 ? '"/api"' : HOST,
    HOST_M: isH5 ? '"/api-m"' : HOST_M,
    REAL_HOST: isH5 ? '"/api-m-r"' : REAL_HOST,
  },
  weapp: {},
  h5: {
    devServer: {
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true
        },
        '/api-m/': {
          target: JSON.parse(HOST_M),
          pathRewrite: {
            '^/api-m/': '/'
          },
          changeOrigin: true
        }
      }
    }
  }
}
