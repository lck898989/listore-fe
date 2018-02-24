var _listore = require('util/listore.js');
var _product = {
    //产品列表方法
    list:function(listData,resolve,reject){
        _listore.request({
            url         : _listore.getServerUrl('/product/searchProduct'),
            data        : listData,
            success     : resolve,
            error       : reject
        });
    },
    getProductDetail : function(productId,resolve,reject){
        _listore.request({
            url          : _listore.getServerUrl('/product/productDetail'),
            data         : {
              productId:productId
            },
            success      : resolve,
            error        : reject
        })
       

    }
}
module.exports = _product;