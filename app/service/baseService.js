const egg = require('egg');
const LRU = require('lru-cache');
const cache = new LRU({
  max: 1000
});

module.exports = class BaseService extends egg.Service {
  // 通过 lru-cache 对get请求进行缓存
  async cacheGet(url, data) {
    const cacheKey = `${url}?${Object.keys(data).map(k => `${k}=${data[k]}`).join('&')}`;
    const cacheData = cache.get(cacheKey);
    if (cacheData) {
      console.log('>>>> cache hint');
      return JSON.parse(cacheData);
    }
    console.log('>>>cache miss');
    const res = await this.ctx.curl(url, {
      data,
      dataType: 'json',
      timeout: 10000
    });
    cache.set(cacheKey, JSON.stringify(res.data), this.app.config.serviceCacheMaxAge);
    return res.data;
  }
}