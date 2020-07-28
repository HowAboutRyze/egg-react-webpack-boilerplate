
// cookie 操作
export default {
  get() {
    const cookies = document.cookie.split(';');
    const cookieObj = cookies.reduce((pre, next) => {
      const key = next.split('=')[0].trim();
      const val = next.split('=')[1];
      pre[key] = val;
      return pre;
    }, {});
    return cookieObj;
  }
};