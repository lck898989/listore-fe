require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/userService.js');
var _listore = require('util/listore.js');
var navSide = require('page/common/nav-side/index.js');
//加载用户信息
var page = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        navSide.init({
            name : 'user-passwordUpdate'
        });
    },
    bindEvent : function(){
        var _this = this;
        //事件冒泡,on事件代理任何点击都会冒泡到document对象上委托document进行处理
        $(document).on('click','.btn-submit',function(){
            
            //收集用户信息
            var passwordInfo = {
                passwordOld        : $.trim($('#oldPass').val()),
                passwordNew        : $.trim($('#newPass').val()),
                passwordConfirm    : $.trim($('#newPassConf').val()),
            };
            validateResult = _this.validateResult(passwordInfo);
            if(validateResult.status){
                _user.updatePassword(passwordInfo,function(res){
                    _listore.successTips(res.msg);
                    window.location.href = './result.html?type=resetPassword';
                },function(err){
                    _listore.errorTips(err);
                });
            }else{
                _listore.errorTips(validateResult.msg);
            }

        });
    },
    validateResult:function(formData){
        var result = {
            status:false,
            msg   :''
        };
        //验证原密码是否为空
        if(!_listore.validate(formData.passwordOld,'require')){
            result.msg = '旧密码不能为空';
            return result;
        }
        //验证新密码是否为空
        if(!_listore.validate(formData.passwordNew,'require')){
            result.msg = '新密码不能为空';
            return result;
        }
        //验证新密码的长度是否大于6
        if(formData.passwordNew.length < 6){
            result.msg = '密码的长度不能小于六位';
            return result;
        }
        //验证确认密码是否和新密码相同
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        result.status = true;
        result.msg    = '验证通过';
        return result;
    }
}
$(function(){
    page.init();
})