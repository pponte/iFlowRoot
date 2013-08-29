<html lang="en">
	<head>
	    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
	    <title>iFlow - Example Line</title>
	    <link media="screen" type="text/css" href="css/demo.css" rel="stylesheet">
	    <link media="print" type="text/css" href="css/demo-print.css" rel="stylesheet">
	    <script charset="utf-8" type="text/javascript" src="../javascript/raphael/raphael.js"></script>
	    <script charset="utf-8" type="text/javascript">
	        window.onload = function () {
	            var r = Raphael("holder", 620, 420),
	                discattr = {fill: "#1a3", stroke: "none"};
	            r.rect(0, 0, 619, 419, 10).attr({stroke: "#666"});
	            r.text(310, 20, "Drag the points to change the curves").attr({fill: "#34a", "font-size": 16});
	            function curve(x, y, ax, ay, bx, by, zx, zy, color) {
	                var path = [["M", x, y], ["C", ax, ay, bx, by, zx, zy]],
	                    path2 = [["M", x, y], ["L", ax, ay], ["M", bx, by], ["L", zx, zy]],
	                    curve = r.path(path).attr({stroke: color || Raphael.getColor(), "stroke-width": 4, "stroke-linecap": "round"}),
	                    controls = r.set(
	                        r.path(path2).attr({stroke: "#ccc", "stroke-dasharray": ". "}),
	                        r.circle(x, y, 5).attr(discattr),
	                        r.circle(ax, ay, 5).attr(discattr),
	                        r.circle(bx, by, 5).attr(discattr),
	                        r.circle(zx, zy, 5).attr(discattr)
	                    );
	                controls[1].update = function (x, y) {
	                    var X = this.attr("cx") + x,
	                        Y = this.attr("cy") + y;
	                    this.attr({cx: X, cy: Y});
	                    path[0][1] = X;
	                    path[0][2] = Y;
	                    path2[0][1] = X;
	                    path2[0][2] = Y;
	                    controls[2].update(x, y);
	                };
	                controls[2].update = function (x, y) {
	                    var X = this.attr("cx") + x,
	                        Y = this.attr("cy") + y;
	                    this.attr({cx: X, cy: Y});
	                    path[1][1] = X;
	                    path[1][2] = Y;
	                    path2[1][1] = X;
	                    path2[1][2] = Y;
	                    curve.attr({path: path});
	                    controls[0].attr({path: path2});
	                };
	                controls[3].update = function (x, y) {
	                    var X = this.attr("cx") + x,
	                        Y = this.attr("cy") + y;
	                    this.attr({cx: X, cy: Y});
	                    path[1][3] = X;
	                    path[1][4] = Y;
	                    path2[2][1] = X;
	                    path2[2][2] = Y;
	                    curve.attr({path: path});
	                    controls[0].attr({path: path2});
	                };
	                controls[4].update = function (x, y) {
	                    var X = this.attr("cx") + x,
	                        Y = this.attr("cy") + y;
	                    this.attr({cx: X, cy: Y});
	                    path[1][5] = X;
	                    path[1][6] = Y;
	                    path2[3][1] = X;
	                    path2[3][2] = Y;
	                    controls[3].update(x, y);
	                };
	                controls.drag(move, up);
	            }
	            function move(dx, dy) {
	                this.update(dx - (this.dx || 0), dy - (this.dy || 0));
	                this.dx = dx;
	                this.dy = dy;
	            }
	            function up() {
	                this.dx = this.dy = 0;
	            }
	            curve(70, 100, 110, 100, 130, 200, 170, 200, "hsb(0, .75, .75)");
	            curve(170, 100, 210, 100, 230, 200, 270, 200, "hsb(.8, .75, .75)");
	            curve(270, 100, 310, 100, 330, 200, 370, 200, "hsb(.3, .75, .75)");
	            curve(370, 100, 410, 100, 430, 200, 470, 200, "hsb(.6, .75, .75)");
	            curve(470, 100, 510, 100, 530, 200, 570, 200, "hsb(.1, .75, .75)");
	        };
	    </script>
	</head>
	<body>
	    <div id="holder"><svg height="420" version="1.1" width="620" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden; position: relative; top: -0.5px;"><desc>Created with Raphaël 2.1.0</desc><defs/><rect x="0" y="0" width="619" height="419" r="10" rx="10" ry="10" fill="none" stroke="#666666" style=""/><text style="text-anchor: middle; font: 16px &quot;Arial&quot;;" x="310" y="20" text-anchor="middle" font="10px &quot;Arial&quot;" stroke="none" fill="#ffffff" font-size="16px"><tspan dy="6">Drag the points to change the curves</tspan></text><path style="stroke-linecap: round;" fill="none" stroke="#bf2f2f" d="M70,100C110,100,130,200,170,200" stroke-width="4" stroke-linecap="round"/><path style="" fill="none" stroke="#cccccc" d="M70,100L110,100M130,200L170,200" stroke-dasharray="1,3"/><circle cx="70" cy="100" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="110" cy="100" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="130" cy="200" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="170" cy="200" r="5" fill="#ffffff" stroke="none" style=""/><path style="stroke-linecap: round;" fill="none" stroke="#a22fbf" d="M170,100C210,100,230,200,270,200" stroke-width="4" stroke-linecap="round"/><path style="" fill="none" stroke="#cccccc" d="M170,100L210,100M230,200L270,200" stroke-dasharray="1,3"/><circle cx="170" cy="100" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="210" cy="100" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="230" cy="200" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="270" cy="200" r="5" fill="#ffffff" stroke="none" style=""/><path style="stroke-linecap: round;" fill="none" stroke="#4cbf2f" d="M270,100C310,100,330,200,370,200" stroke-width="4" stroke-linecap="round"/><path style="" fill="none" stroke="#cccccc" d="M270,100L310,100M330,200L370,200" stroke-dasharray="1,3"/><circle cx="270" cy="100" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="310" cy="100" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="330" cy="200" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="370" cy="200" r="5" fill="#ffffff" stroke="none" style=""/><path style="stroke-linecap: round;" fill="none" stroke="#2f69bf" d="M370,100C410,100,430,200,470,200" stroke-width="4" stroke-linecap="round"/><path style="" fill="none" stroke="#cccccc" d="M370,100L410,100M430,200L470,200" stroke-dasharray="1,3"/><circle cx="370" cy="100" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="410" cy="100" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="430" cy="200" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="470" cy="200" r="5" fill="#ffffff" stroke="none" style=""/><path style="stroke-linecap: round;" fill="none" stroke="#bf852f" d="M470,100C510,100,530,200,570,200" stroke-width="4" stroke-linecap="round"/><path style="" fill="none" stroke="#cccccc" d="M470,100L510,100M530,200L570,200" stroke-dasharray="1,3"/><circle cx="470" cy="100" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="510" cy="100" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="530" cy="200" r="5" fill="#ffffff" stroke="none" style=""/><circle cx="570" cy="200" r="5" fill="#ffffff" stroke="none" style=""/></svg></div>
    
</body></html>