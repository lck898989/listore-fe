require('./index.css');
require('page/common/nav-simple/index.js');
var _listore = require('util/listore.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/userService.js');
var templateIndex = require('./index.string');
//加载用户信息
var page = {
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        //初始化左侧边栏
        navSide.init({
            name    : 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        _user.getUserInfo(function(res){
            userHtml = _listore.renderHtml(templateIndex,res.data);
            $('.userInfo').html(userHtml);
        },function(errMsg){
           _listore.errorTips(errMsg);
        });
    }
}
$(function(){
    page.init();
})