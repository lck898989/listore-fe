/*
* @Author: HP
* @Date:   2017-10-03 12:05:47
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-15 23:27:44
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
                    _this.data.question = res;
                    _this.loadStepQuestion();
               },function(err){
                formError.show(err);
               });
           }else{
               formError.show('用户名为空');
           }
        });
        
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

    },
   
};
$(function(){
    page.init();
})


