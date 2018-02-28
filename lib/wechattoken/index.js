'use strict';

var controller = require('./wechattokenapi');

module.exports = function(app) {
   app.get('/weixintoken', controller.checkWeiXinToken);
}
