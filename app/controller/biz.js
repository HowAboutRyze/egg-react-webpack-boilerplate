'usestrict';
const egg = require('egg');
module.exports = class BizController extends egg.Controller {
  async getUserInfo(ctx) {
    await this.service.auth.init();
    ctx.success();
  }
  async getList(ctx) {
    const res = await this.service.biz.getDataList(ctx.query);
    ctx.success(res.data);
  }
};