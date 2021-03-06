'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _listore        = require('util/listore.js');
var _product        = require('service/productService.js');
var _cart           = require('service/cartService.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        productId : _listore.getUrlParam('productId') || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 如果没有传productId, 自动跳回首页
        if(!this.data.productId){
            _listore.goHome();
        }
        this.loadDetail();
        alert("onLoad method is running")
    },
    bindEvent : function(){
        var _this = this;
        // 图片预览
        $(document).on('mouseenter', '.p-img-item', function(){
            var imageUrl   = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imageUrl);
        });
        // count的操作
        $(document).on('click', '.p-count-btn', function(){
            var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $('.p-count'),
                //将输入框中的数字内容取出来
                currCount = parseInt($pCount.val()),
                //商品数量最小值
                minCount    = 1,
                //商品数量的最大值
                maxCount    = _this.data.detailInfo.stock || 1;
            if(type === 'plus'){
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            }
            else if(type === 'minus'){
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        // 加入购物车
        $(document).on('click', '.cart-add', function(){
            _cart.addToCart({
                productId   : _this.data.productId,
                count       : $('.p-count').val()
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _listore.errorTips(errMsg);
            });
        });
    },
    // 加载商品详情的数据
    loadDetail : function(){
        alert("enter the method loadDetail")
        var _this       = this,
            html        = '',
            //获取到div容器信息
            $pageWrap   = $('.page-wrap');
            console.log("pageWrap is " + $pageWrap);
        // loading
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res);
            // 缓存住detail的数据
            _this.data.detailInfo = res;
            // render
            html = _listore.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function(errMsg){
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
        });
    },
    // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
$(function(){
    page.init();
})