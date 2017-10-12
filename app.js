"use strict";
var express = require('express');
var app = express();
var db = require('./model/db.js');
var formidable = require('formidable');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
var controller = require(__dirname+'/controller/controller.js');
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.use(express.static(__dirname + '/public'));
app.use('/manage',express.static(__dirname + '/manage'));
app.use('/anli',express.static(__dirname + '/anli'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'linkued', //secret的值建议使用随机字符串
    cookie: {maxAge: 60 * 1000 * 30}, // 过期时间（毫秒）
    name: 'linkUedSessionId',
    resave: false,
    saveUninitialized: true,
}));
app.use('/',function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');
	next();
});
//获取文章get请求
app.get('/articles',controller.articles);
//获取详细文章页面的get请求
app.get('/detailArticle',controller.detailArticle);

//文章分类
app.get('/articleClasses',controller.articleClasses);

//上传编写的文章
app.post('/articles',controller.upLoadArticles);

//获取资源导航的菜单
app.get('/dhnav',controller.dhnav);

//获取资源导航的内容
app.get('/dhcontent',controller.dhcontent);

//添加资源导航的内容
app.post('/adddhcontent',controller.adddhcontent);

//获取案例的导航菜单
app.get('/anliNav',controller.anliNav);
//获取案例的导航菜单
app.get('/anliContent',controller.anliContent);

/*********UED 后台管理系统*************************************/
//后台管理平台登录
app.post('/login',controller.login);
//退出登录
app.post('/logout',controller.logout);
//验证是否已经登陆
app.post('/checklogin',controller.checklogin);
//上传文章vue-html-edit上传图片
app.post('/uploadPicEdit',controller.uploadPicEdit);
//心得文章管理的编辑文章模糊查询
app.post('/findarticlebylike',controller.findarticlebylike);
//心得文章管理的删除文章接口
app.post('/removeArticle',controller.removeArticle);
//心得文章管理的修改文章接口
app.post('/updateArticle',controller.updateArticle);
//插入资源导航内容接口
app.post('/addZy',controller.addZy);
//模糊查询资源导航内容
app.post('/getZyByLike',controller.getZyByLike);
//根据类别来获取资源导航案例
app.post('/getZyByClass',controller.getZyByClass);
//删除资源导航内容
app.post('/removeZyByUrl',controller.removeZyByUrl);
//修改资源导航内容
app.post('/editZyConfirm',controller.editZyConfirm);
/*********end UED 后台管理系统*************************************/



app.listen(3030, function () {
  console.log('Ready');
});

process.on('uncaughtException', function (err) {
  //打印出错误
  console.log(err);
  //打印出错误的调用栈方便调试
  console.log(err.stack);
});