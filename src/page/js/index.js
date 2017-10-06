/*
* @Author: HP
* @Date:   2017-10-03 09:34:06
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-06 23:46:12
*/
/*document.write('it works.')
//添加模块
document.write(require('./module.js'))
document.write('hello world')*/
//加载jquery模块
var $$ = require('jquery');
require('../css/index.css');
require('../module.js');
var _listore = require('util/listore.js');
// console.log("test");
// $$(".first").html('hello json');
// _listore.request({
//     url:'/product/searchProduct',
//     success:function(re){
//         console.log(re);
//     },
//     error:function(msg){
//         console.log(msg);

//     }
// });
console.log('参数是' + _listore.getUrlParam("test"));
var html = '<div>{{test}}</div>'
var data = {
    test : function(){
        return 6
    }
}
console.log(_listore.renderHtml(html,data));



