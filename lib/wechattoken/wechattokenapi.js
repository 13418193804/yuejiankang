var crypto = require('crypto');
var config = require("../wechatconfig");
//var WXBizMsgCrypt = require('wechat-crypto');
var url = require('url');

// var WechatJssdk = require('wechat-jssdk');
// var configjssdk = require("./config/wechatjssdkconfig");
// const wxjs = new WechatJssdk(configjssdk);

// routes
exports.checkWeiXinToken = checkWeiXinToken;
//exports.checkWeiXinTokenTwo = checkWeiXinTokenTwo;
//exports.getSignature = getSignature;

// function getSignature(req, res) {
//     wxjs.jssdk.getSignature(req.url).then(function(signatureDate) {
//         res.json(signatureDate);
//     });
// }

//有bug
// function checkWeiXinTokenTwo(req, res) {
//     console.log(req.query);
//     if (wxjs.jssdk.verifySignature(req.query)) {
//         res.send(req.query.echostr);
//         return;
//     }
//     res.send("error");
// }

// function checkWeiXinToken(req, res) {
//     var reqObj = url.parse(req.url, true);
//     var params = reqObj['query'];
//     var signature = params['signature'];
//     var timestamp = params['timestamp'];
//     var nonce = params['nonce'];
//     var verifyEchostr = params['echostr'];
//     console.log(config.wechat.token);
//     console.log(config.wechat.encodingAESKey);
//     console.log(config.wechat.appID);
//     var cryptor = new WXBizMsgCrypt(config.wechat.token, config.wechat.encodingAESKey, config.wechat.appID);
//     var result = cryptor.decrypt(verifyEchostr);
//     console.log(result.message);
//     res.send(result.message);
// }

function sha1(str){
    var md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
  }
  
  function checkWeiXinToken(req,res){
    var query = url.parse(req.url,true).query;
    //console.log("*** URL:" + req.url);
    //console.log(query);
    var signature = query.signature;
    var echostr = query.echostr;
    var timestamp = query['timestamp'];
    var nonce = query.nonce;
    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = config.wechat.token;//这里是你在微信开发者中心页面里填的token，而不是****
    oriArray.sort();
    var original = oriArray.join('');
    console.log("Original str : " + original);
    console.log("Signature : " + signature );
    var scyptoString = sha1(original);
    if(signature == scyptoString){
      res.end(echostr);
      console.log("Confirm and send echo back");
    }else {
      res.end("false");
      console.log("Failed!");
    }
  }
  
