require('./index.css');
var templatePageInfo = require('./index.string');
var _listore = require('util/listore.js');
/*
js创建类的方式：通过定义一个函数来定义一个类
*/
var PageInfo = function(){
       var _this = this;
       //添加类变量
       this.defaultOption = {
           container    : null,
           pageNum      : 1,
           pageRange    : 3,
           onSelectPage : null
       };
       /*
          先是new的对象不能用事件绑定：先new该对象,然后加载html
          如果是事件绑定，先new对象然后绑定到html上是没有效果的
       */
       //绑定点击事件:jQuery.data()既可以放数据也可以取数据
    //    $('.page-item').click(function(){
    //        alert('asd');
    //        var $this = $(this);
    //        //如果绑定的时间是active or disabled,response none
    //        if($this.hasClass('active') || $this.hasClass('disabled')){
    //            return;
    //        }
    //        typeof this.option.onSelectPage === 'function' 
    //        ? _this.option.onSelectPage($this.data('value')) : null;

    //    });
       /*
       它是为整个html文档绑定事件而不是为某个元素绑定事件
       */
       $(document).on('click', '.page-item',function(){
        var $this = $(this);
        //如果绑定的时间是active or disabled,response none
        if($this.hasClass('active') || $this.hasClass('disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function' 
        ? _this.option.onSelectPage($this.data('name')) : null;

    });
}
//添加类方法，这里使用prototype原型方法那么这个类的所有对象
//都会继承这个方法
//渲染分页组件
PageInfo.prototype.render = function(userOption){
    //合并选项
    this.option = $.extend({},this.defaultOption,userOption);
    //判断容器是否为合法的jQuery对象
    if(!this.option.container instanceof jQuery){
        return;
    }
    //判断是否为一页
    // if(this.option.pages <= 1){
    //     return;
    // }
    //渲染分页内容
    this.option.container.html(this.getPageInfoHtml());
};
//获取分页信息
PageInfo.prototype.getPageInfoHtml = function(){
    var html    = '',
     option     = this.option,
     pageArray  = [],
     start      = option.pageNum - option.pageRange > 0
                ? option.pageNum - option.pageRange : 1,
     end        = option.pageNum + option.pageRange > option.pages
                ? option.pages : option.pageNum + option.pageRange;
     //上一页按钮的处理:次数组是对象数组：三项信息：
     /*
      名字
      值
      是否可用
     */
     pageArray.push({
         name       : '上一页',
         value      : this.option.prePage,
         disabled   : !this.option.hasPreviousPage,
     });
     //数字按钮的处理
     for(var i = start;i <= end;i++){
        pageArray.push({
            name        : i,
            value       : i,
            active      : i === option.pageNum,
        });
     };
      //上一页按钮的处理
      pageArray.push({
        name        : '下一页',
        value       : this.option.nextPage,
        disabled    : !this.option.hasNextPage,
    });
    html = _listore.renderHtml(templatePageInfo,{
        pageArray       : pageArray,
        pageNum         : option.pageNum,
        pages           : option.pages
    });
    return html;
};
module.exports = PageInfo;