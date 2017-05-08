// js检查浏览器类型与版本
function checkBrowser() {
	
	if(navigator.userAgent.indexOf("Opera") != -1) { 
		alert('Opera'); 
	} else if(navigator.userAgent.indexOf("MSIE") != -1) { 
		alert('您的IE浏览器不受本站点支持，请使用Chrome，Firefox, Opera等浏览器');
		window.opener=null;
			window.open('','_self');
			window.close();
	} else if(navigator.userAgent.indexOf("Firefox") != -1) { 
		
	} else if(navigator.userAgent.indexOf("Netscape") != -1) { 
		 
	} else if(navigator.userAgent.indexOf("Chrome") != -1) { 
		 
	} else if(navigator.userAgent.indexOf("Safari") != -1) {
		 
	} else if(navigator.userAgent.indexOf("Edge") != -1) {
		
	}else { 
		alert('您的Edge浏览器不受本站点支持，请使用Chrome，Firefox, Opera等浏览器');
		
		// 窗口自动关闭
		
		window.opener=null;
			window.open('','_self');
			window.close();  
	}
}
checkBrowser();