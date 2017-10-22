require('./index.css');
var templateHtml = require('./index.string');
var _listore         = require('util/listore.js');
var _productService  = require('service/productService'); 
var page = {
      data : {
        listParam : {
          productName : _listore.getUrlParam('productName') || '',
          categoryId  : _listore.getUrlParam('categoryId')  || '',
          pageNum     : _listore.getUrlParam('pageNum')     || 1,
          pageSize    : _listore.getUrlParam('pageSize')    || 10,
          orderBy     : _listore.getUrlParam('orderBy')     || 'asc',
        }
      },
      //默认是升序排序的
      init : function(){
        //绑定事件选择升序还是降序
        this.bindEvent();
        //加载信息输入的参数信息如：list.html?categoryId=1313或者list.html?productName=ssad
        this.onLoad();
      },
      onLoad : function(){
        var productListHtml = '',
            self            = this,
            listParam       = this.data.listParam;
        _productService.list(listParam,function(res){
            // alert(res.data.list[1].name);
            productListHtml = _listore.renderHtml(templateHtml,{
                        list : res.list  
            });
            //渲染list
            $('.list-con').html(productListHtml);
            //加载分页信息
            self.loadPageInfo(res.data.pageNum,res.data.pageSize);
        },function(err){
           _listore.errorTips(err);
        });
      },
      bindEvent : function(){

      },
      //加载分页信息
      loadPageInfo : function(pageNum,pageSize){
        
      }
};
$(function(){
    page.init();
})