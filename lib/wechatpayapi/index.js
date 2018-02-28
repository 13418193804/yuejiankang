'use strict';

var controller = require('./wechatpayapi');

module.exports = function(app) {
   app.get('/wechatpay/getJsPayData', controller.getJsPayData);
   controller.handleWePaySucceed(app);
}
