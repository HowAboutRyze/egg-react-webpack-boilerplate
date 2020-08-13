module.exports = {
  /**
   * 渲染社媒爬虫分享页
   * @param {object} items
   *  - title {string} 标题
   *  - image {string} 图片连接
   */
  renderShareTpl(items) {
    const tmp = `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>${items.title}</title>
  <meta http-equiv="content-type" content="text/html;charset=utf-8">
  ${Object.keys(items).map(item => `<meta property="og:${item}" content="${items[item]}">`).join('\n')}
</head>
<body></body>
</html>
    `; 
    return tmp;
  }
};