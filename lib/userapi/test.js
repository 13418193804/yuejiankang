/**
 * Created by wensu on 2018/1/18.
 */
let _WeChat = require('wechat');
let config = require('../wechatconfig');

const weChat = new _WeChat(config.wechat.appid,config.secret);

const User = weChat.User;
const user = new User(weChat);

user.getInfo('oA-yljj5cBGSvnwFodHT1iqis7X8').then((data)=>{
    console.log(data);
}).catch((e)=>{
    console.error(e.message,e.code);
});