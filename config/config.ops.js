const isProd = process.env.NODE_ENV === 'production'

/**
 * 运维配置文件, 非开发环境会屏蔽此文件
 */
module.exports = {
  // 前端服务默认端口号
  DEFUALT_PORT: 3001,
  // cdn地址
  CDN_URL: isProd ? 'http://localhost:3800' : '',
  // 接口地址
  // API_URL: 'http://10.96.17.107:3001/api',
  API_URL: 'http://localhost:3001/api',
}
