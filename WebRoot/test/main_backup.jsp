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

<title>homePage</title>
<!-- 屏幕和设备的屏幕一致，初始缩放为1:1，进制用户缩放 -->
<meta name="viewport"
	content="width=device-width,initial-scale=1,user-scalable=no">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<!-- 引入外部的bootstrap中的css文件 -->
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
<!-- jquery文件，务必在bootstrap.min.js之前引入 -->
<script type="text/javascript" src="jquery/jquery.min.js"></script>
<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>

<!-- 自定义文件 -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/main.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/main.js"></script>
</head>

<body>

	<!-- 导航栏的制作 -->
	<nav class="navbar navbar-default" role="navigation">
	<div class="container">
		<!-- 导航头部 -->
		<div class="navbar-header">

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
				<li class="active"><a href="#">收支明细</a></li>
				<li><a href="#">财务统计</a></li>
				<li><a href="#">财务分析</a></li>
				<li><a href="#">财务预算</a></li>
				<li><a href="#">心愿单</a></li>
				<li><a href="#">备忘录</a></li>
			</ul>

			<form class="navbar-form navbar-left">
				<div class="input-group">
					<input type="text" class="form-control" placeholder="收支明细查询">
					<span class="input-group-btn">
						<button class="btn btn-default" type="button">查询</button>
					</span>
				</div>
			</form>

			<!-- 导航元素 -->
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#">欢迎：xxxxx</a></li>
				<li><a href="#"><span class="glyphicon glyphicon-user"></span>&nbsp;用户设置</a></li>
			</ul>
		</div>
	</div>
	</nav>

	<!-- 网页的主体内容显示 -->
	<!-- style="background:#fff;border:1px solid;width:400px;height:400px" -->
	<div class="container">

		<div class="row">
			<!-- 左  中   右的布局 -->
			
			<!-- 左边侧栏 -->
			<div class="col-md-2">
				<!--  <p>垂直的胶囊式导航菜单</p>-->
				<ul class="nav nav-pills nav-stacked">
					<li class="active"><a href="#">Home</a></li>
					<li><a href="#">SVN</a></li>
					<li><a href="#">iOS</a></li>
					<li><a href="#">VB.Net</a></li>
					<li><a href="#">Java</a></li>
					<li><a href="#">PHP</a></li>
				</ul>
			</div>

			<!-- 中间内容部分 -->
			<div class="col-md-7">

				<table class="table">
					<caption>收支数据</caption>
					<thead>
						<tr>
							<th>产品</th>
							<th>付款日期</th>
							<th>状态</th>
							<th>产品</th>
							<th>付款日期</th>
							<th>状态</th>
						</tr>
					</thead>
					<tbody>
						<tr class="active">
							<td>产品1</td>
							<td>23/11/2013</td>
							<td>待发货</td>
							<td>产品1</td>
							<td>23/11/2013</td>
							<td>待发货</td>
						</tr>
						<tr class="success">
							<td>产品2</td>
							<td>10/11/2013</td>
							<td>发货中</td>
							<td>产品2</td>
							<td>10/11/2013</td>
							<td>发货中</td>
						</tr>
						<tr class="warning">
							<td>产品3</td>
							<td>20/10/2013</td>
							<td>待确认</td>
							<td>产品3</td>
							<td>20/10/2013</td>
							<td>待确认</td>
						</tr>
						<tr class="danger">
							<td>产品4</td>
							<td>20/10/2013</td>
							<td>已退货</td>
							<td>产品4</td>
							<td>20/10/2013</td>
							<td>已退货</td>
						</tr>
						<tr class="active">
							<td>产品1</td>
							<td>23/11/2013</td>
							<td>待发货</td>
							<td>产品1</td>
							<td>23/11/2013</td>
							<td>待发货</td>
						</tr>
						<tr class="success">
							<td>产品2</td>
							<td>10/11/2013</td>
							<td>发货中</td>
							<td>产品2</td>
							<td>10/11/2013</td>
							<td>发货中</td>
						</tr>
						<tr class="warning">
							<td>产品3</td>
							<td>20/10/2013</td>
							<td>待确认</td>
							<td>产品3</td>
							<td>20/10/2013</td>
							<td>待确认</td>
						</tr>
						<tr class="danger">
							<td>产品4</td>
							<td>20/10/2013</td>
							<td>已退货</td>
							<td>产品4</td>
							<td>20/10/2013</td>
							<td>已退货</td>
						</tr>

					</tbody>
				</table>

				<!-- 分页功能的制作 -->
				<div align="center">
					<ul class="pagination pagination-lg">
						<li><a href="#">&laquo;</a></li>
						<li><a href="#">1</a></li>
						<li><a href="#">2</a></li>
						<li><a href="#">3</a></li>
						<li><a href="#">4</a></li>
						<li><a href="#">5</a></li>
						<li><a href="#">&raquo;</a></li>
					</ul>
				</div>
			</div>

			<!-- 右侧信息栏制作 -->
			<div class="col-md-3">
				<!-- 提醒栏 remind-column -->

				<div class="side-bar-card">
					<div class="card-title">提醒栏</div>
					<div class="card-body">
						<div class="list">

							<div class="item">
								<div class="title">专业从事系统集成工作的高科技公司。</div>
							</div>
							<div class="item">
								<div class="title">专业从事系统集成工作的高科技公司。</div>
							</div>
							<div class="item">
								<div class="title">专业从事系统集成工作的高科技公司。</div>
							</div>


						</div>
					</div>
				</div>

				<!-- 新闻栏 -->
				<!-- 				<div id="news-column"></div> -->
				<hr />
				<div class="side-bar-card">
					<div class="card-title">新闻栏</div>
					<div class="card-body">
						<div class="list">
							<div class="item">
								<div class="title">专业从事系统集成工作的高科技公司。</div>
							</div>

							<div class="item">
								<div class="title">专业从事系统集成工作的高科技公司。</div>
							</div>
						</div>
					</div>
				</div>

			</div>

		</div>
	</div>
</body>
</html>
