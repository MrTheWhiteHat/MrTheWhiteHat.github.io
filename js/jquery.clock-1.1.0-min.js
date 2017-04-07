! function(a) {
	var b = function() {
		var b = this; /*变量b： 就是整个对象*/
		b.o = {  /*变量o：就是选项options*/
			width: 320,
			height: 320,
			theme: "t1",
			date: new Date
		}, b.ts = { /*时钟的颜色*/
			t1: ["#ff00ff", "#00ffff", "#fc9a13", "#fff", "#666"],
			t2: ["#adc3c0", "#576069", "#b9e3d9", "#f3f4f6", "#f74461"],
			t3: ["#dbd0a7", "#123555", "#d1494e", "#e1eed2", "#e69b03"]
		}, b.init = function(c, d) {
			d && a.extend(b.o, d), b.el = c, b.o.theme in b.ts ? b.t = b.ts[b.o.theme] : b.t = b.ts.t1, b.o.height < 43 * b.o.width / 30 ? b.w = 30 * b.o.height / 30 : b.w = b.o.width, /*控制时钟的宽高*/b.h = 30 * b.w / 30, b.r = b.w / 2, b.c = {
				f: {
					canvas: a("<canvas>")
				},
				p: {
					canvas: a("<canvas>")
				}
			};
			var e = b.c;
			return e.f.context = e.f.canvas[0].getContext("2d"), e.p.context = e.p.canvas[0].getContext("2d"), e.f.canvas.attr({
				width: b.w,
				height: b.w
			}), e.p.canvas.attr({
				width: b.w,
				height: b.h /*控制时间有关的canvas的大小*/
			}), e.f.canvas.css("position", "absolute"), e.p.canvas.css("position", "absolute"), b.el.css({
				width: b.o.width, 
				height: b.o.height /*控制canvas的大小*/
			}), b.el.append(e.f.canvas, e.p.canvas/*绘制时间包括时针、分针、秒针、数字等*/), b.d = d && "date" in d && (new Date).getTime() - d.date.getTime() || 0, b.paintClock(), b.lt = new Date, b.start(), b
		}, b.paintClock = function() {
			b.paintF(b.c.f.context), b.paintPs(b.c.p.context)
		}, b.paintF = function(a) {
			var c = {
				context: a,
				type: "stroke",
				style: b.t[0],
				x: b.r,
				y: b.r,
				r: b.r - 1,
				sAngle: 0,
				eAngle: 0, /*控制表盘白色面积的大小变量 ： n*MATH.PI */
				counterclockwise: !0
			};
			e(c), c.type = "fill", c.style = b.t[3], e(c), c.r = .9 * b.r, c.style = b.t[0], e(c), c.r = .5 * b.r, c.style = b.t[3], e(c);
			for (var d = {
					context: a,
					type: "stroke",
					style: b.t[1],
					points: []
				}, g = 0, h = .99 * b.r, i = .92 * b.r, j = 0; 60 > j; ++j) d.points = [{
				x: b.r + h * Math.cos(g),
				y: b.r + h * Math.sin(g)
			}, {
				x: b.r + i * Math.cos(g),
				y: b.r + i * Math.sin(g)
			}], f(d), g += Math.PI / 30;
			a.lineWidth = 2, /*控制时钟盘的轴的大小*/ a.textBaseline = "middle", a.textAlign = "center", a.font = .15 * b.r + "px Calibri", g = 0, h = .99 * b.r, i = .88 * b.r;
			for (var j = 0, k = 3; 12 > j; ++j, ++k < 13 ? 0 : k = 1) d.style = b.t[1], d.points = [{
				x: b.r + h * Math.cos(g),
				y: b.r + h * Math.sin(g)
			}, {
				x: b.r + i * Math.cos(g),
				y: b.r + i * Math.sin(g)
			}], f(d), d.style = b.t[3], d.points[0] = d.points[1], d.points[2] = {
				x: b.r,
				y: b.r
			}, f(d), a.fillStyle = b.t[1], a.fillText(k, b.r + .81 * b.r * Math.cos(g), b.r + .81 * b.r * Math.sin(g)), g += Math.PI / 6;
			c.r = .2 * b.r, c.style = b.t[1], e(c), c.r = .04 * b.r, c.style = b.t[4], e(c)
		}, b.hc = .55, b.mc = .7, b.sc = .85, b.paintPs = function(a) {
			a.clearRect(0, 0, b.o.width, b.o.height);
			var f = new Date;
			f.setTime(f.getTime() - b.d);
			var g = f.getHours(), /*变量g: 控制小时*/
				h = f.getMinutes(),
				i = f.getSeconds(),
				j = i * Math.PI / 30,
				k = h + i / 60,
				l = k * Math.PI / 30,
				m = g % 12 + k / 60,
				n = m * Math.PI / 6;
			a.textBaseline = "middle", a.textAlign = "center", a.font = .1 * b.r + "px YaHei",/*控制“AM／PM”字的大小*/ a.fillStyle = b.t[2], a.fillText(g >= 12 ? "PM" : "AM", 1.35 * b.r, b.r), d(a, j, b.sc), d(a, l, b.mc), d(a, n, b.hc);
			var o = {
				context: a,
				type: "fill",
				style: b.t[4],
				x: b.r,
				y: b.r,
				r: .02 * b.r,
				sAngle: 0,
				eAngle: 2 * Math.PI,
				counterclockwise: !0
			};
			/*控制数字一行样式*/
			e(o), b.iw = b.w / 3, a.font = .4 * b.iw + "px YaHei",/*控制数字的字体大小*/ a.fillStyle = "#000", a.lineWidth = .12 * b.iw; /*控制数字旁边的外圈大小*/
			var p = 1.1 * b.w + .5 * b.iw,
				q = .5 * b.iw;
			o.y = p, o.r = .3 * b.iw, o.type = "stroke", o.eAngle = -.5 * Math.PI, a.fillText(c(g), q, p), o.x = q, o.style = b.t[2], o.sAngle = n - .5 * Math.PI, e(o), q += b.iw, a.fillText(c(h), q, p), o.x = q, o.style = b.t[1], o.sAngle = l - .5 * Math.PI, e(o), q += b.iw, a.fillText(c(i), q, p), o.x = q, o.style = b.t[0], o.sAngle = j - .5 * Math.PI, e(o)
		}, b.start = function() {
			b.d += (new Date).getTime() - b.lt.getTime(), b.paintPs(b.c.p.context), b.tm = setInterval(function() {
				b.paintPs(b.c.p.context)
			}, 1e3)
		}, b.pause = function() {
			b.lt = new Date, b.tm = clearInterval(b.tm)
		}, b.setTime = function(a) {
			b.d = (new Date).getTime() - a.getTime()
		};
		var c = function(a) {
				return 10 > a ? "0" + a : a
			},
			d = function(a, c, d) {
				var e = {
					context: a,
					type: "fill",
					style: b.t[2],
					points: [{
						x: b.r * (1 + d * Math.sin(c)),
						y: b.r * (1 - d * Math.cos(c))
					}, {
						x: b.r * (1 + .02 * Math.cos(c)),
						y: b.r * (1 + .02 * Math.sin(c))
					}, {
						x: b.r * (1 - .15 * d * Math.sin(c)),
						y: b.r * (1 + .15 * d * Math.cos(c))
					}, {
						x: b.r * (1 - .02 * Math.cos(c)),
						y: b.r * (1 - .02 * Math.sin(c))
					}]
				};
				f(e)
			},
			e = function(a) {
				a.context.beginPath(), a.context.arc(a.x, a.y, a.r, a.sAngle, a.eAngle, a.counterclockwise), "stroke" === a.type ? (a.context.strokeStyle = a.style, a.context.stroke()) : (a.context.fillStyle = a.style, a.context.fill()), a.context.closePath()
			},
			f = function(a) {
				var b = a.points.length;
				if (!(2 > b)) {
					a.context.beginPath(), a.context.moveTo(a.points[0].x, a.points[0].y);
					for (var c = 1; b > c; ++c) a.context.lineTo(a.points[c].x, a.points[c].y);
					"stroke" === a.type ? (a.context.strokeStyle = a.style, a.context.stroke()) : (a.context.lineTo(a.points[0].x, a.points[0].y), a.context.fillStyle = a.style, a.context.fill()), a.context.closePath()
				}
			}
	};
	a.fn.clock = function(c) {
		var d = this.length;
		return this.each(function(e) {
			var f = a(this),
				g = "clock" + (d > 1 ? "-" + ++e : ""),
				h = (new b).init(f, c);
			f.data(g, h).data("key", g)
		})
	}
}(jQuery);