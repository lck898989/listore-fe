/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-10-11 21:42:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-11 23:24:11
 */
require('./index.css');
var _listore = require('util/listore.js');
var templateIndex = require('./index.string');
//侧边导航
var navSide = {
          option:{
              name:'',
              navList:[
                  {name : 'order-list'    ,  desc:'我的订单'    ,href   : './order-list.html'},
                  {name : 'about-listore' ,  desc:'关于listore' ,href   : './about-listore.html'},
                  {name : 'user-center'   ,  desc:'个人中心'    , href    : './user-center.html'},
              ]
          },
          init:function(option){
              /*合并选项,将这里的option比如说是‘user-center’合并为
                name:'user-center',
              navList:[
                  {name : 'order-list'    ,  desc:'我的订单'    ,href   : './order-list.html'},
                  {name : 'about-listore' ,  desc:'关于listore' ,href   : './about-listore.html'},
                  {name : 'user-center'   ,  desc:'个人中心'    , href    : './user-center.html'},
              ]
              */
              $.extend(this.option,option);
              this.renderNav();
          },
          //渲染导航菜单
          renderNav:function(){
            //计算active数据
            for(var i = 0,iLength = this.option.navList.length;i < iLength;i++){
                //这里的this.option.name已经是‘user-center’了
                if(this.option.navList[i].name === this.option.name){
                    //如果相等的话在navlist数组中新增加一个元素isActive
                    this.option.navList[i].isActive = true;
                };
            }
            //渲染list数据
            var navHtml = _listore.renderHtml(templateIndex,{
                navList :this.option.navList
            });
            //把html放入容器
            $('.nav-side').html(navHtml);
            
          }
}
module.exports = navSide;