/*
* @Author: HP
* @Date:   2017-10-03 12:05:47
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-17 21:46:33
*/
/*
重设密码逻辑
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
    //找回密码需要用到的数据
    data:{
        username    : '',
        question    : '',
        answer      : '',
        token       : '',
        newPassword : ''
    },
    init:function(){
        //显示第一步输入用户名的操作
        this.onLoad();
        this.bindEvent();
    },
    onLoad   : function(){
        this.loadStepUsername();
    },
    //绑定事件
    bindEvent:function(){
        _this = this;
        $('#submit-username').click(function(){
           //当提交用户名的时候进行逻辑处理把用户名接收过来
           var username = $.trim($('#username').val());
           if(username){
               //如果用户名不为空的话
               _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res.msg;
                    _this.loadStepQuestion();
               },function(err){
                formError.show(err);
               });
           }else{
               formError.show('用户名为空');
           }
        });
        //输入问题提示答案之后单击下一步
        $('#submit-question').click(function(){
            //当提交问题答案的时候进行逻辑处理把提交问题答案接收过来
            var answer = $.trim($('#answer').val());
            if(answer){
                //如果用户名不为空的话:这时候useranme ,question ,answer都有了
                _this.data.answer = answer;
                var userInfo = _this.data
                _user.checkAnswer(userInfo,function(res){
                     //如果密码验证通过的话下一步是存储token值
                     _this.data.token = res.data;
                     //然后加载输入新密码的页面
                     _this.loadStepPassword();
                },function(err){
                 formError.show(err);
                });
            }else{
                formError.show('问题提示答案为空');
            }
         });
         //输入新密码之后单击下一步
         $('#submit-password').click(function(){
            //提取当前输入的新密码值
            var newPassword = $.trim($('#newPassword').val());
            if(newPassword){
                _this.data.newPassword = newPassword;
                var userInfo = _this.data;
                //跟新密码
                _user.resetPassword(userInfo,function(res){
                        //如果更新密码成功的话,返回结果页面
                        window.location.href = './result.html?type=resetPassword';
                },function(err){

                });
            }else{
                formError.show('新密码为空');
            }
         });
         //当点击返回登录按钮时候
         $('.return-login').click(function(){
             _listore.doLogin();
         })
    },
    //加载第一步的操作获取用户名
    loadStepUsername:function(){
        $('.step-username').show();
    },
    //加载第二步的操作加载问题提示答案
    loadStepQuestion:function(){
        //隐藏上一步错误信息
        formError.hide();
        //隐藏上一步的页面加载第二步的页面将question显示出来
        $('.step-username').hide().siblings('.step-question')
                           .show().find('.question')
                           .text(this.data.question);
    },
    //加载第三步的输入新密码
    loadStepPassword:function(){
        formError.hide();
        $('.step-question').hide().siblings('.step-password')
                           .show();
    },
   
};
$(function(){
    page.init();
})


