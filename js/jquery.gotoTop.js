// JavaScript Document 
(function($){
	var goToTopTime;
	$.fn.goToTop=function(options){ 
		// $.fn是指jquery的命名空间，加上fn上的方法及属性，会对jquery实例每一个有效。
		/*如扩展$.fn.abc(),即$.fn.abc()是对jquery扩展了一个abc方法,那么后面你的每一个jquery实例都可以引用这个方法了. 
		那么你可以这样子：$("#div").abc(); 
		jQuery为开发插件提拱了两个方法，分别是： 
		jQuery.extend(object);为扩展jQuery类本身.为类添加新的方法。 
		jQuery.fn.extend(object);给jQuery对象添加方法。 
		原来 jQuery.fn =jQuery.prototype
		prototype 属性使您有能力向对象添加属性和方法。
		*/
		var opts = $.extend({},$.fn.goToTop.def,options); //jQuery.extend() 函数用于将一个或多个对象的内容合并到目标对象。
		var $window=$(window); //$(window) 这个是获取窗口对象，也就是浏览器客户区
		$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); 
		//document.compatMode用来判断当前浏览器采用的渲染方式。
		//BackCompat：标准兼容模式关闭。
		//CSS1Compat：标准兼容模式开启。
		// opera fix
		// 警告：来自 navigator 对象的信息具有误导性，不应该被用于检测浏览器版本，这是因为：
		// 	navigator 数据可被浏览器使用者更改
		// 	浏览器无法报告晚于浏览器发布的新操作系统
		// 由于 navigator 可误导浏览器检测，使用对象检测可用来嗅探不同的浏览器。
		// 由于不同的浏览器支持不同的对象，您可以使用对象来检测浏览器。例如，由于只有 Opera 支持属性 "window.opera"，您可以据此识别出 Opera。
		// 例子：if (window.opera) {...some action...}
		// $(this).hide();
		var $this=$(this); // this表示的是当前对象
		clearTimeout(goToTopTime); // clearTimeout() 方法可取消由 setTimeout() 方法设置的 timeout。
		goToTopTime=setTimeout(function(){ // setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。
			var controlLeft;
			if ($window.width() > opts.pageHeightJg * 2 + opts.pageWidth) {
				controlLeft = ($window.width() - opts.pageWidth) / 2 + opts.pageWidth + opts.pageWidthJg;
			}else{
				controlLeft = $window.width()- opts.pageWidthJg-$this.width();
			}
			var cssfixedsupport= !$.support.leadingWhitespace;//判断是否ie6
			var controlTop=$window.height() - $this.height()-opts.pageHeightJg;
			controlTop=cssfixedsupport ? $window.scrollTop() + controlTop : controlTop;
			var shouldvisible=( $window.scrollTop() >= opts.startline )? true : false; // scrollTop() 方法返回或设置匹配元素的滚动条的垂直位置。
			
			if (shouldvisible){
				$this.stop().show();
			}else{
				$this.stop().hide();
			}
			
			$this.css({ // css() 方法返回或设置匹配的元素的一个或多个样式属性。
				position: cssfixedsupport ? 'absolute' : 'fixed',
				bottom: 88,
				right: 36
			});
		},30);
		
		$(this).click(function(event){
			if (navigator.userAgent.indexOf("Firefox") != -1) { // != -1 :才能判断出Firefox == 1 就判断不出来
				$(this).click(function(){
					$(window).scrollTop(0); // 终于解决Firefox浏览器点击不能到顶部的问题了，好伤， but Happy!
				});
			} else {
				$body.stop().animate( { scrollTop: $(opts.targetObg).offset().top}, opts.duration); // stop() 方法用于在动画或效果完成前对它们进行停止。
				$(this).blur(); 
				// 当元素失去焦点时发生 blur 事件 例如 当输入域失去焦点 (blur) 时改变其颜色
				// $("input").blur(function(){
	  			// $("input").css("background-color","#D6D6FF");
				// });
				event.preventDefault(); // preventDefault() 取消事件的默认动作
				event.stopPropagation(); 
				// 不再派发事件。
				// 终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。
			}
		});
	};
	
	$.fn.goToTop.def={
		pageWidth:910,//页面宽度
		pageWidthJg:2,//按钮和页面的间隔距离
		pageHeightJg:100,//按钮和页面底部的间隔距离
		startline:66,//出现回到顶部按钮的滚动条scrollTop距离
		duration:666,//回到顶部的速度时间
		targetObg:"body"//目标位置
	};
})(jQuery);

$(function(){
	$(".gotoTop").goToTop();
	$(window).bind('scroll resize',function(){
		$(".gotoTop").goToTop();
	});
});
