/**
 * 社媒软件分享中间件
 * @param {string} page 
 */
module.exports = page => {
  return async function redirect(ctx, next) {
    // 社媒软件爬虫ua
    const sociaUas = [ '\\facebookexternalhit', '\\Facebot', '\\whatsapp'];
    const source = ctx.get('user-agent') || '';
    const match = sociaUas.some(ua => new RegExp(ua, 'i').test(source));
    if (match) {
      const store = ctx.service.share.getShareData();
      const shareData = { ...store, 'image:width': 1280, 'image:height': 720, type: 'article' };
      const shareTpl = ctx.helper.renderShareTpl(shareData);
      // 返回定制的分享页面给社媒爬虫
      ctx.body = shareTpl;
      return;
    }
    await next();
  };
};