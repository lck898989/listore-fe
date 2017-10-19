/*
* @Author: HP
* @Date:   2017-10-03 09:34:06
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-19 20:55:32
*/
/*document.write('it works.')
//添加模块
document.write(require('./module.js'))
document.write('hello world')*/
//加载jquery模块
// var $$ = require('jquery');
require('./index.css');
var $ = require('jquery');
require('node_modules/font-awesome/css/font-awesome.min.css');
require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
navSide.init({
    name : 'user-center'
})
// var _listore = require('util/listore.js');
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
// console.log('参数是' + _listore.getUrlParam("test"));
// var html = '<div>{{test}}</div>';
// var data = {
//     test : function(){
//         return 6
//     }
// }
// console.log(_listore.renderHtml(html,data));



