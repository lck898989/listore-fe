require('./index.css');
require('./index.css');
require('page/common/nav-simple/index.js');
var _listore = require('util/listore.js');
var navSide = require('page/common/nav-side/index.js');
//加载用户信息
var page = {
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        this.navSide.init();
        this.loadUserInfo();
    },
    loadUserInfo : function(){

    }
}