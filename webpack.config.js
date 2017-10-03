/*
* @Author: HP
* @Date:   2017-10-03 17:52:29
* @Last Modified by:   HP
* @Last Modified time: 2017-10-03 21:53:09
*/
var webpack = require('webpack');
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
      	'jquery':'window.jQuery'

      },
      module:{
      	loaders:[
                 {
                 	test:/\.css$/,
                 	loader:'style-loader!css-loader'
                 }
      	]
      },
      plugins:[
              //找到文件中的共有的一些东西
              new webpack.optimize.CommonsChunkPlugin({
              	//找到entry中的common将其打包到js/base.js
              	name:'common',
              	filename:'js/base.js'
              })
              /*new ExtractTextPlugin('css/[name].css'),*/
      ]

};
module.exports=config;