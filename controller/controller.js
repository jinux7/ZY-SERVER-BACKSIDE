var db = require(__dirname+'/../model/db.js');
var formidable = require('formidable');
var bodyParser = require('body-parser');

//获取文章get请求
exports.articles = function(req,res){
		var articleNum = parseInt(req.query.articleNum);
		var selectValue = req.query.selectValue;
		var findObj = {};
		if(selectValue){
			findObj = {'selectValue':selectValue};
		}
		db.getDataByNum('articles',findObj,articleNum,function(result){
			res.send(result);
		});
}
//获取详细文章页面的get请求
exports.detailArticle = function(req,res){
		var creatTime = req.query.creatTime;
		db.getDatas('articles',{"creatTime":creatTime},function(result){
			res.send(result);
		});
	}
//文章分类
exports.articleClasses = function(req,res){
		db.getDatas('articleNav',null,function(result){
			res.send(result[0].data);
		})
	}
//上传编写的文章
exports.upLoadArticles = function(req,res){
		var form = new formidable.IncomingForm();
		form.uploadDir = __dirname+"/../public/pictures";
		form.keepExtensions = true;
		form.parse(req, function(err, fields, files,next){
			var pn = files.picture.path.split('pictures')[1].substring(1);
			db.insertone('articles',{"title":fields.title,"selectValue":fields.selectValue,"articleBody":fields.articleBody,"description":fields.description,"creatTime":fields.creatTime,"url":'/pictures/'+pn},function(){
				res.send("ok");
			});
		});
	}
//获取资源导航的菜单
exports.dhnav = function(req,res){
		db.getDatas('dhNav',{},function(result){
			res.send(result);
		});
	}
//获取资源导航的内容
exports.dhcontent = function(req,res){
		db.getDatasSort('dhContent',{},"sort",function(result){
			res.send(result);
		});
	}
//获取案例的导航菜单
exports.anliNav = function(req,res){
	db.getDatas('anliNav',null,function(result){
		res.send(result[0].data);
	})
}
//添加资源导航的内容
exports.adddhcontent = function(req,res){
	var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files,next){
			db.addArr('dhContent',fields,function(){
				res.send(fields);
			});
		});
}
//获取案例的详细内容
exports.anliContent = function(req,res){
	var articleNum = parseInt(req.query.articleNum);
	var selectValue = req.query.selectValue;
	var findObj = {};
	if(selectValue){
		findObj = {'selectValue':selectValue};
	}
	db.getDataByNum('anliContent',findObj,articleNum,function(result){
		res.send(result);
	});
}

/******************管理后台部分************************************/
//用户登录处理
exports.login = function(req,res){
	var username = req.body.username,
	password = req.body.password;
	console.log(username,password);
	if(username === "admin" && password === "123456" ){
		req.session.sign = true;
		res.send(username);
		return ;
	}
	res.send("wrong");
}
//退出登录
exports.logout = function(req,res){
	req.session.sign = false;
	res.send("ok");
}
//check用户是否已经登录，session是否过期
exports.checklogin = function(req,res){
	console.log(req.session.sign);
	if(req.session.sign === true){
		res.send('ok');
		return ;	
	}
	res.send("wrong");
}
//上传文章vue-html-edit上传图片
exports.uploadPicEdit = function(req,res){
	var form = new formidable.IncomingForm();
		form.uploadDir = __dirname+"/../public/pictures";
		form.keepExtensions = true;
		form.parse(req, function(err, fields, files,next){
			console.log(files);
			var pn = files.pic.path.split('pictures')[1].substring(1);
			/*db.insertone('articles',{"title":fields.title,"selectValue":fields.selectValue,"articleBody":fields.articleBody,"description":fields.description,"creatTime":fields.creatTime,"url":'/pictures/'+pn},function(){
				res.send("ok");
			});*/
			//res.send('/pictures/'+pn);
			res.send({
				"ok":true,
				"data":'/pictures/'+pn
			});
		});
}
//心得文章管理的编辑文章模糊查询
exports.findarticlebylike = function(req,res){
	var obj = {"title":req.body.titleName};
	db.getDatasByLike('articles',obj,function(result){
		res.send(result);
	});
}
//心得文章管理删除文章
exports.removeArticle = function(req,res){
	var val = req.body.creatTime;
	db.removedoc("articles",{"creatTime":val},function(result){
		res.send(result);
	});
}
//心得文章管理的修改文章接口
exports.updateArticle = function(req,res){
	var form = new formidable.IncomingForm();
		form.uploadDir = __dirname+"/../public/pictures";
		form.keepExtensions = true;
		form.parse(req, function(err, fields, files,next){
			if(files.picture){
				var pn = files.picture.path.split('pictures')[1].substring(1);
				db.update('articles',{"creatTime":fields.creatTime},{$set:{"title":fields.title,"selectValue":fields.selectValue,"articleBody":fields.articleBody,"description":fields.description,"creatTime":fields.creatTime,"url":'/pictures/'+pn}},function(){
					res.send('ok');				
				});
				return ;
			}
			db.update('articles',{"creatTime":fields.creatTime},{$set:{"title":fields.title,"selectValue":fields.selectValue,"articleBody":fields.articleBody,"description":fields.description,"creatTime":fields.creatTime}},function(){
				res.send('ok');				
			});
		});
}
//插入资源导航内容接口
exports.addZy = function(req,res){
	var obj = req.body;
	db.addArr('dhContent',obj,function(){
		res.send('ok');	
	}); 
}
//资源导航模糊查询接口
exports.getZyByLike = function(req,res){
	res.send(req.body);
}
//根据类别来获取资源导航案例
exports.getZyByClass = function(req,res){
	var q = req.body.classCode;
	console.log(q);
	db.getDatas('dhContent',{'idCode':q},function(result){
		res.send(result);
	});
}
//删除资源导航内容
exports.removeZyByUrl = function(req,res){
	var obj = req.body;
	db.removeArr('dhContent',obj,function(){
		res.send('ok');
	});
}
//修改资源导航内容
exports.editZyConfirm = function(req,res){
	var q = req.body;
	db.updateArr('dhContent',q,function(){
		res.send('ok');
	});
}
/******************end 管理后台部分************************************/