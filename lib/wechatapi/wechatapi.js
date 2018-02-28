let WechatAPI = require('wechat-api');
var OAuth = require('wechat-oauth');
let fs = require('fs');
let config = require('../wechatconfig');
let dbhelper = require('../db/dbhelper');

let api = new WechatAPI(config.wechat.appid, config.secret);
let oauthApi = new OAuth(config.wechat.appid, config.secret);

let db_mysql = require('../db/mysql');

// let api = new WechatAPI(config.wechat.appid, config.secret, function(callback) {
//   if (dbhelper.getAccessToken()){
//     callback(null, dbhelper.getAccessToken());
//   }
//   else
//     callback(null, null);
// }, function(token, callback) {
//   dbhelper.insertAccessToken(token);
//   callback(null);
// });

// api.registerTicketHandle(getTicketToken, saveTicketToken);

// function getTicketToken(type,callback) {
//   if (dbhelper.getTicketToken()){
//     callback(null, dbhelper.getTicketToken());
//   }
//   else
//     callback(null, null);
// }

// function saveTicketToken(type,_ticketToken, callback) {
//   dbhelper.insertTicketToken(_ticketToken);
//   callback(null);
// }

exports.getDepartments = getDepartments;
exports.getJsConfig = getJsConfig;
exports.sendNews = sendNews;
exports.createMenu = createMenu;
exports.getMedia = getMedia;
exports.getAuthorizeURL = getAuthorizeURL;
exports.getAccessToken = getAccessToken;
exports.sendAppointmentSucceedTemplate = sendAppointmentSucceedTemplate;
exports.sendTemplateForSignUp = sendTemplateForSignUp;
exports.getWeiXinCode = getWeiXinCode;
exports.sendCheckSucceed = sendCheckSucceed;


function getDepartments(userData) {
  api.getDepartments(function(err, result) {
    console.log('------getDepartments------');
    console.log(result);
  });
}

function sendNews(req, res) {
  let url = config.domain + '/checkReceipt?orderid=' + req.query.orderid;
  let news = {
    "msgtype": "news",
    "news": {
      "articles": [{
        "title": "回单消息",
        "url": url
      }]
    },
    "safe": "0"
  };
  let toData = {
    "touser": "LiWei"
  };
  api.send(toData, news, function(err, result) {
    console.log('------sendnews------');
    console.log(result);
    res.send(result);
  });
}

function createMenu() {
  let urlPhoto = config.domain + '/choosePhoto';
  let urlList = config.domain + '/orderQuery';
  let urlMenu =  config.domain + '/#/beforeSignUp';
  let urlTwo = config.domain + '/#/customer/signup/signUp';
  let menu = {
    "button": [
      // {
      //   "type": "view",
      //   "name": "运输数据",
      //   "url": urlList
      // }, {
      //     "type": "view",
      //     "name": "回单上传",
      //     "url": urlPhoto
      // }, {
      //     "type": "view",
      //     "name": "jssdk测试",
      //     "url": "http://203.195.235.76/jssdk/#menu-image"
      // },
      {
        "type": "click",
        "name": "999",
        "key":"V1001_TODAY_MUSIC"
      },
      {
        "type": "view",
        "name": "报名筛查",
        "url": urlTwo
      }
    ]
  }
  api.createMenu(menu, function(err, result) {
    console.log('------createMenu------');
    console.log(result);
  });
}

//多媒体文件下载
function getMedia(req, res) {
  console.log('------getMedia------');
  api.getMedia(req.query.mediaid, function(err, result) {
    res.send(result);
  });
}

function getAuthorizeURL(req, res) {
  console.log('------getAuthorizeURL------');
  let redirectUrl = config.domain + '/wechatapi/getWeiXinCode';
  console.log(redirectUrl);
  res.send(oauthApi.getAuthorizeURL(redirectUrl, req.query.redirect, 'snsapi_userinfo'));
  //oauthApi.getAuthorizeURL(redirectUrl, req.query.redirect, 'snsapi_base');
}

function getAccessToken(req, res) {
  console.log('------getAccessToken------');
  oauthApi.getAccessToken(req.query.wechatcode, function(err, result) {
    console.log(result.openid);
    res.send(result);
  });
}

function getWeiXinCode(req,res) {
   console.log('req.query.code');
   console.log(req.query.code);
   oauthApi.getAccessToken(req.query.code, function(err, result) {
      console.log(result);
      if(result.data.openid){
        res.cookie('spreadPageToken', result.data.openid, { expires: new Date(Date.now() + 3600000), httpOnly: false });
        res.cookie('openid', result.data.openid, { expires: new Date(Date.now() + 3600000), httpOnly: false });
        //res.redirect('/#' + req.query.state +'?openid=' + result.data.openid);
        //log into database

        if(String(req.query.state).indexOf("http://jiankang.aisimob.com/")>-1){
          let url = String(req.query.state).replace('http://jiankang.aisimob.com/','');
          res.redirect('/'+url+"?openid="+result.data.openid);
        }else{
          res.redirect('/#' + req.query.state);
        }

      }
  });
}


//发送模板消息
function sendAppointmentSucceedTemplate(req, res) {
  console.log('------sendAppointmentSucceedTemplate------');
  let orderInfo = req.query.orderInfo;
  console.log(orderInfo);
  if(!orderInfo)
     return;
  orderInfo = JSON.parse(orderInfo);
  if(!orderInfo)
    return;
  let user = {"first": {
    "value":"您已成功预约肺癌早筛检测,请准时前往",
    "color":"#000000"
  },"keyword1": {
    "value":orderInfo.name,
    "color":"#000000"
  },"keyword2": {
    "value":orderInfo.order_no,
    "color":"#000000"
  },"keyword3": {
    "value":orderInfo.hospital_name + ' ' + orderInfo.address,
    "color":"#000000"
  },"keyword4": {
    "value":orderInfo.prepare_day + '  ' + orderInfo.start_time + '-' + orderInfo.end_time,
    "color":"#000000"
  },"remark": {
    "value":"点击查看详情",
    "color":"#71a0d1"
  }};

  api.sendTemplate(req.cookies.openid, "SA6IzcsD_eMZB6K9Pv7ct2GDMU0wfNKqnhdbXXZHMzo","http://jiankang.aisimob.com/#/customer/appointment/appointmentCheck?order_id=" + orderInfo.order_id, user, function(err, result) {
     res.send(result);
  });
}

/**
 * 报名成功后的推送
 */
function sendTemplateForSignUp(msg,res,callback) {
  console.log('------sendTemplateForSignUp------');
  let user = {"first": {
    "value":"您已成功报名肺癌早筛检测，请预约检测时间、检测医院进⾏检测",
    "color":"#000000"
  },"keyword1": {
    "value": msg.out_trade_no,
    "color":"#000000"
  },"keyword2": {
    "value":"400元",
    "color":"#000000"
  },"remark": {
    "value":"点击详情预约",
    "color":"#71a0d1"
  }};
  console.log(msg.orderId);
  api.sendTemplate(msg.openid, "XBfNt1EvPWkrzOWBmftSOvC0AYk1T-wnHAnnO2zH8ag","http://jiankang.aisimob.com/#/customer/appointment/appointmentList", user,callback);
 // api.sendTemplate(msg.openid, "XBfNt1EvPWkrzOWBmftSOvC0AYk1T-wnHAnnO2zH8ag","http://jiankang.aisimob.com/#/customer/signup/startSignupWriteUserInfo?orderId=" + msg.orderId, user,callback);
}

//检测结果已出
function sendCheckSucceed(req, res) {
  console.log('------sendCheckSucceed------');
  let doctor;
  let order_no;
  let order_id = req.query.order_id;
  let open_id = req.query.open_id;
  if(!req.query.report_doctor)
    doctor = '无信息';
  else
    doctor = req.query.report_doctor;

  if(!req.query.order_no)
    order_no = '无信息';
  else
    order_no = req.query.order_no;

  console.log(doctor + '--' + order_no + '--' + open_id);
  if(open_id){
    let user = {"first": {
      "value":"您的检查结果已出",
      "color":"#000000"
    },"keyword1": {
      "value": order_no,
      "color":"#000000"
    },"keyword2": {
      "value": doctor,
      "color":"#000000"
    },"remark": {
      "value":"如需详细检测报告,请前往检测机构领取",
      "color":"#71a0d1"
    }};

    api.sendTemplate(open_id, "hW1uq28CAQ314JVcsgIJTvsTtqDxN7v0s-7ex6lJ-sE","http://jiankang.aisimob.com/#/customer/checkappoinmentresult/checkResult?order_id=" + order_id, user, function(err, result) {
        if(err){
          res.send('fail');
        }else{
          res.send('ok');
        }
    });

  }else{
    res.send('ok');
  }

}

function getJsConfig(req, res) {
  let paramurl;
  if(req.query.isIos === 'true'){
    paramurl = config.domain;
  }
  else{
    paramurl = config.domain + '/#' + req.query.urlname;
  }
  console.log('getJsConfigUrl');
  console.log(paramurl);
  let param = {
    debug: false,
    jsApiList: req.query.jsApiList,
    url: paramurl
  };
  api.getJsConfig(param, function(err, result) {
    console.log('------getJsConfig------');
    console.log(result);
    res.send(result);
  });

}
