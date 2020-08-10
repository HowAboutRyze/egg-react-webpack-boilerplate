/**
 * 社媒软件分享中间件
 * @param {string} page 
 */
module.exports = page => {
  return async function redirect(ctx, next) {
    if (page) {
      const shareData = ctx.service.share.getShareData();
      console.log('>>>>>>>>share', page, shareData);
    }
    await next();
  };
};