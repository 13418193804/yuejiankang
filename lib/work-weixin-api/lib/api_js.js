var urllib = require('urllib');
var util = require('./util');
var crypto = require('crypto');
var wrapper = util.wrapper;

// 错误码 - Ticket无效
var INVALID_TICKET_CODE = -1;

var Ticket = function (ticket, expireTime) {
  if (!(this instanceof Ticket)) {
    return new Ticket(ticket, expireTime);
  }
  this.ticket = ticket;
  this.expireTime = expireTime;
};

Ticket.prototype.isValid = function () {
  return !!this.ticket && (new Date().getTime()) < this.expireTime;
};

/**
 * 多台服务器负载均衡时，ticketToken需要外部存储共享。
 * 需要调用此registerTicketHandle来设置获取和保存的自定义方法。
 *
 * Examples:
 * ```
 * api.registerTicketHandle(getTicketToken, saveTicketToken);
 * // getTicketToken
 * function getTicketToken(type, callback) {
 *  settingModel.getItem(type, {key: 'weixin_ticketToken'}, function (err, setting) {
 *    if (err) return callback(err);
 *    callback(null, setting.value);
 *  });
 * }
 * // saveTicketToken
 * function saveTicketToken(type, _ticketToken, callback) {
 *  settingModel.setItem(type, {key:'weixin_ticketToken', value: ticketToken}, function (err) {
 *    if (err) return callback(err);
 *    callback(null);
 *  });
 * }
 * ```
 *
 * @param {Function} getTicketToken 获取外部ticketToken的函数
 * @param {Function} saveTicketToken 存储外部ticketToken的函数
 */
exports.registerTicketHandle = function (getTicketToken, saveTicketToken) {
  if (!getTicketToken && !saveTicketToken) {
    this.ticketStore = {};
  }
  this.getTicketToken = getTicketToken || function (type, callback) {
    if (typeof type === 'function') {
      callback = type;
      type = 'jsapi';
    }
    callback(null, this.ticketStore[type]);
  };

  this.saveTicketToken = saveTicketToken || function (type, ticketToken, callback) {
    // 向下兼容
    if (typeof ticketToken === 'function') {
      callback = ticketToken;
      ticketToken = type;
      type = 'jsapi';
    }

    this.ticketStore[type] = ticketToken;
    if (process.env.NODE_ENV === 'production') {
      console.warn('Dont save ticket in memory, when cluster or multi-computer!');
    }
    callback(null);
  };
};

/**
 * 获取js sdk所需的有效js ticket
 *
 * Callback:
 * - `err`, 异常对象
 * - `result`, 正常获取时的数据
 *
 * Result:
 * - `errcode`, 0为成功
 * - `errmsg`, 成功为'ok'，错误则为详细错误信息
 * - `ticket`, js sdk有效票据，如：bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA
 * - `expires_in`, 有效期7200秒，开发者必须在自己的服务全局缓存jsapi_ticket
 *
 * @param {Function} callback 回调函数
 */
exports.getTicket = function (type, callback) {
  this.preRequest(this._getTicket, arguments);
};

exports._getTicket = function (type, callback) {
  if (typeof type === 'function') {
    callback = type;
    type = 'jsapi';
  }
  var that = this;
  var url = this.prefix + 'get_jsapi_ticket?access_token=' + this.token.accessToken;
  this.request(url, {dataType: 'json'}, wrapper(function(err, data) {
    if (err) {
      return callback(err);
    }
    // 过期时间，因网络延迟等，将实际过期时间提前10秒，以防止临界点
    var expireTime = (new Date().getTime()) + (data.expires_in - 10) * 1000;
    var ticket = new Ticket(data.ticket, expireTime);
    that.saveTicketToken(type, ticket, function (err) {
      if (err) {
        return callback(err);
      }
      callback(err, ticket);
    });
  }));
};

/*!
 * 生成随机字符串
 */
var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

/*!
 * 生成时间戳
 */
var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

/*!
 * 排序查询字符串
 */
var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  return string.substr(1);
};

/*!
 * 签名算法
 *
 * @param {String} nonceStr 生成签名的随机串
 * @param {String} jsapi_ticket 用于签名的jsapi_ticket
 * @param {String} timestamp 时间戳
 * @param {String} url 用于签名的url，注意必须与调用JSAPI时的页面URL完全一致
 */
var sign = function (nonceStr, jsapi_ticket, timestamp, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: nonceStr,
    timestamp: timestamp,
    url: url
  };
  var string = raw(ret);
  var shasum = crypto.createHash('sha1');
  shasum.update(string);
  return shasum.digest('hex');
};

/*!
 *
 * 与api.preRequest相似，前置于需要js api ticket的方法
 * @param {Function} method 需要封装的方法
 * @param {Array} args 方法需要的参数
 */
var preRequestJSApi = function (method, args, retryed) {
  var that = this;
  var callback = args[args.length - 1];
  // 调用用户传入的获取ticket的异步方法，获得ticket之后使用（并缓存它）。
  that.getTicketToken('jsapi', function (err, cache) {
    console.log('==============that.getTicketToken==================');
    if (err) {
      return callback(err);
    }
    var ticket;
    // 有ticket并且ticket有效直接调用
    if (cache && (ticket = new Ticket(cache.ticket, cache.expireTime)).isValid()) {
      // 暂时保存ticket
      that.jsTicket = ticket;
      if (!retryed) {
        var retryHandle = function (err, data, res) {
          // 重试
          if (data && data.errcode && data.errcode !== 0) {
            console.log('===================ticket.store======================');
            console.log(that.jsTicket);
            console.log('====================ticket.store=====================');
            //cache = null;
            console.log('===================ticket.store.after======================');
            console.log(that.jsTicket);
            console.log('====================ticket.store.after=====================');
            return preRequestJSApi.call(that, method, args, true);
          }
          callback(err, data, res);
        };
        // 替换callback
        var newargs = Array.prototype.slice.call(args, 0, -1);
        newargs.push(retryHandle);
        method.apply(that, newargs);
      } else {
        method.apply(that, args);
      }
    } else {
      // 从微信端获取ticket
      that.getTicket(function (err, ticket) {
        // 如遇错误，通过回调函数传出
        if (err) {
          return callback(err);
        }
        // 暂时保存ticket
        that.jsTicket = ticket;
        method.apply(that, args);
      });
    }
  });
};


/**
 * 获取微信JS SDK Config的所需参数
 *
 * Examples:
 * ```
 * var param = {
 *  debug: false,
 *  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
 *  url: 'http://www.xxx.com'
 * };
 * api.getJsConfig(param, callback);
 * ```
 *
 * Callback:
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的js sdk config所需参数
 *
 * @param {Object} param 参数
 * @param {Function} callback 回调函数
 */
exports.getJsConfig = function (param, callback) {
  preRequestJSApi.call(this, this._getJsConfig, arguments);
};
exports._getJsConfig = function (param, callback) {
  var that = this;
  var nonceStr = createNonceStr();
  var jsAPITicket = this.jsTicket.ticket;
  var timestamp = createTimestamp();
  var signature = sign(nonceStr, jsAPITicket, timestamp, param.url);
  var result = {
    debug: param.debug,
    appId: that.corpid,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: param.jsApiList
  };
  // 判断beta参数是否存在，微信硬件开发用
  // beta: true
  // 开启内测接口调用，注入wx.invoke方法
  if (param.beta) {
    result.beta = param.beta;
  }
  callback(null, result);
};
