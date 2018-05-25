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

<title>编辑新闻</title>
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

<!-- 自定义控件 -->
<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath }/css/admin/main.css">
	
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/admin/news/editnews.css">
<script type="text/javascript" charset="utf-8"
	src="${pageContext.request.contextPath}/js/admin/editnews.js"></script>
	
<!-- 富文本ueditor插件相关 -->	
<script type="text/javascript" charset="utf-8"
	src="${pageContext.request.contextPath}/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8"
	src="${pageContext.request.contextPath}/ueditor/ueditor.all.min.js">
</script>
<!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
<!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
<script type="text/javascript" charset="utf-8"
	src="${pageContext.request.contextPath}/ueditor/lang/zh-cn/zh-cn.js"></script>

<!-- 时间控件 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath }/jedate/jquery.jedate.js"></script>
<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath }/jedate/skin/jedate.css">

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
		<div class="row">
			<!--顶部导航栏部分-->
			<div class="col-md-12">
				<nav class="navbar navbar-inverse" role="navigation">
					<div class="container-fluid">
						<div class="navbar-header">
							<a class="navbar-brand" href="javascript:void(0)">财务管理系统后台管理</a>
						</div>
						<div>
							<ul class="nav navbar-nav navbar-right">
								<li><a href="javascript:void(0)">欢迎: <span
										class="glyphicon glyphicon-user"></span>
										${sessionScope.admin.adminname }
								</a></li>
								<li><a
									href="${pageContext.request.contextPath}/userManage/logout.action"><span
										class="glyphicon glyphicon-log-out"></span> 退出登录</a></li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<!-- 上边导航栏 -->


		<div class="row">
			<!-- 左侧栏 -->
			<div class="col-md-2">
				<div class="left">
					<ul class="nav nav-pills nav-stacked" role="tablist">
						<li><a
							href="${pageContext.request.contextPath}/userManage/findUsers.action">
								<span class="glyphicon glyphicon-user"></span> 个人用户管理
						</a></li>

						<li><a
							href="${pageContext.request.contextPath}/categoryManage/findCategorys.action">
								<span class="glyphicon glyphicon-signal"></span> 收支类别管理
						</a></li>
						<li class="active"><a
							href="${pageContext.request.contextPath}/newsManage/findNewsList.action">
								<span class="glyphicon glyphicon-folder-open"></span> 财务新闻管理
						</a></li>
					</ul>
				</div>
			</div>

			<!-- 网页的主体内容显示 -->
			<!-- 中间主体内容部分 -->
			<div class="col-md-10">
				<div class="row">
<!-- 					<div class="col-md-1 "></div> -->
					<div class="col-md-12">
						<div id="addNewsContent">
							<form name="upfile" id="upfile" method="post"
								action="${pageContext.request.contextPath}/newsManage/editNews.action">
								<div class="row">
									<div class="col-md-12 col-xs-12">
										<a href="javascript :;"
											onClick="javascript :history.back(-1);"> <span
											class="glyphicon glyphicon-arrow-left addZiti">上一页</span>
										</a>
									</div>
								</div>
								<div class="row">
									<div class="col-md-4 col-md-offset-5">
										<span style="color:green;" class="addZiti">编辑新闻</span>
									</div>
								</div>
								<div class="row">
									<div>
										<label id="myMsg" style="color:red;"></label>
									</div>
									<div class="form-group">
										<label for="nTitle" class="myzi">文章标题</label>
										<input class="form-control" type="text" id="nTitle" name="nTitle" value="${news.nTitle }">
									</div>
									<div class="form-group">
										<label for="author" class="myzi">作者</label>
										<input class="form-control" type="text" id="author" name="author" value="${news.author }">
									</div>
									<div class="form-group">
										<label for="keyword" class="myzi">关键字</label>
										<input class="form-control" type="text" id="keyword" name="keyword" value="${news.keyword }">
									</div>
									<div class="form-group">
										<label for="recordTime" class="myzi">记录日期</label>
										<input class="form-control" type="text" id="recordTime" name="recordTime"
										value="${news.recordTime }" readonly="readonly">
									</div>
									
									<div>
<!-- 									<div class="form-group"> -->
										<label class="myzi">
											文章内容
										</label>
										<script id="editor" type="text/plain"
											style="width:100%;height:370px;">${content}</script>
									</div>
									
									<div>
										<input type="hidden" id="currentPage2" name="currentPage2" value="${currentPage}">
										<input type="hidden" id="nContent" name="nContent" value="${news.nContent }">
										<input type="hidden" id="nid" name="nid" value="${news.nid }">
										<input type="hidden" id="editvalue" name="editvalue">
										<button id="mySubmit" type="button" class="btn btn-primary btn-lg"><!-- onclick="return getPlainTxt()" -->
											保存新闻
										</button>
										<input type="hidden" type="submit" hidden="hidden">
<!-- 										隐藏的表单提交按钮 -->
									</div>
								</div>
							</form>
							
						</div><!-- addNewsContent -->
						
						
						
						<script type="text/javascript">
							//实例化编辑器
							//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
							var ue = UE.getEditor('editor');
						</script>

					</div>
					<!-- col-md-12范围 -->
				</div>
				<!-- row范围 -->
			</div>
			<!-- col-md-10 范围-->
		</div>
		<!-- row -->
	</div>
	<!-- container -->
</body>
</html>