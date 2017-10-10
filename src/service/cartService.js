/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-10-10 22:41:19 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-10 22:49:33
 */
var _listore = require('util/listore.js');
var cart = {
    //获取购物车中的数量
    getCartCount:function(resolve,reject){
        _listore.request({
            url         : _listore.getServerUrl('/cart/getProudctCountInCart'),
            success     : resolve,
            error       : reject
        });
    }
}
module.exports = cart;