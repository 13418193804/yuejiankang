'use strict';

module.exports = function(app) {
  require('./lib/wechat/routes')(app);
  //require('./lib/userapi/index')(app);
  require('./lib/wechatapi/index')(app);
  require('./lib/wechattoken/index')(app);
  require('./lib/wechatpayapi/index')(app);
}