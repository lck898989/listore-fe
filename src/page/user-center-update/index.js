require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/userService.js');
var _listore = require('util/listore.js');
var navSide = require('page/common/nav-side/index.js');
var templateHtml = require('./index.string');
//加载用户信息
var page = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        navSide.init();
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        _user.getUserInfo(function(res){
            //如果用户登录成功的话渲染html
            var userHtml = _listore.renderHtml(templateHtml,res.data);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _listore.errorTips(errMsg);
        })
    },
    bindEvent : function(){
        var _this = this;
        //事件冒泡,on事件代理
        $(document).on('click','.btn-submit',function(){
            
            //收集用户信息
            var userInfo = {
                phone       : $.trim($('#phone').val()),
                email       : $.trim($('#email').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val()),

            };
            validateResult = _this.validateResult(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo,function(res){
                    _listore.successTips(res.msg);
                    window.location.href = './user-center.html';

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
        if(!_listore.validate(formData.phone,'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        if(!_listore.validate(formData.email,'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        if(!_listore.validate(formData.question,'require')){
            result.msg = '提示问题不能为空';
            return result;
        }
        if(!_listore.validate(formData.answer,'require')){
            result.msg = '提示问题答案不能为空';
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