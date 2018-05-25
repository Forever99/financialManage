<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'year.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<!-- 自定义控件 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath }/jedate/jquery-1.7.2.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/jedate/jquery.jedate.js"></script>
<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath }/jedate/skin/jedate.css">

<!-- 普通方法调用方式 -->
<script type="text/javascript">
	$(function() {
		$("#test").jeDate({
			format : "YYYY",
			isTime : false,
		});

		//点击显示 YYYY年格式
		$("#ymnian").jeDate({
			isinitVal : false,
			format : "YYYY"
		});
		
		$("#month").jeDate({
			isinitVal : false,
			format : "YYYY-MM",
			festival: true
		});
	});
</script>
</head>
<body>

	只输出年：<input id="test" type="text" placeholder="请输入年" readonly="readonly">
	<br/>
	只输出年：<input  id="ymnian" type="text" placeholder="请输入年" readonly>
	<br/>
	输出年和月：<input  class="workinput wicon" id="month" type="text" placeholder="请输入年月" readonly>
	

</body>
</html>
