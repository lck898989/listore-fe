/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-10-10 20:29:30 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-15 22:49:29
 */
var _listore = require('util/listore.js');
var _user = {
    //用户登录方法
    login:function(userInfo,resolve,reject){
        _listore.request({
            url         : _listore.getServerUrl('/user/login'),
            data        : userInfo,
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //退出:虽然函数里面没有参数但是调用的时候可以传递参数
    logout:function(resolve,reject){
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
            url         : _listore.getServerUrl('/user/get_User_Info'),
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //检查用户是否存在
    checkUsername:function(username,resolve,reject){
        _listore.request({
            url         : _listore.getServerUrl('/user/checkValid'),
            data        : {
                type    : 'username',
                str     : username
            },
            method      : 'POST',
            success     : resolve, 
            error       : reject
        });
    },
    //用户注册
    register:function(formaData,resolve,reject){
        _listore.request({
            url         : _listore.getServerUrl('/user/register'),
            data        : formaData,
            method      : 'POST',
            success     : resolve,
            error       : reject
        });
    },
    //获得密码提示问题
    getQuestion(username,resolve,reject){
        _listore.request({
            url         : _listore.getServerUrl('/user/forget_get_question'),
            data        : {
              username  : username     
            },
            method      : 'POST',
            success     : resolve,
            error       : reject
        });

    }
}
module.exports = _user;