/**
 * Created by wensu on 2018/1/17.
 */
/**
var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'120.78.206.182',
    user:'mysqldev',
    password:'123456',
    database:'yuejiankang_test'
});

conn.connect();
conn.query('select * from user limit 1',function (error,results,fields) {
    if(error) throw error;
    console.log(results);

});

conn.end();
    **/

var db = (require('./mysql.js'));

console.log("sdf");
var obj = {};
/**/
db.select("select * from user limit 1",function (error) {

    for (var i in arguments[1]){
        obj[arguments[1][i].user_id] = arguments[1][i];
    }

    console.log.apply(this,arguments);
    db.weChatLog('user_id',JSON.stringify({obj:obj}));
});
 /**/
