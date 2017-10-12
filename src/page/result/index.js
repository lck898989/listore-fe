require('./index.css');
require('page/common/nav-simple/index.js');
var _listore = require('util/listore.js');

$(function(){
    var type = _listore.getUrlParam('type');
    $element = $('.' + type + '-success');
    $element.show();
})