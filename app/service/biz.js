'use strict';
const BaseService = require('./baseService');
module.exports = class BizService extends BaseService {
  async getDataList(data) {
    const res = await this.cacheGet(`${this.config.serverPrifix}/api/list`, data);
    return res;
  }
};