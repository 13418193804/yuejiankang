/**
 * Created by wensu on 2018/1/17.
 */

var EasyMysql = require('easy-mysql');
var conn = EasyMysql.connect({
    host:'120.78.206.182',
    user:'mysqldev',
    password:'123456',
    database:'yuejiankang'
});

module.exports = {
    find(){
        conn.get_one.apply(conn,arguments);
        return this;
    },
    select(){
        conn.get_all.apply(conn,arguments);
        return this;
    },
    execute(){
        conn.execute.apply(conn,arguments);
        return this;
    },
    weChatLog(openid,content,type){
        var params = [openid,content,type];
        return this.select("insert into `wechat_log`(openid,content,type) values(?,?,?);",params,function (error,result) {
            console.log(arguments)
        });
    }
};
