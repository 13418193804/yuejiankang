let wechat = require('wechat');
let config = require('../wechatconfig');
let os = require('./../os/');

let wechatapi = require('../wechatapi/wechatapi')

let handler = wechat(config.wechat, wechat.text(wechatText).image(wechatImg).location(wechatLocation)
    .event(wechatEvent));

module.exports = handler;

//处理关注和取消关注等事件
function wechatEvent(event, req, res, next) {
    console.log("event\n", event);
    switch (event.Event) {
        case 'subscribe':
            res.reply("感谢关注");
            break;
        case 'unsubscribe':
            res.reply('88~');
            break;
        case 'CLICK':
            res.reply("客服电话 400 162 1828");
            break;
        default:
            res.reply('');
    }
}

//处理图片
function wechatImg(image, req, res, next) {
    let obj = image
    let props = "";
    // 开始遍历
    for (let p in obj) {
        // 方法
        if (typeof(obj[p]) == "function") {
            obj[p]();
        } else {
            // p 为属性名称，obj[p]为对应属性的值
            props += p + "=" + obj[p] + "\t";
        }
    }
    console.log("input\n", props);
    res.reply(props);

}

//处理文字输入
function wechatText(message, req, res, next) {
    let input = (message.Content || '').trim();

    let numReg = /[0-9]*/;
    let num = numReg.exec(input)[0];
    let obj = message
    let props = "";
    // 开始遍历
    for (let p in obj) {
        // 方法
        if (typeof(obj[p]) == "function") {
            obj[p]();
        } else {
            // p 为属性名称，obj[p]为对应属性的值
            props += p + "=" + obj[p] + "\t";
        }
    }
    console.log("input\n", props);
    if (num === '1') {
        wechatapi.createMenu();
    } else if (num === '2') {

    } else if (num === '3') {

    } else {

    }
    res.reply(props);

}

//处理位置信息
function wechatLocation(location, req, res, next) {

}
