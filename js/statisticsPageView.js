
	var caution = false // caution： 谨慎

	function setCookie(name, value, expires, ip, path, domain, secure) {
		var curCookie = name + "=" + escape(value) +	// escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。
			((expires) ? ";expires=" + expires.toGMTString() : "") + // toGMTString() 方法可根据格林威治时间 (GMT) 把 Date 对象转换为字符串，并返回结果。
			((ip) ? ";ip=" + ip : "") + // cookie是以分号隔开的一串字符，ip这个参数是否赋值，如果赋值就将ip参数的值赋给";ip=",也就是向cookie中添加这个ip字符选项。
			((path) ? "; path=" + path : "") +
			((domain) ? "; domain=" + domain : "") +
			((secure) ? ";secure" : "")
			 
		if (!caution || (name + "=" + escape(value)).length <= 4000) { // length 属性可设置或返回数组中元素的数目
			document.cookie = curCookie // document: 是HTML DOM 对象， cookie是这个对象的属性，设置或返回与当前文档有关的所有cookie。
		} else if (confirm("Cookie exceeds 4KB and will be cut!")) { // confirm() 方法用于显示一个带有指定消息和 OK 及取消按钮的对话框，属于HTML　DOM　window对象下的方法
			document.cookie = curCookie // exceeds: 超过; 超越; 胜过; 越过…的界限;

		}
	}

	function getCookie(name) {
		var prefix = name + "=" // prefix : 前缀，字首
		var cookieStartIndex = document.cookie.indexOf(prefix) // indexOf() 方法： 可返回某个指定的字符串值在字符串中首次出现的位置（是一个数字）。
		if (cookieStartIndex == -1) { // indexOf()方法： 如果要检索的字符串值没有出现，则该方法返回 -1。
			return null
		}
		var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length) 
		// stringObject.indexOf(searchvalue,fromindex)
		// searchvalue	必需。规定需检索的字符串值。
		// fromindex	可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。
		if (cookieEndIndex == -1) {
			cookieEndIndex = document.cookie.length
		}
		return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex)) // 提取字首与“;”之间的字符串进行解码
		// unescape() 函数可对通过 escape() 编码的字符串进行解码
		// substring() 方法用于提取字符串中介于两个指定下标之间的字符
	}

	function getIP(name) {
		var prefix = ";ip="
		var cookieStartIndex = document.cookie.indexOf(prefix)
		if (cookieStartIndex == -1) {
			return null
		}
		var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length)
		if (cookieEndIndex == -1) {
			cookieEndIndex = document.cookie.length
		}

		return (document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex))
	}

	function deleteCookie(name, path, domain) {
		if (getCookie(name)) {
			document.cookie = name + "=" +
				((path) ? "; path=" + path : "") +
				((domain) ? "; domain=" + domain : "") +
				"; expires=Thu, 01-Jan-70 00:00:01 GMT"
		}
	}

	function fixDate(date) {
		var base = new Date(0) // Date 对象会自动把当前日期和时间保存为其初始值
		var skew = base.getTime() // getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数。 skew: 偏差，偏离
		if (skew > 0) {
			date.setTime(date.getTime() - skew) // setTime() 以毫秒设置 Date 对象。
		}
	}

	function contains(arr, obj) {  // 判断对象是否在数组内
	    var i = arr.length;  
	    while (i--) {  
	        if (arr[i] === obj) {  
	            return true;  
	        }  
	    }  
	    return false;  
	} 

	var now = new Date()	
	fixDate(now)
	now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000)
	var visits = getCookie("counter")
	//arr = str.split(","); // 将字符串转化成数组
	if (!visits) { // visits = false / 0
		visits = 1;
	} else {
		visits = parseInt(visits) + 1;  
	}
	//str = arr.join(","); // 将数组转化成字符串			  				
	setCookie("counter", visits, now)
	document.write("您的IP为<i>  " + returnCitySN['cip'] + "</i>    来自<i>" + returnCitySN['cname'] + "</i>");
	document.write("<br> 您第<i>" + visits + "</i>次访问本站！") 