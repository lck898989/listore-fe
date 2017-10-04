/*
* @Author: HP
* @Date:   2017-10-03 09:34:06
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-04 13:25:05
*/
/*document.write('it works.')
//添加模块
document.write(require('./module.js'))
document.write('hello world')*/
//加载jquery模块
var $$ = require('jquery');
require('../css/index.css');
require('../module.js');
console.log("test");
$$('body').html('hello javascript,hello java,c,c++,c#');


