'use strict';
const egg = require('egg');
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');
module.exports = class ArticeService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.colllection = new Collection(ctx.db, 'share');
  }
  get list() {
    return this.colllection.get().value();
  }
  getShareData() {
    const list = this.list;
    // 随机给一个
    return list[Math.floor(Math.random() * list.length)] || {};
  }
};