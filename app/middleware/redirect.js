/**
 * 重定向中间件
 * @param {*} options 还没想好
 */
module.exports = options => {
  return async function redirect(ctx, next) {
    const { is_redirect } = ctx.query;

    // 重定向判断
    if (is_redirect) {
      ctx.redirect('/');
      return;
    }
    await next();
  };
};