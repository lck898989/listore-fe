/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-10-10 20:29:14 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-15 11:34:08
 */
require('./index.css');
var _listore = require('util/listore.js');
//引入服务工具
var _user = require('service/userService.js');
var _cart = require('service/cartService.js');

var nav = {
    /*
    初始化
    */
    init:function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        //返回它的调用者：this指代该方法的实际调用者
        return this;
    },
    //绑定事件
    bindEvent:function(){
        //登录点击事件
        $('.js-login').click(function(){
            _listore.doLogin();
        });
        $('.js-register').click(function(){
            _listore.register();
        });
        //退出点击事件
        $('.js-logout').click(function(){
            _user.logout(function(res){
                //如果退出成功的话刷新页面
                window.location.reload();
            },function(errMsg){
               _listore.errorTips(errMsg);
            });
        });
    },
    //加载用户信息
    loadUserInfo:function(){
        _user.checkLogin(function(res){
            //如果为登录状态的时候隐藏掉相关属性
            $('.user.not-login').hide().siblings('.user.login').show()
            .find('.username').text(res.username);
        },function(errMsg){
            
        });

    },
    //加载购物车信息
    loadCartCount:function(){
        //获得购物车中的商品数量
        _cart.getCartCount(function(res){
            //获取后端返回回来的信息进行更新浏览器中的内容
            $('.nav .cart-count').text(res || 0);
        },function(errMsg){
            //出错的话赋值为0
            $('.nav .cart-count').text(0);
        });
    }
};
//这里先初始化然后返回init的调用者即nav本身:注意init()要加后面的括号（）
module.exports = nav.init();