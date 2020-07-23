'use strict';
module.exports = {
  get db() {
    return this.app.db;
  },
  success(data) {
    this.body = {
      result_code: 200,
      data,
      message: 'success'
    };
  },
  serviceErr(err) {
    this.body = {
      result_code: 500,
      data: null,
      message: err
    };
  }
};