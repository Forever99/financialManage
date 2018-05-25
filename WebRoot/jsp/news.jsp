<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="f"%> --%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML>
<html>
<head>
<base href="<%=basePath%>">

<title>财务新闻</title>
<!-- 屏幕和设备的屏幕一致，初始缩放为1:1，进制用户缩放 -->
<meta name="viewport"
	content="width=device-width,initial-scale=1,user-scalable=no">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<!-- 引入外部的bootstrap中的css文件 -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css">
<!-- jquery文件，务必在bootstrap.min.js之前引入 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery/jquery.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js"></script>


<script type="text/javascript">
	//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外  
	function forbidBackSpace(e) {
		var ev = e || window.event; //获取event对象  
		var obj = ev.target || ev.srcElement; //获取事件源  
		var t = obj.type || obj.getAttribute('type'); //获取事件源类型  
		//获取作为判断条件的事件类型  
		var vReadOnly = obj.readOnly;
		var vDisabled = obj.disabled;
		//处理undefined值情况  
		vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
		vDisabled = (vDisabled == undefined) ? true : vDisabled;
		//当敲Backspace键时，事件源类型为密码或单行、多行文本的，  
		//并且readOnly属性为true或disabled属性为true的，则退格键失效  
		var flag1 = ev.keyCode == 8
				&& (t == "password" || t == "text" || t == "textarea")
				&& (vReadOnly == true || vDisabled == true);
		//当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效  
		var flag2 = ev.keyCode == 8 && t != "password" && t != "text"
				&& t != "textarea";
		//判断  
		if (flag2 || flag1)
			return false;
	}
	//禁止后退键 作用于Firefox、Opera  
	document.onkeypress = forbidBackSpace;
	//禁止后退键  作用于IE、Chrome  
	document.onkeydown = forbidBackSpace;
</script>
</head>

<body>
	<div class="container">
		<!-- 网页的主体内容显示 -->
		<!-- 中间主体内容部分 -->
		<div class="row">
			<div class="col-md-1"></div>
			<div class="col-md-10">
				<div class="row">
					<div class="col-md-12">
						<div id="addNewsContent">
							<div class="row">
								<div class="text-center">
									<span style="color:green;font-size:30px ;">${news.nTitle }</span>
								</div>
							</div>
							<div class="row">
								<div class="text-center" style="margin-bottom:20px;">
									<span style="font-size:14px ;font-family: STHeiti；">${news.author }</span> &nbsp;&nbsp;
									<span>${news.keyword }</span>  &nbsp;&nbsp;
									<span>${news.recordTime }</span>  
								</div>

								<div>
									<span style="font-size:18px ;">${content}</span>
<!-- 									<label  style="font-size:15px ;font-family:STKaiti ! important;"> </label> -->
								</div>

							</div>

						</div>
					</div>
					<!-- col-md-12范围 -->
				</div>
				<!-- row范围 -->
			</div>
			<!-- col-md-10 范围-->
			<div class="col-md-1"></div>
			<!-- row范围 -->
		</div>
	</div>
	<!-- container -->
</body>
</html>