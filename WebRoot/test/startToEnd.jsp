<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML>
<html>
<head>
<!-- jaDate插件 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath }/jedate/jquery-1.7.2.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/jedate/jquery.jedate.js"></script>
<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath }/jedate/skin/jedate.css">

</head>
<body>
	<!--   【自定义日期格式】 -->
	<span class="wstxt">开始日期：</span>
	<input type="text" class="workinput wicon" id="inpstart" readonly>
	<span class="wstxt">结束日期：</span>
	<input type="text" class="workinput wicon" id="inpend" readonly>
	<script>
		var start = {
			format : 'YYYY-MM-DD',
			minDate : '2014-06-16 23:59:59', //设定最小日期为当前日期
			isinitVal : false,
			maxDate : $.nowDate({DD : 0}), //最大日期
			//     onClose:false,
			okfun : function(obj) {
				end.minDate = obj.val; //开始日选好后，重置结束日的最小日期
				endDates();
			}
		};
		var end = {
			format : 'YYYY-MM-DD',
			minDate : $.nowDate({DD : 0}), //设定最小日期为当前日期
			maxDate : '2099-06-16 23:59:59', //最大日期
			//      onClose:false,
			okfun : function(obj) {
				start.maxDate = obj.val; //将结束日的初始值设定为开始日的最大日期
			}
		};
		//这里是日期联动的关键        
		function endDates() {
			//将结束日期的事件改成 false 即可
			end.trigger = false;
			$("#inpend").jeDate(end);
		}
		$('#inpstart').jeDate(start);
		$('#inpend').jeDate(end);

		//或者是
		$.jeDate('#inpstart', start);
		$.jeDate('#inpend', end);
	</script>

</body>
</html>
