<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<title>iFlow Editor</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<meta http-equiv="Pragma" content="no-cache"/>
		
		<!--  JavaScript -->
	    <script charset="utf-8" type="text/javascript" src="javascript/editor/commons.js"></script>
	    <script charset="utf-8" type="text/javascript" src="javascript/editor/block.js"></script>
	    <script charset="utf-8" type="text/javascript" src="javascript/editor/ports.js"></script>
	    <script charset="utf-8" type="text/javascript" src="javascript/editor/grid.js"></script>
	    <script charset="utf-8" type="text/javascript" src="javascript/editor/line.js"></script>
	    <script charset="utf-8" type="text/javascript" src="javascript/editor/holder.js"></script>
	    <script charset="utf-8" type="text/javascript" src="javascript/editor/libraries.js"></script>

	    <script charset="utf-8" type="text/javascript" src="javascript/raphael/raphael.js"></script>
		<script type="text/javascript" src="javascript/ajax/ajax_processing.js"></script>
		<script type="text/javascript" src="javascript/jquery/jquery.js"></script>
		<script type="text/javascript" src="javascript/jquery/jquery-ui.js"></script>
		<script type="text/javascript" src="javascript/jquery/mousewheel.js"></script>

		<!--  CSS -->
	    <link media="screen" type="text/css" href="css/editor.css" rel="stylesheet">

		<script type="text/javascript">
			var gridStepCtrl;
			var discattr = {fill: "#555", stroke: "none"};
			var holder;
		    window.onload = function () {
			  initHolderControl();
		      iniGridStepControl();
		      iniLibrariesControl();
		    };
		</script>

	</head>
	
	<body>
		<form>
			<table>
				<tr>
					<td id="x" height="20px" colspan="2">Menus</td>
				</tr>
				<tr>
					<td height="20px" colspan="2">
						<label for="gridstep">grid:</label><input onchange="applyGridLimits(this);applyGridStep();" id="gridstep" name="value" />
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<label for="curve">curve:</label><input style="width:25px" onchange="if (!isNaN(this.value)){ CURVE_DIST = parseInt(this.value); }" id="curve" name="curve"/>
					</td>
				</tr>
				<tr>
					<td>
						<div id="holder" style="height: 100%; width: 100%; position: relative; margin-top: 0px; margin-left: 0px;">
						</div>
					</td>
					<td width="200px">
						<table id="libraries">
							<tr id="lastLine"><td>&nbsp;</td></tr>
						</table>
					</td>
				</tr>
			</table>
		</form>
	</body>
</html>

