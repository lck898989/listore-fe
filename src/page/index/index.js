/*
* @Author: HP
* @Date:   2017-10-03 09:34:06
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-22 12:13:58
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
require('util/slider/index.js');
var _listore = require('util/listore.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
navSide.init({
    name : 'user-center'
})
$(function() {
    var bannerHtml = _listore.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    var slider = $('.banner').unslider({
        speed: 500,               //  The speed to animate each slide (in milliseconds)
        delay: 3000,              //  The delay between slide animations (in milliseconds)
        complete: function() {},  //  A function that gets called after every slide animation
        keys: true,               //  Enable keyboard (left, right) arrow shortcuts
        dots: true,               //  Display dot navigation
        fluid: false              //  Support responsive design. May break non-responsive designs
    });
    //前一页后一页点击事件
    $('.banner-con .banner .arrow').click(function(){
        //获取方向
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        /*
            var forward = this.className().split(' ')[1];
        */
        slider.data('unslider')[forward]();
    });
});
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



