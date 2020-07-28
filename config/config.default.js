const path = require('path');
const fs = require('fs');
const ip = require('ip');
module.exports = app => {
  const exports = {};

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'locals',
    'access'
  ];

  exports.reactssr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html')
  };

  const bizConfig = {
    expiresTime: 7, // cookie 失效期
    serviceCacheMaxAge: 5000, // 请求缓存时间
    serverPrifix: `${ip.address()}:8888` // 模拟请求链接前缀
  };

  return {
    ...exports,
    ...bizConfig
  };
};
