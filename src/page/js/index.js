/*
* @Author: HP
* @Date:   2017-10-03 09:34:06
* @Last Modified by:   HP
* @Last Modified time: 2017-10-03 15:57:26
*/
/*document.write('it works.')
//添加模块
document.write(require('./module.js'))
document.write('hello world')*/
//加载jquery模块
var m = require('jquery');
require('../css/index.css');
require('../module.js');
console.log("test");
m('body').html('hello or sdfasd!');
