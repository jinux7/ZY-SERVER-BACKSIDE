	/*提示框显示和关闭
	*
	*method: showMsg('提示框里边需要显示的内容');
	*
	*/	
	function showMsg(msg){
		$('#modal_message').show().find('p').html(msg);
		$('#modal_message .box span,#modal_message .box button').off().on('click',function(){
			$('#modal_message').hide();
		});
	}
	/*end 提示框显示和关闭*/

	/*设置页面的高度**************/
		$('.wrapper').height('32.8125rem');
	/*end 设置页面的高度**************/

$(function(){
	var dataWy = {//各种文言的数据
		rule:{//规则
			title:'活动规则',
			text:'1、在辽宁联通5月17日推送的8条图文消息中藏着7个流量宝藏的钥匙口令碎片，细心寻找到这7个碎片连成一句完整的口令并输入到页面中就可以获得517M日有效流量。<br>2、用户可多次输入口令，但仅可获得一次免费流量包。<br>3、输入钥匙口令后需要扣除3积分才能最终打开流量宝藏哦。每条图文都有赠送的积分哦，快去找口令攒积分去吧！'
		},
		myPresent:{//我的奖品
			title:'我的奖品',
			text:''	
		},
		inputError:{//输入口令错误
			title:'输入错误提示',
			text:'太遗憾了，你找错了！钥匙口令是<strong>300万粉丝大狂欢</strong>。快去参加九宫格抽奖！免费日包、月包更有中国红Iphone7等你！ 300万粉丝大庆，所有人100%中奖！！！'
		},
		noScore:{
			title:'提示',
			text:'亲，你当前积分不足3分，打不开流量宝藏啊！ 5月17日推送的8条图文消息中藏着大量的积分！快去攒积分吧！'
		},
		sucess:{//获取到奖品
			title:'恭喜您中奖',
			text:'恭喜您找到了流量钥匙，特送上517M专属日有效流量兑换码*******有效期是：5月17日—6月20日。兑换位置：辽宁联通'	
		},
		fail:{//流量包发放完了
			title:'真遗憾',
			text:'亲，你咋才找到啊！17000个517M流量包早被抢光啦！快去参加九宫格抽奖！免费日包、月包更有中国红Iphone7等你！ 300万粉丝大庆，所有人100%中奖！！！'	
		}
	}
	//页面加载之后设置分数
	$('.score').text(100);
	/**宝箱开始运动和停止运动函数*********/
	function startMove(){//开始运动
		$('.baoBox').addClass('shake');
	}
	function stoptMove(){//停止运动
		$('.baoBox').removeClass('shake');
	}
	/**end 宝箱开始运动和停止运动函数*********/
	/**规则按钮添加点击事件***/
		$('.ruleBtn').on('click',function(ev){
			showBox(dataWy.rule.title,dataWy.rule.text);
		})
	/**end 规则按钮添加点击事件***/
	/**确定按钮添加点击事件***/
		$('.submitBtn').on('click',function(ev){
			if(Math.random()>0.5?true:false) {//判断积分是否够
				showBox(dataWy.noScore.title,dataWy.noScore.text);
			}else {
				var kl = $('#kl').val();
				//校验输入口令是否正确
				if('300万粉丝大狂欢' !== kl){
					showBox(dataWy.inputError.title,dataWy.inputError.text);
					$('#kl').val('')
					return ;
				}
				//开始晃动宝箱
				startMove();
				setTimeout(function(){//为了效果，宝箱晃动2秒之后开始请求数据
					stoptMove();
					//此处进行ajax处理
					showBox(dataWy.sucess.title,dataWy.sucess.text);
				},2000);
			}
		});
	/**end 确定按钮添加点击事件***/

	/**我的奖品按钮添加点击事件***/
		$('.myPresentBtn').on('click',function(ev){
			showBox(dataWy.myPresent.title,dataWy.myPresent.text);
		});
	/**end 我的奖品按钮添加点击事件***/

	/**规则，我的奖品等弹出层函数***/
		function showBox(title,text){
			$('.modal_box')
			.show()
			.find('h5')
			.html(title)
			.next('p')
			.html(text);
			$('.modal_box .close_modal_box').off().on('click',function(ev){
				$('.modal_box').hide();
			});
		}
	/**end 规则，我的奖品等弹出层函数***/
});
