$(function(){
// 进入页
	// 打开兑换弹窗
	$('.look-exchange-num').click(function(){
		$('.exchange-num-box').show();
	})
	// 关闭兑换码弹窗
	$('.close-btn').click(function(){
		$('.exchange-num-box').hide();
	})
	$('.open-again').click(function(){
		$('.again').show();
	})
	$('.colse-again').click(function(){
		$('.again').hide();
	})
	// 跳页
	$('.begin-btn').click(function(){
		var a = Math.ceil(Math.random()*2);
			$(this).attr('href','game'+a+'.html');
	})




	
// 游戏页
	
	// 倒计时
	var t = setInterval(function(){
		var down = $('.countdown').text();
		if (down == -1 ) {
			clearInterval(t);
			return 0;
		}
		if (  down <= 10 ) {
			if( down > 1){
				$('.countdown').fadeOut().fadeIn();
			}
			$('.countdown').css({"color":'red','font-size':'24px'});
		}
		down--;
		$('.countdown').text(down);
		if(down <= -1){
			resultModel(0);
		}
	},1000)

	// 点击图片
	$('.moon-img li').one('touchstart',function(){
		var n = $('.right-num').text();
		var m = ($(this).index() + 1) ;
		var t = $('.totle-num').text();
		$(this).children('img').attr({'src':'image/moon21.png','width':'92%'});
		n++;
		$('.right-num').text(n);
		if(t == 6 && n == 6){
			resultModel(1);
		}else if(t == 8 && n == 8){
			resultModel(1);
		}
	})

	// 初始化调用ajax
	$.ajax({
		url:'',
		type:'get',
		data:'',
		dataType:'json',
		success:function(data){
			if( data.status  == 'success'){

			}else if(data.status == "failure"){

			}
		},
		fail:function(){

		}
	})

	var state = '0';
	function resultModel(a){
		$('.result').show();
		// 判断游戏是否成功 1为成功 0为失败
		if(a == 1){
			// 成功全部找到 兑换页面
			a = 1;
			clearInterval(t);
	 		// 判断是否领取兑换码 0为没领取调用ajax  1为领取过兑换码
			if( state == 0){
				gua();
				$.ajax({

				})
			}else{
				$('.result-word').text('您已领取过本次活动500m流量');
				$('.result-title,.exchange-num,.result-explane-title,.result-explane').hide();
			}

		}else{
			// 时间到 失败页面
		    a = 0;
			$('.result-title').text('很遗憾');
			$('.result-word').text('您未能在规定时间内找出所有的月');
			$('.exchange-num,.result-explane-title,.result-explane').hide();
			$('.result-wish').show();	
			}
	}




// 弹窗
	
	// 挂挂
    var c1; //画布
	var ctx; //画笔
	var ismousedown; //标志用户是否按下鼠标或开始触摸
	var isOk=0; //标志用户是否已经刮开了一半以上
	var fontem = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]);//这是为了不同分辨率上配合@media自动调节刮的宽度
	var gua = function(){ 
	    c1 = document.getElementById("c1");
	    //这里很关键，canvas自带两个属性width、height,我理解为画布的分辨率，跟style中的width、height意义不同。
	    //最好设置成跟画布在页面中的实际大小一样
	    //不然canvas中的坐标跟鼠标的坐标无法匹配
	    c1.width=c1.clientWidth;
	    c1.height=c1.clientHeight;
	    ctx = c1.getContext("2d");
	     //PC端的处理
   		c1.addEventListener("mousemove",eventMove,false);
   		c1.addEventListener("mousedown",eventDown,false);
        c1.addEventListener("mouseup",eventUp,false);
	    //移动端的处理
	    c1.addEventListener('touchstart', eventDown,false);
	    c1.addEventListener('touchend', eventUp,false);
	    c1.addEventListener('touchmove', eventMove,false);
	    //初始化
	    initCanvas();
 	}

 	function initCanvas(){//网上的做法是给canvas设置一张背景图片，我这里的做法是直接在canvas下面另外放了个div
     //c1.style.backgroundImage="url(中奖图片.jpg)";
	     ctx.globalCompositeOperation = "source-over";
	     ctx.fillStyle = '#aaaaaa';
	     ctx.fillRect(0,0,c1.clientWidth,c1.clientHeight);
	     ctx.fill();
	     ctx.font = "Bold 30px Arial";
	                 ctx.textAlign = "center";
	                 ctx.fillStyle = "#999999";
	                 ctx.fillText("刮我领流量",c1.width/2,30);//把这个属性设为这个就可以做出圆形橡皮擦的效果
	     //有些老的手机自带浏览器不支持destination-out,下面的代码中有修复的方法
	     ctx.globalCompositeOperation = 'destination-out';
	}

	function eventDown(e){
	    e.preventDefault();
	    ismousedown=true;
	}


	function eventUp(e){
	    e.preventDefault();
	    //得到canvas的全部数据
	    var a = ctx.getImageData(0,0,c1.width,c1.height);
	    var j=0;
	    for(var i=3;i<a.data.length;i+=4){
	        if(a.data[i]==0)j++;
	    }
	    //当被刮开的区域等于一半时，则可以开始处理结果
	    if(j>=a.data.length/8){
	        isOk = 1;
	    }
	    ismousedown=false;
	 	}

	 	function eventMove(e){
	     e.preventDefault();
	     if(ismousedown) {
	         if(e.changedTouches){
	             e=e.changedTouches[e.changedTouches.length-1];
	         }
	         var topY = document.getElementById("ci").offsetTop;
	         var oX = c1.offsetLeft,
	         oY = c1.offsetTop+topY;
	         var x = (e.clientX + document.body.scrollLeft || e.pageX) - oX || 0,
	         y = (e.clientY + document.body.scrollTop || e.pageY) - oY || 0;

	         //画360度的弧线，就是一个圆，因为设置了ctx.globalCompositeOperation = 'destination-out';
	         //画出来是透明的
	         ctx.beginPath();
	         ctx.arc(x, y, fontem*1.2, 0, Math.PI * 2,true);

	         //下面3行代码是为了修复部分手机浏览器不支持destination-out
	         //我也不是很清楚这样做的原理是什么
	         c1.style.display = 'none';
	         c1.offsetHeight;
	         c1.style.display = 'inherit'; 
	         ctx.fill();
	     }
	     if(isOk){
	         var btn = document.getElementsByClassName("btn");
	             for(var i=0; i<btn.length; i++){
	                 btn[i].style.zIndex = '3';
	             }
	             document.getElementsByClassName("btn")[0].style.zIndex="3";
	     }
 	}



})