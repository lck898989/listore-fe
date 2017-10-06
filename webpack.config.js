/*
* @Author: HP
* @Date:   2017-10-03 17:52:29
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-10-06 11:28:32
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//引入html的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
//获得各个页面的模板文件html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
	return {
		template : './src/view/' + name + '.html',
		filename : 'view/' + name + '.html',
		inject   : true,
		hash     : true,//缓存的有效信息
		chunks   : ['common',name]
	};
}
//获取环境变量 dev  / online 
var WEBPACK_ENV  = process.env.WEBPACK_ENV || 'dev';
console.log(process.env.WEBPACK_ENV);
console.log(WEBPACK_ENV);
/*
（第三种引入jquery的方法）
var providePlugin = new webpack.ProvidePlugin({
	$:'jquery',
	jQuery:'jquery',
	'window.jQuery':'jquery',
	'window.$':'jquery',
});*/
//webpack config
var config = {
	 //入口
      entry:{
      	    'index':['./src/page/js/index.js'],
      	    'login':['./src/page/js/login.js'],
      	    'common':['./src/page/common/index.js']
	  },
	  //输出文件路径
      output:{
		      //存放文件的路径
			  path:'./dist',
			  //访问文件的路径
			  publicPath:'/dist',
      	    filename:'js/[name].js'
	  },
      externals:{
      	//引入jquery的最佳方法（第二种引入js的方法）
      	'jquery':'window.jQuery'

	  },
	  resolve:{
		alias:{
			util 	: __dirname + '/src/util',
			images	: __dirname + '/src/images',
			page 	: __dirname + '/src/page',
			service : __dirname + '/src/service',
			view  	: __dirname + '/src/view',
		}
	  },
      module:{
      	loaders:[
			    //处理css的加载器
                 {
                 	test:/\.css$/,
                 	loader:ExtractTextPlugin.extract("style-loader","css-loader")
				 },
				 //处理图片的加载器
				 {
					//\??表示匹配0个或者1个？,\?*匹配0个或者多个?，\?+匹配一个或者多个?
					 test:/\.(jpg|png|gif|jpeg|woff|svg|eot|ttf)\??.*$/,
					 loader:'url-loader?limit=100&name=resource/[name].[ext]'
				 }
                /* 
                (第三种引入jquery的方法)
                {
                 	test:require.resolve('jquery'), //此loader配置项的目标是NPM中的jquery
                 	loader:'expose?$!expose?jQuery',//先把jQuery对象声明成为全局变量‘jQuery’,再通过管理进一步声明为全局变量‘$’
                 }*/
      	]
      },
      plugins:[
              //找到文件中的共有的一些东西独立通用模块
              new webpack.optimize.CommonsChunkPlugin({
              	//找到entry中的common将其打包到js/base.js
              	name:'common',
              	filename:'js/base.js'
              }),
              //提取css文件
              new ExtractTextPlugin('css/[name].css'),
              /*new webpack.ProvidePlugin({
									        '$$': 'jquery'
									    }),*/ 
			  //html模板的处理，script插入的位置和html生成的目录位置
			   new HtmlWebpackPlugin(getHtmlConfig('index')),
			   new HtmlWebpackPlugin(getHtmlConfig('login'))
      ]

};
module.exports=config;
//如果是开发模式的话在common模块中添加后面的值
if(WEBPACK_ENV === 'dev'){
	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}