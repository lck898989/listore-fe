require('./index.css');
var _listore = require('util/listore.js');
var nav = {
    /*
    初始化
    */
    init:function(){
        this.bindEvent();
        this.loadCartCount();
        this.loadUserInfo();
        //返回它的调用者：this指代该方法的实际调用者
        return this;
    },
    //绑定事件
    bindEvent:function(){
        //登录点击事件
        $('.js-login').click(function(){
            _listore.doLogin();
        });
    },
    //加载用户信息
    loadUserInfo:function(){

    },
    //加载购物车信息
    loadCartCount:function(){

    }
};
//这里先初始化然后返回init的调用者即nav本身:注意init()要加后面的括号（）
module.exports = nav.init();