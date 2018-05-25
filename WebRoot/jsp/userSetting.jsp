<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%-- <%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="f"%> --%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!doctype html>
<html>

<head>
<base href="<%=basePath%>">

<title>用户设置</title>
<!-- 屏幕和设备的屏幕一致，初始缩放为1:1，进制用户缩放 -->
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 手机响应式侧边栏的相关css文件 -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/app/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/app/css/default.css">
<link
	href="${pageContext.request.contextPath}/app/css/offcanvas.min.css"
	rel="stylesheet" type="text/css">

<!-- 引入外部的bootstrap中的css文件 -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css">
<!-- jquery文件，务必在bootstrap.min.js之前引入 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery/jquery.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js"></script>

<!-- 自定义控件 -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/userSetting.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/userSetting.js">
	
</script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/app/js/offcanvas.js"></script>
<script type="text/javascript">
	/* 	//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外  
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
	 document.onkeydown = forbidBackSpace; */
</script>
</head>

<body>
	<!-- 导航栏的制作 -->
	<div class="overlay"></div>
	<nav class="navbar navbar-default navbar-static-top">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed pull-left"
					data-toggle="offcanvas">
					<span class="sr-only">切换导航</span> <span class="icon-bar"></span> <span
						class="icon-bar"></span> <span class="icon-bar"></span>
				</button>
				<a class="navbar-brand">财务管理系统</a>
			</div>
			<div id="navbar" class="collapse navbar-collapse sidebar-offcanvas">
				<!-- 导航元素 -->
				<ul class="nav navbar-nav">
					<li class="active"><a
						href="${pageContext.request.contextPath}/shouzhiRecord/findShouzhiRecord.action">财务管理</a></li>
					<li><a
						href="${pageContext.request.contextPath}/toFinancialCount.action">财务统计</a></li>
					<li><a
						href="${pageContext.request.contextPath}/financialAnalysis/toFinancialAnalysis.action">财务分析</a></li>
					<li><a
						href="${pageContext.request.contextPath}/budget/findBudget.action">财务预算</a></li>
					<li><a
						href="${pageContext.request.contextPath}/wishlist/findAllWishList.action">心愿单</a></li>
					<li><a
						href="${pageContext.request.contextPath}/memorandum/listMemorandum.action">备忘录</a></li>
					<li><a href="#" data-toggle="modal"
						data-target="#countMachine" class="hidden-xs">计算器</a></li>
					<li><a
						href="${pageContext.request.contextPath}/news/findNewsList.action?currentPage=0">财务新闻</a></li>
				</ul>

				<!-- 导航元素 -->
				<ul class="nav navbar-nav navbar-right">
					<li><a href="javascript:void(0)">欢迎：${sessionScope.user.username}</a></li>

					<li class="dropdown" id="user_setting">
						<button type="button" class="btn dropdown-toggle"
							id="dropdownMenu1" data-toggle="dropdown">
							<span class="glyphicon glyphicon-user"></span>&nbsp;用户设置 <span
								class="caret"></span>
						</button>
						<ul class="dropdown-menu" role="menu"
							aria-labelledby="dropdownMenu1">
							<li role="presentation"><a role="menuitem" tabindex="-1"
								href="${pageContext.request.contextPath}/user/toUserSetting.action">
									<span class="glyphicon glyphicon-user"></span>用户设置
							</a></li>
							<li role="presentation" class="divider"></li>
							<li role="presentation"><a role="menuitem" tabindex="-1"
								href="${pageContext.request.contextPath}/user/logout.action">
									<span class="glyphicon glyphicon-log-out"></span>退出登录
							</a> <input type="hidden" id="uid" name="uid"
								value="${sessionScope.user.uid }"></li>
						</ul>
					</li>
					<!-- 用户设置范围 -->
				</ul>
			</div>
			<!--/.nav-collapse -->
		</div>
	</nav>

	<!-- 制作响应式的导航栏 -->
	<button type="button" class="navbar-toggle" data-toggle="collapse"
		data-target="#home-navbar-collapse">
		<span class="sr-only">切换导航</span>
		<!-- 按钮的形状样式 -->
		<span class="icon-bar"></span> <span class="icon-bar"></span> <span
			class="icon-bar"></span>
	</button>

	<a class="navbar-brand"> 财务管理系统 <!-- <img alt="财务管理系统" src="${pageContext.request.contextPath}/images/homePage.jpg"> -->
	</a>
	</div>

	<div class="collapse navbar-collapse" id="home-navbar-collapse">
		<!-- 导航元素 -->
		<ul class="nav navbar-nav">
			<li><a
				href="${pageContext.request.contextPath}/shouzhiRecord/findShouzhiRecord.action">财务管理</a></li>
			<li><a
				href="${pageContext.request.contextPath}/toFinancialCount.action">财务统计</a></li>
			<li><a
				href="${pageContext.request.contextPath}/financialAnalysis/toFinancialAnalysis.action">财务分析</a></li>
			<li><a
				href="${pageContext.request.contextPath}/budget/findBudget.action">财务预算</a></li>
			<li><a
				href="${pageContext.request.contextPath}/wishlist/findAllWishList.action">心愿单</a></li>
			<li><a
				href="${pageContext.request.contextPath}/memorandum/listMemorandum.action">备忘录</a></li>
			<li class="hidden-xs"><a href="#" data-toggle="modal"
				data-target="#countMachine">计算器</a></li>
			<li><a
				href="${pageContext.request.contextPath}/news/findNewsList.action?currentPage=0">财务新闻</a></li>
		</ul>

		<!-- 导航元素 -->
		<ul class="nav navbar-nav navbar-right">
			<li><a href="javascript:void(0)">欢迎：${sessionScope.user.username}</a></li>

			<li class="dropdown" id="user_setting">
				<button type="button" class="btn dropdown-toggle" id="dropdownMenu1"
					data-toggle="dropdown">
					<span class="glyphicon glyphicon-user"></span>&nbsp;用户设置 <span
						class="caret"></span>
				</button>
				<ul class="dropdown-menu" role="menu"
					aria-labelledby="dropdownMenu1">
					<li role="presentation"><a role="menuitem" tabindex="-1"
						href="${pageContext.request.contextPath}/user/toUserSetting.action">
							<span class="glyphicon glyphicon-user"></span>用户设置
					</a></li>
					<li role="presentation" class="divider"></li>
					<li role="presentation"><a role="menuitem" tabindex="-1"
						href="${pageContext.request.contextPath}/user/logout.action">
							<span class="glyphicon glyphicon-log-out"></span>退出登录
					</a> <input type="hidden" id="uid" name="uid"
						value="${sessionScope.user.uid }"></li>
				</ul>
			</li>
			<!-- 用户设置范围 -->
		</ul>
	</div>
	</div>


	<!-- 网页的主体内容显示 -->
	<div class="container" id="mainContent">
		<div class="row-offcanvas row-offcanvas-left">
			<div class="starter-template">
				<div class="row">
					<!-- 			<div class="col-md-1"></div> -->
					<div class="col-md-12">

						<div class="panel panel-info">
							<div class="panel-heading">
								<h2 class="panel-title">用户信息设置</h2>
							</div>
							<div class="panel-body">
								<!-- 这是一个基本的面板 -->
								<!-- 					action="${pageContext.request.contextPath}/user/editUser.action"  -->
								<form id="myform" method="post"
									action="${pageContext.request.contextPath}/user/editUser.action">
									<!-- 输入框组 -->
									<!-- 用户名或者密码输入错误，请重新输入 -->
									<div>
										<label id="msgLabel">${msg }</label>
									</div>
									<!-- 输入框组 -->
									<div class="form-group">
										<div class="input-group">
											<div class="input-group-addon">
												<span class="glyphicon glyphicon-user" id="icon"></span>
											</div>
											<input type="hidden" id="oldusername" name="oldusername"
												value="${user.username }"> <input type="text"
												class="form-control" placeholder="请输入用户名" name="username"
												id="username" value="${user.username }">
										</div>
									</div>


									<!-- 输入框组 -->
									<div class="form-group">
										<div class="input-group">
											<div class="input-group-addon">
												<span class="glyphicon glyphicon-lock" id="icon"></span>
											</div>
											<input type="password" class="form-control"
												placeholder="请输入密码" name="password" id="password"
												required="required" value="${user.password }">
										</div>
									</div>

									<!-- 输入框组 -->
									<div class="form-group">
										<div class="input-group">
											<div class="input-group-addon">
												<span class="glyphicon glyphicon-envelope" id="icon"></span>
											</div>
											<input type="email" class="form-control" placeholder="请输入邮箱"
												name="email" id="email" value="${user.email }">
										</div>
									</div>

									<!-- 输入框组 -->
									<div class="form-group">
										<div class="input-group">
											<div class="input-group-addon">
												<span class="glyphicon glyphicon-earphone" id="icon"></span>
											</div>
											<input type="text" class="form-control" placeholder="请输入手机号"
												name="phone" id="phone" value="${user.phone }">
										</div>
									</div>

									<!-- 输入框组 -->
									<div class="form-group">
										<label id="sexLabel">性别</label>
										<c:if test="${empty user.sex}">
											<label class="radio-inline"> <input type="radio"
												class="sexradio" name="sex" value="男" checked="checked">男
											</label>
											<span class="rightradio"> <label class="radio-inline"><input
													type="radio" class="sexradio" name="sex" value="女">女</label>
											</span>
										</c:if>

										<c:if test="${not empty user.sex }">
											<label class="radio-inline"> <input type="radio"
												class="sexradio" name="sex" value="男"
												<c:if test="${user.sex=='男' }">checked="checked"</c:if>>男
											</label>
											<span class="rightradio"> <label class="radio-inline"><input
													type="radio" class="sexradio" name="sex" value="女"
													<c:if test="${user.sex=='女' }">checked="checked"</c:if>>女</label>
											</span>
										</c:if>

									</div>


									<!-- 输入框组 -->
									<div class="form-group">
										<input type="submit" value="保存"
											class="btn btn-primary  registbtn" id="registbtn"> <input
											type="hidden" name="uid" value="${user.uid }">
									</div>
								</form>

							</div>
						</div>



					</div>
					<!-- col-md-12范围 -->
				</div>
				<!-- row范围 -->
			</div>
			<!-- container范围 -->
		</div>
	</div>


</body>
</html>