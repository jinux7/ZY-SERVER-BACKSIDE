var MongoClient = require('mongodb').MongoClient;

var shujukuURL = 'mongodb://localhost:27017/ued';

/************************************查找数据库内容**********************************************************/
exports.getDatas = function (doc,val,callback){          //查找数据库内容
	MongoClient.connect(shujukuURL, function(err, db) {
        if(err){
            res.send("数据库连接失败");
            return;
        }
        //res.write("恭喜，数据库已经成功连接 \n");
        //查询数据库，cursor游标，游标可以用each方法遍历
        //每次表示一条document
        var result = [];
        var cursor = db.collection(doc).find(val);
        cursor.each(function(err, doc) {
            if(err){
                res.send("游标遍历错误");
                return;
            }
            if (doc != null) {
                result.push(doc);
            } else {
                //遍历完毕
                db.close();
                callback(result);
            }
        });
    });
}
/************************************模糊查找数据库内容**********************************************************/
exports.getDatasByLike = function (doc,val,callback){          //查找数据库内容
    MongoClient.connect(shujukuURL, function(err, db) {
        if(err){
            res.send("数据库连接失败");
            return;
        }
        //res.write("恭喜，数据库已经成功连接 \n");
        //查询数据库，cursor游标，游标可以用each方法遍历
        //每次表示一条document
        var result = [];
        var searchObj = {};
        for(var i in val){
            searchObj[i] = {$regex: val[i], $options:'i'}
        }
        var cursor = db.collection(doc).find(searchObj).sort({"creatTime":-1});
        cursor.each(function(err, doc) {
            if(err){
                //res.send("游标遍历错误");
                return;
            }
            if (doc != null) {
                result.push(doc);
            } else {
                //遍历完毕
                db.close();
                callback(result);
            }
        });
    });
}
/************************************查找数据库内容按照顺序**********************************************************/
exports.getDatasSort = function (doc,val,sort,callback){          //查找数据库内容
    MongoClient.connect(shujukuURL, function(err, db) {
        if(err){
            res.send("数据库连接失败");
            return;
        }
        //res.write("恭喜，数据库已经成功连接 \n");
        //查询数据库，cursor游标，游标可以用each方法遍历
        //每次表示一条document
        var result = [];
        var cursor = db.collection(doc).find(val).sort({sort:1});
        cursor.each(function(err, doc) {
            if(err){
                res.send("游标遍历错误");
                return;
            }
            if (doc != null) {
                result.push(doc);
            } else {
                //遍历完毕
                db.close();
                callback(result);
            }
        });
    });
}
/***************************************查找数据库内容by条数*************************************/
exports.getDataByNum = function(doc,val,num,callback){
	MongoClient.connect(shujukuURL, function(err, db) {
        if(err){
            res.send("数据库连接失败");
            return;
        }
        //res.write("恭喜，数据库已经成功连接 \n");
        //查询数据库，cursor游标，游标可以用each方法遍历
        //每次表示一条document
        var result = [];
        var cursor = db.collection(doc).find(val).limit(num).sort({"_id":-1});
        cursor.each(function(err, doc) {
            if(err){
                res.send("游标遍历错误");
                return;
            }
            if (doc != null) {
                result.push(doc);
            } else {
                //遍历完毕
                db.close();
                callback(result);
            }
        });
    });
}
/***************************************插入数据库内容*******************************************/
exports.insertone = function (doc,obj,callback){
	MongoClient.connect(shujukuURL, function(err, db){
		if(err){
			console.log("数据库连接失败");
			return ;
		}
		db.collection(doc).insertOne(obj,function(err,result){
			if(err){
				console.log("数据库写入失败");
				return ;
			}
			callback();
			db.close();
		});
	});
}

/**************************************删除数据库中的文档***************************************/
exports.removedoc = function (doc,query,callback){
	MongoClient.connect(shujukuURL, function(err,db){
		if(err){
			console.log("数据库连接失败");
			return ;
		}
		db.collection(doc).remove(query,{safe:true},function(err,result){
			if(err){
				console.log("删除数据库内容失败");
				return ;
			}
			console.log(result);
            callback('ok');
			db.close();
		});
	});
}

/*************************************插入内嵌数组数据*****************************************/
exports.addArr = function(doc,obj,callback){
    var idCode = obj.selectValue,
        insertData = {
            "title":obj.title,
            "description":obj.description,
            "url":obj.url
        };
    MongoClient.connect(shujukuURL, function(err, db){
        if(err){
            console.log("数据库连接失败");
            return ;
        }
        db.collection(doc).update({"idCode":idCode},{"$push":{"arrData":insertData}},function(err,result){
            if(err){
                console.log("数据库写入失败");
                return ;
            }
            callback();
            db.close();
        });
    });
}

/*********************************删除内嵌数组里的元素***************************************/
exports.removeArr = function(doc,obj,callback){
    var idCode = obj.idCode;
    var q = {
        "url":obj.url
    };
    MongoClient.connect(shujukuURL, function(err, db){
        if(err){
            console.log("数据库连接失败");
            return ;
        }
        db.collection(doc).update({"idCode":idCode},{"$pull":{"arrData":q}},function(err,result){
            if(err){
                console.log("数据库写入失败");
                return ;
            }
            callback();
            db.close();
        });
    });
}

/*******************************修改更新内嵌数组的元素****************************************/
exports.updateArr = function(doc,obj,callback){
    var idCode = obj.idCode;
    var q = {
            description : obj.description,
            title : obj.title,
            url : obj.url,
            beforeUrl : obj.beforeUrl
    }
    MongoClient.connect(shujukuURL, function(err, db){
        if(err){
            console.log("数据库连接失败");
            return ;
        }
        db.collection(doc).update({"idCode":idCode,"arrData.url":q.beforeUrl},{$set:{"arrData.$.title":q.title,"arrData.$.description":q.description,"arrData.$.url":q.url}},function(err,result){
            if(err){
                console.log("数据库写入失败");
                return ;
            }
            callback();
            db.close();
        });
    });
}

/************************************更新数据库内容**********************************************************/
exports.update = function (doc,query,dataObj,callback){          //查找数据库内容
    MongoClient.connect(shujukuURL, function(err, db) {
        if(err){
            res.send("数据库连接失败");
            return;
        }
        console.log(query,dataObj);
        db.collection(doc).update(query,dataObj,function(err,result){
            if(err){
                console.log("数据库写入失败");
                return ;
            }
            callback();
            db.close();
        });
    });
}