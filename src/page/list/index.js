require('./index.css');
var templateHtml = require('./index.string');
var _listore         = require('util/listore.js');
var _productService  = require('service/productService.js'); 
var PageInfo         = require('util/pageInfo/index.js'); 
var page = {
      data : {
        listParam : {
          productName : _listore.getUrlParam('productName') || '',
          categoryId  : _listore.getUrlParam('categoryId')  || '',
          pageNum     : _listore.getUrlParam('pageNum')     || 1,
          pageSize    : _listore.getUrlParam('pageSize')    || 1,
          orderBy     : _listore.getUrlParam('orderBy')     || 'price_asc',
        }
      },
      //默认是升序排序的
      init : function(){
       
        //加载信息输入的参数信息如：list.html?categoryId=1313或者list.html?productName=ssad
        this.onLoad();
         //绑定事件选择升序还是降序
         this.bindEvent();
      },
      onLoad : function(){
        this.loadProductList();
      },
      bindEvent : function(){
        var _this = this;
        $('.sort-item').click(function(){
        var $this = $(this);
          //点击默认排序时候的事件
         if($this.hasClass('default-sort')){
              /*
                如果当前点击的元素是激活的不让点击
              */
              if($this.hasClass('active')){
                return;
              }
              else{
                  //如果当前点击的元素不是激活的状态的话将其置为激活状态，并且将其他兄弟元素干掉
                  $this.addClass('active')
                       .siblings('.sort-item')
                       .removeClass('active asc desc');
                  //这时候为默认排序
                  _this.data.listParam.orderBy = "price_asc";
  
              }
            
         }
         //点击价格排序时候的事件
         else if($this.hasClass('price-sort')){
                  $this.addClass('active')
                      .siblings('.sort-item')
                      .removeClass('active asc desc');
                  //判断是升序还是降序
                  if(!$this.hasClass('asc')){
                      $this.addClass('asc').removeClass('desc');
                      _this.data.listParam.orderBy = 'price_asc';
                  }else{
                    $this.addClass('desc').removeClass('asc');
                    _this.data.listParam.orderBy = 'price_desc';
                  }
               }
              //  alert( _this.data.listParam.orderBy);
               //重新加载页面必须在点击事件里面
               _this.loadProductList();
        });
      
      },
      //加载商品列表信息
      loadProductList : function(){
                var productListHtml     = '',
                    self                = this,
                    listParam           = this.data.listParam,
                    $listCon            = $('.list-con');
                //删除多余的参数加入传进来的是categoryId而不是productName需要把productName删除掉
                listParam.categoryId ? delete listParam.productName : delete listParam.categoryId
                //刷新页面的时候用到的加载图标
                $listCon.html('<div class="loading"></div>');
                _productService.list(listParam,function(res){
                // alert(res.data.list[1].name);
                productListHtml = _listore.renderHtml(templateHtml,{
                            list : res.data.list  
                });
                //渲染list
                $listCon.html(productListHtml);
                //加载分页信息
                self.loadPageInfo({
                  hasNextPage     : res.data.hasNextPage,
                  prePage         : res.data.prePage,
                  hasPreviousPage : res.data.hasPreviousPage,
                  nextPage        : res.data.nextPage,
                  pageNum         : res.data.pageNum,
                  pageSize        : res.data.pageSize,
                  pages           : res.data.pages
                });
            },function(err){
              _listore.errorTips(err);
            });
      },
      //加载分页信息:组成组件的两种方式：类和对象两种方式
      loadPageInfo : function(pagecon){
         var _this = this; 
         this.pageInfo ? '' : (this.pageInfo= new PageInfo());
         this.pageInfo.render($.extend({},pagecon,{
              //定义一个jQuery容器
              container:$('.pageInformation-con'),
              //定义一个选中的页的方法
              onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadProductList();
              }
         }));

      }
};
$(function(){
    page.init();
})