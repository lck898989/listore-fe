/*
* @Author: HP
* @Date:   2017-10-03 12:05:47
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-19 23:12:16
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
        $('#login').click(function(e){
            console.log(e.target.tagName + 'is clicked');
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
            username:$.trim($('#username').val()),
            password:$.trim($('#password').val()),
        };
        //表单验证
        validateResult = this.formValidate(formData);
        if(validateResult.status){
            //如果验证通过的话进行登录
            _user.login(formData,function(res){
                window.location.href = _listore.getUrlParam('redirect') || './index.html';
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
        }
        if(!_listore.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg    = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
})

