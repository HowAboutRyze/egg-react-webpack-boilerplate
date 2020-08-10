
module.exports = app => {
  const { router, controller } = app;
  const { redirect, share } = app.middleware;
  router.get('/api/blog/list', controller.blog.index.list);
  router.get('/api/blog/:id', controller.blog.index.detail);
  router.get('/api/init/userinfo', controller.biz.getUserInfo); // 获取用户信息，设置到 cookie里
  router.get('/api/biz/list', controller.biz.getList); // 缓存获取数据
  router.get('/intro', controller.intro.intro.index);
  router.get('/csr', controller.blog.index.csr);
  router.get('/node', controller.blog.index.node);
  router.get('/example/stateless', controller.example.index.statelessRender);
  router.get('/example/hook', controller.example.index.reactHook);
  router.get('/example/async', controller.example.index.asyncComponentRender);
  router.get('/example/context', controller.example.data.contextRender);
  router.get('/example/data/node', redirect(), controller.example.data.nodeDataRender); // 测试重定向中间件
  router.get('/example/data/async', controller.example.data.asyncDataRender);
  router.get('/example/data/api/article', controller.example.data.article);
  router.get('/async', share('async'), controller.blog.index.ssr);
  router.get('/example', share('example'), controller.blog.index.ssr);
  router.get('/(.*?)', controller.blog.index.ssr);
};
