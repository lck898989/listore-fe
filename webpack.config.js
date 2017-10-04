/*
* @Author: HP
* @Date:   2017-10-03 17:52:29
* @Last Modified by:   HP
* @Last Modified time: 2017-10-04 12:53:03
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//引入html的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
/*
（第三种引入jquery的方法）
var providePlugin = new webpack.ProvidePlugin({
	$:'jquery',
	jQuery:'jquery',
	'window.jQuery':'jquery',
	'window.$':'jquery',
});*/
var config = {
	 //入口
      entry:{
      	    'index':['./src/page/js/index.js'],
      	    'login':['./src/page/js/login.js'],
      	    'common':['./src/page/common/index.js']
      },
      output:{
      	    path:'./dist',
      	    filename:'js/[name].js'
      },
      externals:{
      	//引入jquery的最佳方法（第二种引入js的方法）
      	'jquery':'window.jQuery'

      },
      module:{
      	loaders:[
                 {
                 	test:/\.css$/,
                 	loader:ExtractTextPlugin.extract("style-loader","css-loader")
                 },
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
			 //html模板的处理
               new HtmlWebpackPlugin({
					      title: 'My App',
					      filename: 'assets/admin.html'
					    })
      ]

};
module.exports=config;