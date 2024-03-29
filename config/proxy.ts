/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  /**
   * api
   */
  dev: {
    '/api/': {
      target: 'https://api.meshed.cn',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  /**
   * 测试 微服务单独对接使用
   * @name 详细的代理配置
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    '/api/iam/': {
      target: 'http://localhost:7989',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },

  pre: {
  },
};
