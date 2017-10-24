require('./index.css');
var templateHtml     = require('./index.string');
var _listore         = require('util/listore.js');
var _cartService     = require('service/cartService.js'); 
var page = {
            data : {
                productId : _listore.getUrlParam('productId') || '',
            },
            init : function(){
                this.onLoad();
                this.bindEvent();
            },
            onLoad : function(){
                //如果没有productId的话跳回到首页
                if(!this.data.productId){
                    _listore.goHome();
                }
                this.loadDetail();

            },
            bindEvent : function(){

            },
            loadDetail : function(){

            },

}
$(function(){
    page.init();
})