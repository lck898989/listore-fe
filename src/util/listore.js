/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-10-06 10:50:27 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-06 23:36:23
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
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }else if(10 === res.status){
                    //没有登录状态需要强制登录
                  _this.doLogin();
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
      console.log('the length of result is ' + result.length);
      //第一个存储者这个数组的全部内容
      console.log('result[0] is ' + result[0]);
      //第二个存储的是在正则表达式出现的第一个括号的内容
      console.log('result[1] is' + result[1]);
      console.log('result[2] is' + result[2]);
      console.log('result[3] is' + result[3]);
      console.log('result is ' + result);
      console.log('result ? decodeURIComponent(result[2]):null is ' + result ? decodeURIComponent(result[2]):null);
      return result ? decodeURIComponent(result[2]):null;
    },
    //渲染HTML文件
    renderHtml:function(htmlTemplate,data){
         var template = hogan.compile(htmlTemplate);
         var result = template.render(data);
         return result;
    },
    //调到登录页然后在返回到本页：统一登录处理
    doLogin : function(){
        //用encodeURIComponet防止特殊字符截断的情况对其进行编码
        window.location.href = '../view/login.html?redirect=' + encodeURIComponent(window.location.href);
        
    }
}
module.exports = listore;