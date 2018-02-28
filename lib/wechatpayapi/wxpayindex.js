
var WXPay = require('./wxpay');

WXPay.mix('Util', require('./wxutil'));

module.exports = WXPay;