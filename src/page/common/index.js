/*
* @Author: HP
* @Date:   2017-10-03 15:25:40
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-11 22:56:15
*/
require('./layout.css');
//引进font_awesome的css文件
require('node_modules/font-awesome/css/font-awesome.min.css');
require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
navSide.init({
    name:'user-center'
});