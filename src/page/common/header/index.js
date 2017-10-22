require('./index.css');
var _listore = require('util/listore.js');
var header = {
    init:function(){
        //绑定特定的事件
        this.bindEvent();
        this.onLoad();
    },
    //查看搜索栏中有没有值有的话填上
    onLoad:function(){
        var productName = _listore.getUrlParam('productName');
        //如果keyword存在，则回填输入框
        if(productName){
            $('#search-input').val(productName);
        };
    },
    bindEvent:function(){
        var _this = this;
        //点击搜索按钮后进行提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车的时候进行提交
        $('#search-input').keyup(function(e){
            //如果按下的是回车键就会调用提交方法
            if(e.keyCode === 13){
                _this.searchSubmit();
            }

        });
    },
    //搜索的提交
    searchSubmit:function(){
        var productName = $.trim($('#search-input').val());
        //如果提交的时候有keyword正常跳转list页
        if(productName){
            window.location.href = './list.html?productName=' + productName;
        }
        //如果keyword为空，直接返回首页
        else{
            _listore.goHome();
        }
    }
};
header.init();