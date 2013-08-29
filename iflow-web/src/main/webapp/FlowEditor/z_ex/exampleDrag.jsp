<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>iFlow Editor</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<meta http-equiv="Pragma" content="no-cache"/>
		
		<script type="text/javascript" src="../javascript/messages.js"> </script><!-- default messages -->
		<script type="text/javascript" src="../javascript/moo1.2.js"></script>
		<script type="text/javascript" src="../javascript/ajax_processing.js"></script>

		<style type="text/css">
			/* this is generally a good idea */
			body {
				margin: 0;
				padding: 0;
			}
			 
			/* make sure the draggable element has "position: absolute" 
			 and then top and left are set for the start position */
			#drag_me {
				width: 100px;
				height: 100px;
				background-color: #333;
				position: absolute;
				top: 0;
				left: 0;
			}
			 
			#drop_here {
				width: 200px;
				height: 200px;
				background-color: #eee;
			}
			 
			/* make sure the drag container is set with position relative */
			#drag_cont {
				background-color: #ccc;
				height: 600px;
				width: 500px;
				position: relative;
				margin-top: 100px;
				margin-left: 100px;
			}
			 
			#drag_me_handle {
				width: 100%;
				height: auto;
				background-color: #666;
			
			}
			 
			#drag_me_handle span {
				display: block;
				padding: 5px;
			}
			 
			.indicator {
				width: 100%;
				height: auto;
				background-color: #0066FF;
				border-bottom: 1px solid #eee;
			}
			 
			.indicator span {
				padding: 10px;
				display: block;
			}
			 
			.draggable {
				width: 200px;
				height: 200px;
				background-color: blue;
			}
		</style>

		<script type="text/javascript">
			window.addEvent('domready', function() {
	
				var dragElement = $('drag_me');
				var dragContainer = $('drag_cont');
				var dragHandle = $('drag_me_handle');
				var dropElement = $$('.draggable');
				var startEl = $('start');
				var completeEl = $('complete');
				var dragIndicatorEl = $('drag_ind');
				var enterDrop = $('enter');
				var leaveDrop = $('leave');
				var dropDrop = $('drop_in_droppable'); 
	
				var myDrag = new Drag.Move(dragElement, {
					// Drag.Move options
					droppables: dropElement,
					container: dragContainer,
					// Drag options
					handle: dragHandle,
					// Drag.Move Events
					onDrop: function(el, dr) {
						if (!dr) { }
						else {
							dropDrop.highlight('#FB911C'); //flashes orange
							el.highlight('#fff'); //flashes white
							dr.highlight('#667C4A'); //flashes green
						};
					},
					onLeave: function(el, dr) {
						leaveDrop.highlight('#FB911C'); //flashes orange
					},
					onEnter: function(el, dr) {
						enterDrop.highlight('#FB911C'); //flashes orange
					},
					// Drag Events
					onStart: function(el) {
						startEl.highlight('#FB911C'); //flashes orange
					},
					onDrag: function(el) {
						dragIndicatorEl.highlight('#FB911C'); //flashes orange
					},
					onComplete: function(el) {
						completeEl.highlight('#FB911C'); //flashes orange
					}
				});
			});
		</script>

	</head>
	
	<body>
	
		<form name="editor">
			<div id="drag_cont">
				<div id="start" class="indicator"><span>Start</span></div>
				<div id="drag_ind" class="indicator"><span>Drag</span></div>
				<div id="complete" class="indicator"><span>Complete</span></div>
				<div id="enter" class="indicator"><span>Enter Droppable Element</span></div>
				<div id="leave" class="indicator"><span>Leave Droppable Element</span></div>
				<div id="drop_in_droppable" class="indicator"><span>Dropped in Droppable Element</span></div>
				<div id="drag_me">
					<div id="drag_me_handle"><span>handle</span></div>
				</div>
				<div id="drop_here" class="draggable"></div>
			</div>
		</form>
	</body>
</html>