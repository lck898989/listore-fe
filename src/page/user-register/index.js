/*
* @Author: HP
* @Date:   2017-10-03 12:05:47
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-14 09:32:13
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _listore = require('util/listore.js');
var _user = require('service/userService.js');
//表单里的错误提示
var formError = {
    //使错误信息显示
    show : function(errMsg){
        $('.error-item').show().find('.error-msg').text(errMsg);
    },
    //是错误信息隐藏
    hide :function(){
        $('.error-item').hide().find('.error-msg').text('');
    }
}
//page逻辑部分
var page = {
    init:function(){
        this.bindEvent();
    },
    //绑定事件
    bindEvent:function(){
        _this = this;
                //当鼠标离开输入框时候触发
                $('#username').blur(function(){
                    var username = $.trim($(this).val());
                    //如果用户名为空的话不做验证
                    if(!username){
                        return;
                    }
                    //异步验证用户名是否存在
                    _user.checkUsername(username,function(res){
                        //成功的话错误框不显示
                        formError.hide();
                    },function(errorMsg){
                        //验证不通过显示错误框
                        formError.show(errorMsg);
                    });
                });
        $('#register').click(function(){
           _this.submit();
        });
        //如果按下回车也进行提交操作
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    //提交表单
    submit:function(){
        var formData = {
            username         : $.trim($('#username').val()),
            password         : $.trim($('#password').val()),
            password_confirm : $.trim($('#password-confirm').val()),
            phone            : $.trim($('#phone').val()),
            email            : $.trim($('#email').val()),
            question         : $.trim($('#question').val()),
            answer           : $.trim($('#answer').val()),
        };
        //表单验证
        validateResult = this.formValidate(formData);
        if(validateResult.status){
            //如果验证通过的话进行登录
            _user.register(formData,function(res){
                window.location.href = './result.html?type=register';
            },function(errMsg){
                formError.show(errMsg);
            });
        }else{
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    formValidate:function(formData){
        var result = {
            status:false,
            msg   :''
        };
        if(!_listore.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        };
        if(!_listore.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        };
        //判断密码长度
        if(formData.password.length < 6){
            result.msg = '密码长度不小于6位';
            return result;
        };
        if(!_listore.validate(formData.password_confirm,'require')){
            result.msg = '确认密码不能为空';
            return result;
        };
        //判断两次输入的密码是否一致
        if(!(formData.password === formData.password_confirm)){
            result.msg = '两次输入密码不一致';
            return result;
        };
        if(!_listore.validate(formData.phone,'phone')){
            result.msg = '手机号格式不正确';
            return result;
        };
        if(!_listore.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确';
            return result;
        };
        if(!_listore.validate(formData.question,'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        };
        if(!_listore.validate(formData.answer,'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        };
        result.status = true;
        result.msg    = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
})

