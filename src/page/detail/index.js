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

            },
            bindEvent : function(){

            }
}
$(function(){
    page.init();
})