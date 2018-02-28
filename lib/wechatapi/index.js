'use strict';

var controller = require('./wechatapi');

module.exports = function(app) {
   app.get('/wechatapi/jsconfig', controller.getJsConfig);
   app.get('/wechatapi/createmenu', controller.createMenu);
   app.get('/wechatapi/getmedia', controller.getMedia);
   app.get('/wechatapi/sendnews', controller.sendNews);
   app.get('/wechatapi/getauthorizeurl', controller.getAuthorizeURL);
   app.get('/wechatapi/getaccesstoken', controller.getAccessToken);
   app.get('/wechatapi/sendAppointmentSucceedTemplate', controller.sendAppointmentSucceedTemplate);
   app.get('/wechatapi/getWeiXinCode', controller.getWeiXinCode);
   app.get('/wechatapi/sendCheckSucceed', controller.sendCheckSucceed);
}
