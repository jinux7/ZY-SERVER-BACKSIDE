$(function(){
	//页面长按去掉事件
	function disableScroll(){
		$(document).on('touchstart',cancelScroll);
	}
	function enableScroll(){
		$(document).off('touchstart',cancelScroll);
	}
	function cancelScroll(event){
		event.preventDefault();
	}
	
	//定时取消loading页面
	var isLoad = false;
	window.onload = function(){
				isLoad = true;		
		}
	setTimeout(function(){
		var timer = setInterval(function(){
			if(isLoad){
				clearInterval(timer);
				$('.load-redbag').addClass('over');
				$('.scroll-bar').addClass('over');
				setTimeout(function(){
					$('.loading').hide();	
				},500);
			}
		},100);
	},1500);
	var score = 0;
	var time = 29;
	//运动部分代码
	var initSpeed = 3;
	var Top = parseInt($('#panel a').css('top'));
	var screenWidth = $(window).width();
	var screenHeight = $(window).height();
	
	function move(el){ //运动函数
		var initTop = Top;
		var speed = parseInt(Math.random() * initSpeed) + 1;
		var iLeft=parseInt(Math.random()*(screenWidth-$(el).width()));
		$(el).css('left', iLeft);
		el.timer = setInterval(function(){
			$(el).css('top', initTop += speed);
			if(parseInt($(el).css('top')) > screenHeight){
				clearInterval(el.timer);
				//$(el).css('top',Top);
				move(el);
			}
		},6);
		$(el).find('img').attr({
				src: './images/hongbao.png'
			});
		//红包加监听点击事件
		$(el).off().on('tap',function(){
			var _this = this;
			var x = $(this).offset().left;
			var y = $(this).offset().top;
			var fen = $(this).data('val');
			$(this).find('span').html('+' + fen).addClass('active');
			setTimeout(function(){
				$(_this).find('span').removeClass('active').html('');
				console.log($(_this).find('span').text());
			},2000);
			$(this).find('img').attr({
				src: './images/hongbao_open.png'
			});
			$('#panel .showScore').html(score += fen);
			$(this).off();
		});
	}
	function stop(el){ //停止函数
		clearInterval(el.timer);
	}
	//运动部分代码

	//开始游戏按钮点击事件
	$('#btn_startGame').on('tap', function(event) {
		disableScroll();
		//倒计时效果
		score = 0;
		time = 29;
		$('#panel .showScore').text('0');
		$('#panel .time').text('30秒');
		var dao_timer = setInterval(function(){
			if(time == 0){
				enableScroll();
				clearInterval(dao_timer);
				$('#panel a').each(function(index, el) {
					stop(el);
				});
				if(parseInt($('#panel .showScore').html()) > 100){
					$('#hj .score i').html($('.showScore').text());
					$('#hj').show();
					$.ajax({
						url: '/json/hj.json',
						data: {score: $('#panel .showScore').html()},
						success:function(res){
							$('#hj .myPresent b').first().text('兑换码:'+res.presentCode);
							$('#hj .myPresent b').last().text('有效日期:'+res.timer);
						}
					});
				}else{
					$('#whj .score i').html($('.showScore').text());
					$('#whj').show();
				}
			}
			$('#panel .time').html(time-- +'秒');
		},1000);
		$('.i-content').hide();
		$('#panel').show();
		$('#panel a').each(function(index, el) {
			move(el);
		});
	});

	//点击活动规则点击事件
	$('#btn_hdgz').off().on('tap',function(){
		$('#hdgz').show();
		$('#hdgz .close').on('tap',function(){
			$(this).parents('#hdgz').hide();
		});
	});

	//点击我的奖品点击事件
	$('#btn_wdjp').off().on('tap',function(){
		$('#wdjp').show();
	});

	//游戏之后获奖页面的立即兑换按钮事件
	$('#btn_hj_ljdh').off().on('tap',function(){
		console.log(1234586);
		$('#hj').hide();
		$('#panel').hide();
		$('.i-content').show();
		$('#wdjp').show();
	});
	//给我的奖品页面关闭按钮加事件
	$('#wdjp .close').on('tap',function(){
			$(this).parents('#wdjp').hide();
		});
		
	/*
	*初始化页面时对页面添加数据
	*/
	
	//再玩一次点击按钮事件
	$('.gameAgain').on('tap',function(){
		/*score = 0;
		time = 29;
		$('#panel .showScore').text('0');
		$('#panel .time').text('30秒');*/
		$('#hj').hide();
		$('#whj').hide();
		$('#panel').hide();
		$('.i-content').show();
	});

	//我的奖品页面插入奖品内容
	function wdjp_insert(data){
		for(var i=0; i<data.length; i++){
			$('.wdjp_jpList').append('<div class="myPresent">\
					                    <h3>3G流量大礼包</h3>\
					                    <b>兑换码：'+data[i].presentCode+'</b>\
					                    <b>有效日期:'+data[i].timer+'</b>\
					                </div>');
		}
	}
	//ajax获取我的奖品内容
	$.ajax({
		url: '/json/presentList.json',
		//type:'post',
		success:function(res){
			wdjp_insert(res);
		}
	});
	


});
