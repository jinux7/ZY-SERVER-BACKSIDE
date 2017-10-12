/*
*页面内逻辑部分开始
*/
/*
*模拟数据区域
*/
var zjjl_list = [
	{"time":"1分前","tel":"13888888888","present":"获得iphoe7"},
	{"time":"1分前","tel":"13888888888","present":"获得iphoe7"},
	{"time":"1分前","tel":"13888888888","present":"获得iphoe7"},
	{"time":"1分前","tel":"13888888888","present":"获得iphoe7"},
	{"time":"1分前","tel":"13888888888","present":"获得iphoe7"},
	{"time":"1分前","tel":"13888888888","present":"获得iphoe7"},
	{"time":"1分前","tel":"13888888888","present":"获得iphoe7"},
	{"time":"1分前","tel":"13888888888","present":"获得iphoe7"},
	{"time":"1分前","tel":"13888888888","present":"获得iphoe7"},
	{"time":"1分前","tel":"13888888888","present":"获得iphoe7"}
];
var cjjl_list = [
	{"time":"2016/01/20 17:15:10","jifen":"10积分","present":"iphone6p"},
	{"time":"2016/01/20 17:15:10","jifen":"10积分","present":"iphone6p"},
	{"time":"2016/01/20 17:15:10","jifen":"10积分","present":"iphone6p"},
	{"time":"2016/01/20 17:15:10","jifen":"10积分","present":"iphone6p"},
	{"time":"2016/01/20 17:15:10","jifen":"10积分","present":"iphone6p"}
];
var win_list = win_list = ['iphone1','谢谢参与','iphone3','谢谢参与','谢谢参与','iphone6','谢谢参与','iphone8'];
window.onload = function(){
	$('#maskLoad').hide('slow');
	$('#yuanbao_down').addClass('yuanbao_down_active');
	$('#music').get(0).play();
	$('#music').get(0).pause();

}
$(function(){
	//名牌点击触发事件
	$('.mingpaiArea li.mp').die().live('click',function(){
		$('#maskLoad').show('slow');
		if(!true){//判断积分是否符合游戏的开始规则
			creatModalSmall(true,'./modalPages/smallModal2.html',function(){});
		}
		if(Math.random() > 0.5){
			wzj(this,win_list);//执行函数	
		}else {
			zj(this,win_list);//执行函数
		}
		
		//中奖了替换图片文字
		function zj(_this,win_list){
				$('#maskLoad').hide('slow');
				$(_this).css('background-image', 'url(./images/mp_zjbg.png)')
				.find('img').remove('img');
				$(_this).find('span').html('iphone');//获得奖品名字
				$(_this).siblings().each(function(index, el) {
					$(el).css('background-image', 'url(./images/mp_zjbg.png)')
					.find('img').remove('img');
					$(el).find('span').html('').html(win_list[index]);
				});
				//动画部分
				$(_this).append('<div></div>');
				$('#music').get(0).play();//音乐效果
				setTimeout(function(){
					if($(_this).hasClass('jbg')){
						$(_this).find('div').addClass('huadongActive j');
					}else{
						$(_this).find('div').addClass('huadongActive y');
					}
					
				},10);
				setTimeout(function(){
					creatModalSmall(true,'./modalPages/smallModal4.html?'+(new Date().getTime()),function(){});
				},1000);
			}
		//中奖了替换图片文字

		//未中奖替换图片
		function wzj(_this,lost_list){
			$('#maskLoad').hide('slow');
			$(_this).css('background-image', 'url(./images/mp_wzjbg.png)')
			.html('')
			.find('img').remove('img');
			$(_this).siblings().each(function(index, el) {
					$(el).css('background-image', 'url(./images/mp_zjbg.png)')
					.find('img').remove('img');
					$(el).find('span').html('').html(win_list[index]);
				});
			//动画部分
			$(_this).append('<div></div>');
			$('#music').get(0).play();//音乐效果
			setTimeout(function(){
				if($(_this).hasClass('jbg')){
					$(_this).find('div').addClass('huadongActive j');
				}else{
					$(_this).find('div').addClass('huadongActive y');
				}
				
			},10);
			setTimeout(function(){
				creatModalSmall(false,'./modalPages/smallModal3.html?'+(new Date().getTime()),function(){
					//alert();
					initMp();
				});
			},1000);
			
		}		
		//未中奖替换图片
	});


//modal制作大的弹窗
function creatModal(url,callback){
	$('#smp').append('<div id="modal"><div id="contentM"></div><span class="close">&#10005</span></div>');
	$('#modal .close').off().on('click',function(){
		$('#modal').remove();
	});
	$('#contentM').load(url,function(){
		if(callback){
			callback();			
		}
	})
}

//modal制作小的弹窗
function creatModalSmall(winorlost,url,callback){
	if(winorlost){
		$('#smp').append('<div id="modal"><div id="contentMsmall" class="win"><div class="contentMsmall"></div></div></div>');
	}else{
		$('#smp').append('<div id="modal"><div id="contentMsmall" class="lost"><div class="contentMsmall"></div></div></div>');
	}
	$('#contentMsmall .contentMsmall').load(url,function(){
		if(callback){
			callback();			
		}
	})
}


//抽奖记录添加事件
$('.btn.cjjl').off().on('click',function(){
	creatModal('./modalPages/cjjl.html?'+(new Date().getTime()),function(){
		for(var i=0; i<cjjl_list.length; i++){
			$('#modal_cjjl .grids ul').append('<li class="info">\
													<span>'+cjjl_list[i].time+'</span>\
													<span>'+cjjl_list[i].jifen+'</span>\
													<span>'+cjjl_list[i].present+'</span>\
												</li>');
		}
		$('#modal_cjjl .grids ul .info').each(function(index, el) {
			if(index % 2 == 0){
				$(el).css('background-color', '#fdf3ea');
			}else{
				$(el).css('background-color', '#fce7e2');
			}
		});
	});	
});
//点击我的奖品添加事件
$('.btn.wdjp').off().on('click',function(){
	creatModal('./modalPages/wdjp.html?'+(new Date().getTime()));	
});

//点击活动规则添加事件
$('.zjjuArea .hdgz').off().on('click',function(){
	creatModal('./modalPages/hdgz.html');
});

//点击中奖纪录的滚动操作
function scrollup(zjjl_list){
	if(zjjl_list.length > 5){
		$('.textcontent .scrollup').append('<ul></ul>');
		for(var i=0; i<zjjl_list.length; i++){
			$('.textcontent .scrollup ul')
			.append('<li>\
						<span>'+zjjl_list[i].time+'</span>\
						<span>'+zjjl_list[i].tel+'</span>\
						<span>'+zjjl_list[i].present+'</span>\
					</li>');
		}
		$('.textcontent .scrollup ul').clone().appendTo('.textcontent .scrollup');
		var size = parseInt($('html').css('font-size'));
		var speed = 1,value= 18*5.968;
		var height = $('.textcontent .scrollup ul').height();
		setInterval(function(){
			if(value <= -height){
				value = 0;
				$('.textcontent .scrollup').css({
					'transform':'translateY('+value+')',
					'-webkit-transform':'translateY('+value+')'
				});	
			}
			value -= speed;
			$('.textcontent .scrollup').css({
				'transform':'translateY('+value+'px)',
				'-webkit-transform':'translateY('+value+'px)'	
			});
		},100);
	}else{
		$('.textcontent .scrollup').append('<ul></ul>');
		for(var i=0; i<zjjl_list.length; i++){
			$('.textcontent .scrollup ul')
			.append('<li>\
						<span>'+zjjl_list[i].time+'</span>\
						<span>'+zjjl_list[i].tel+'</span>\
						<span>'+zjjl_list[i].present+'</span>\
					</li>');
		}
		$('.textcontent .scrollup').css({
			'transform':'translateY(0)',
			'-webkit-transform':'translateY(0)'	
		});
	}
	
}
scrollup(zjjl_list);//执行中奖纪录滚动函数

//页面逻辑部分，弹出模态框
//您不是沃尊享VIP用户
if(!true){
	creatModalSmall(true,'./modalPages/smallModal1.html?'+(new Date().getTime()),function(){});
}

//


//名牌初始化函数
function initMp(){
	$('.mingpaiArea')
	.empty()
	.append('<ul>\
    			<li class="mp ybg">\
    				<img src="./images/yejiao.png" />\
    				<span>鸡年大吉</span>\
    			</li>\
    			<li class="mp jbg">\
    				<img src="./images/yejiao.png" />\
    				<span>万事如意</span>\
    			</li>\
    			<li class="mp ybg">\
    				<img src="./images/yejiao.png" />\
    				<span>心想事成</span>\
    			</li>\
    			<li class="mp jbg">\
    				<img src="./images/yejiao.png" />\
    				<span>合家欢乐</span>\
    			</li>\
    			<li class="mp jbg">\
    				<img src="./images/yejiao.png" />\
    				<span>身体健康</span>\
    			</li>\
    			<li class="mp jbg">\
    				<img src="./images/yejiao.png" />\
    				<span>财源滚滚</span>\
    			</li>\
    			<li class="mp ybg">\
    				<img src="./images/yejiao.png" />\
    				<span>五福临门</span>\
    			</li>\
    			<li class="mp jbg">\
    				<img src="./images/yejiao.png" />\
    				<span>大吉大利</span>\
    			</li>\
    			<li class="mp ybg">\
    				<img src="./images/yejiao.png" />\
    				<span>福满乾坤</span>\
    			</li>\
    		</ul>')
}





});

	
	