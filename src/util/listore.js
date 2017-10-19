/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-10-06 10:50:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-19 19:18:02
 */
var conf = {
    serverHost : ''
}
var hogan = require('hogan');
var listore = {
    request:function(param){
        console.log("param is " + param);
        var _this = this;
         $.ajax({
            type        : param.method || 'get',
            url         : param.url    || '',
            dataType    : param.type   || 'json',
            data        : param.data   || '',
            success     : function(res){
                //在后端接口返回的状态值
                if( 0 === res.status){
                    typeof param.success === 'function' && param.success(res);
                }else if(10 === res.status){
                    //没有登录状态需要强制登录
                //   _this.goHome();
                }else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }

            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
         });
    },
    //获取接口的URL,服务器地址
    getServerUrl:function(path){
          return conf.serverHost + path;
    },
    //获取URL的参数
    getUrlParam :function(name){
      //listore.top/product/list?keyword=hello&pageNum=1
      //正则表达式匹配
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      //匹配结果如果有结果的话返回一个数组，如果没有匹配到的话返回null
      //这里substr(1)是将？去掉
      console.log('reg is ' + reg);
      var result = window.location.search.substr(1).match(reg);
    //   console.log('the length of result is ' + result.length);
    //   //第一个存储者这个数组的全部内容
    //   console.log('result[0] is ' + result[0]);
    //   //第二个存储的是在正则表达式出现的第一个括号的内容
    //   console.log('result[1] is' + result[1]);
    //   console.log('result[2] is' + result[2]);
    //   console.log('result[3] is' + result[3]);
    //   console.log('result is ' + result);
    //   console.log('result ? decodeURIComponent(result[2]):null is ' + result ? decodeURIComponent(result[2]):null);
      return result ? decodeURIComponent(result[2]):null;
    },
    //渲染HTML模板文件
    renderHtml:function(htmlTemplate,data){
         var template = hogan.compile(htmlTemplate);
         var result = template.render(data);
         return result;
    },
    //成功提示
    successTips:function(msg){
         alert(msg || '操作成功');
    },
    errorTips: function(msg){
        alert(msg || '出错了');
    },
    //字段的验证:支持非空，手机，邮箱的验证
    validate:function(value,type){
        var value = $.trim(value);
        //非空验证
        if('require' ===  type){
            //!!强制返回boolean
            return !!value;
        }
        //手机号验证
        if('phone' === type){
            //以1开头后面十位数字结尾//里面是正则表达式
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email' === type){
            return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value);
        }
    },
    //调到登录页然后在返回到本页：统一登录处理
    doLogin : function(){
        //用encodeURIComponet防止特殊字符截断的情况对其进行编码
        //跳到登录页面
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
        
    },
    //注册功能方法
    register:function(){
        window.location.href = './user-register.html';
    },
    //跳转到主页
    goHome : function(){
        //用encodeURIComponet防止特殊字符截断的情况对其进行编码
        window.location.href = './index.html'; 
    }
}
module.exports = listore;