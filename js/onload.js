function createTips() {
	$(".tips").html('向下滚动鼠标以查看更多内容').css({
		"position": "fixed",
		"top": "0",
		"bottom": "0",
		"left": "0",
		"right": "0",
		"margin": "auto",
		"width": "140px",
		"height": "100px",
		"background-color": "rgba(0, 0, 0, 0.888)",
		"box-shadow": "0px 0px 10px 10px #00ffff",
		"z-index": "101",
		"font-size": "20px",
		"text-align": "center",
		"color": "white",
		"line-height": "50px"
	});
}

window.onload = function() {

	onRightClick();

	createTips();

	$(".tips").hide();

	var loop = setInterval(function() {
		if ($(".arrow_down").is(":visible")) {
			$(".arrow_down").hide();
		} else {
			$(".arrow_down").show();
		}
	}, 888); // 规定时间自動執行

	$(document).scroll(function() { // scoll事件的单位是次数
		if (($("body").get(0).offsetHeight - $("body").get(0).clientHeight) == (Math.round($("body").scrollTop()))) {
			window.clearInterval(loop);
			$(".arrow_down").hide();
		} else {
			$(".arrow_down").show();
		}
	});

	$(".arrow_down").hover(function() {
		
		window.clearInterval(loop);
		$(".arrow_down").show();

		if ($(".tips").is(":hidden")) {
			$(".tips").show();
		}
	}, function() {
		if ($(".tips").is(":visible")) {
			$(".tips").hide();
		}
	});

	/*禁用F12 keyCode == 123 是F12的键盘码 禁用ctrl以及shift键*/
	document.onkeydown = document.onkeyup = document.onkeypress = function() {
		// onkeydown 事件会在用户按下一个键盘按键时发生。
		// onkeyup	某个键盘按键被松开。
		// onkeypress 某个键盘按键被按下并松开。
		if (window.event.keyCode == 123 || window.event.keyCode == 16 || window.event.keyCode == 17) {

			// 之前使用的是window.event.ctrlKey 和window.event.shiftKey , 
			// 它们均表示事件发生时ctrl或shift键被按下并保持，为false则键没有按下, 并不包括松开按键事件。

			$(".kidding").html( // 利用jQuery进行Html+Css的代码添加
				'Just Kidding You! HaHaHa!'
			).css({
				"position": "fixed",
				"top": "0",
				"bottom": "0",
				"left": "0",
				"right": "0",
				"margin": "auto",
				"width": "200px",
				"height": "100px",
				"background-color": "rgba(0, 0, 0, 0.888)",
				"box-shadow": "0px 0px 10px 10px #00ffff",
				"z-index": "101",
				"font-size": "20px",
				"text-align": "center",
				"color": "white",
				"line-height": "50px"
			});
			if ($(".kidding").is(':visible')) { // 判断当前元素是隐藏还是显示，然后执行相应的代码--jQuery
				setTimeout(function() {
					$(".kidding").hide();
				}, 1666);
			} else {
				$(".kidding").show();
			}

			window.event.returnValue = false;
			return (false);
		}
	}
};