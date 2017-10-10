/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-10-10 20:29:30 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-10 22:29:34
 */
var _listore = require('util/listore.js');
var _user = {
    //退出:虽然函数里面没有参数但是调用的时候可以传递参数
    logout:function(){
        _listore.request({
            url         : _listore.getServerUrl('/user/logout'),
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //检查登录状态
    checkLogin:function(resolve,reject){
        _listore.request({
            url         : _listore.getServerUrl('/user/getUserInfo'),
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    }
}
module.exports = _user;