let WXPay = require('./wxpayindex');
let fs = require('fs');
let config = require('../wechatconfig');
let dbhelper = require('../db/dbhelper');
let controller = require('../wechatapi/wechatapi');
let request = require('request');
let db_mysql = require('../db/mysql');
exports.getJsPayData = getJsPayData;
exports.handleWePaySucceed = handleWePaySucceed;

let wxpay = WXPay({
  appid: config.wechat.appid,
  mch_id: '1491928562',
  partner_key: 'PO6L5q2MaTbnPLbYz7NJRoJ0duu8HFzm', //微信商户平台API密钥
  pfx: fs.readFileSync('./apiclient_cert.p12'), //微信商户平台证书
});

function getClientIp(req) {
  var ip = req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || '';
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0]
  }
  return ip;
};

function doPay(req, res, opt) {
  let moneytest = 40000
  if (opt.money == 1) {
    moneytest = 1
  }




  request.post({
      url: "https://www.safomap.com/other/getnodebody",
      form: {
        'body': JSON.stringify({
          'order_no': opt.outTradeNo,
          'amount': moneytest,
          "subject": "螺旋CT检测⼀次(node)",
          "body": '螺旋CT检测⼀次',
          "detail": opt.detail,
          "openid": req.cookies.openid
        })
      }
    },
    function (err, response, body) {

    });

  request.post({
      url: "http://120.25.71.44:8089/paymax/wechatm/charges",
      form: {
        'order_no': opt.outTradeNo,
        'amount': parseFloat(moneytest/100).toFixed(2),
        "subject": "螺旋CT检测⼀次(node)",
        "body": '螺旋CT检测⼀次',
        "detail": opt.detail,
        "openid": req.cookies.openid
      }
    },
    function (err, response, body) {

      request.post({
          url: "https://www.safomap.com/other/getnodebody",
          form: {
            'body': JSON.stringify(body)
          }
        },
        function (err, response, body) {

        });
    });


  wxpay.getBrandWCPayRequestParams({
    openid: req.cookies.openid,
    body: '螺旋CT检测⼀次',
    detail: opt.detail,
    out_trade_no: opt.outTradeNo,
    total_fee: moneytest,
    spbill_create_ip: opt.spbillIp,
    notify_url: 'http://jiankang.aisimob.com/wechatpay/handleWePaySucceed'
  }, function (err, result) {

//insert log into database

    res.send({data: result, sec_order_id: opt.outTradeNo});
  });


}

function getJsPayData(req, res) {
  let order_id = req.query.order_id;
  let currentDate = new Date();
  let spbillIp = getClientIp(req).toString();
  let outTradeNo = '' + currentDate.getFullYear() + (currentDate.getMonth() + 1) + currentDate.getDate() + Math.random().toString().substr(2, 10) + Math.random().toString().substr(2, 10);


  if (order_id) {

    request.post({
        url: "http://120.78.206.182:8080/api/order/preInsertOrder",
        form: {'order_id': order_id, 'outTradeNo': outTradeNo}
      },
      function (err, response, body) {
        if (!err && response.statusCode == 200) {
          let bodydata = JSON.parse(body);
          if (bodydata.code == 1) {
            doPay(req, res, {detail: '低剂量螺旋CT肿瘤标记物⾎液检查(复查).', outTradeNo: outTradeNo, spbillIp: spbillIp, money: 1});
          } else {
            res.send(body);
          }
        }
      });
  } else {
    doPay(req, res, {detail: '低剂量螺旋CT肿瘤标记物⾎液检查', outTradeNo: outTradeNo, spbillIp: spbillIp});
  }

}

//处理微信支付回调函数,并推送模板消息
function handleWePaySucceed(app) {
  app.use('/wechatpay/handleWePaySucceed', wxpay.useWXCallback(function (msg, req, res, next) {
    //log into database
    db_mysql.weChatLog(msg.out_trade_no, JSON.stringify({
      'open_id': msg.openid,
      'money': msg.total_fee,
      'wechat_order': msg.out_trade_no
    }), 'paySuccess');

    request.post({
        url: "http://120.78.206.182:8080/api/order/paySuccess",
        form: {'open_id': msg.openid, 'money': msg.total_fee, 'wechat_order': msg.out_trade_no}
      },
      function (err, response, body) {

        if (!err && response.statusCode == 200) {
          console.log(body);
          let bodydata = JSON.parse(body);
          console.log(bodydata.data);
          if (bodydata.code == 2) {
            console.log('订单已经存在');
            res.success();
          }
          if (bodydata.data && bodydata.data.order_id) {
            msg.orderId = bodydata.data.order_id;
            controller.sendTemplateForSignUp(msg, res, function (err, result) {
              console.log(result.errcode == 0);
              if (result.errcode == 0) {
                console.log('paysuccess');
                res.success();
              }
            });
          }
        }
      });
  }));
}

