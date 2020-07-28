'use strict';
const egg = require('egg');
module.exports = class ArticeService extends egg.Service {
  init() {
    // 获取用户信息
    const userInfo = {
      user_id: 1234,
      nick_name: 'ryze'
    };
    // cookie 失效期
    const date = new Date();
    const expires = date.setTime(date.getTime() + this.app.config.expiresTime * 24 * 3600 * 1000);
    // 设置用户信息 cookie
    this.ctx.cookies.set(
      'USER_INFO',
      encodeURIComponent(JSON.stringify(userInfo)),
      { signed: false, httpOnly: false, expires: new Date(expires) }
    );
    return Promise.resolve();
  }
};