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

<title>财务分析</title>
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

<!-- 引入highcharts文件 -->
<script
	src="${pageContext.request.contextPath}/highcharts/highcharts.js"></script>
<script
	src="${pageContext.request.contextPath}/highcharts/highcharts-zh_CN.js"></script>
<script
	src="${pageContext.request.contextPath}/highcharts/highcharts-more.js"></script>

<!-- 自定义文件 -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/main.css">

<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/financialAnalysis.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/financialAnalysis.js"></script>

<!-- 自定义控件 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath }/jedate/jquery.jedate.js"></script>
<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath }/jedate/skin/jedate.css">

<!-- 计算器 -->
<!-- <script src="jquery-2.1.4.min.js"></script> -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath }/bootstrap/cal/SimpleCalculadorajQuery.css">
<script
	src="${pageContext.request.contextPath }/bootstrap/cal/SimpleCalculadorajQuery.js"></script>
	
<script type="text/javascript" src="${pageContext.request.contextPath}/app/js/offcanvas.js"></script>

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
					<li><a
						href="${pageContext.request.contextPath}/shouzhiRecord/findShouzhiRecord.action">财务管理</a></li>
					<li><a
						href="${pageContext.request.contextPath}/toFinancialCount.action">财务统计</a></li>
					<li class="active"> <a 
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
	

	<!-- 网页的主体内容显示 -->
	<div class="container">
		<div class="row-offcanvas row-offcanvas-left">
			<div class="starter-template">
				<div class="row">
					<!-- 左  右的布局 -->
					<!-- 左边-->
					<div class="col-md-12">
						<!-- <ul class="nav nav-pills">
					<li class="active"><a data-toggle="tab" id="financialYearCount"
						href="#year_record">按年度分析收支记录</a></li>
					<li class="active"><a data-toggle="tab" href="#month_record">按月份分析收支记录</a></li>
				</ul>
				跳转的页面
				<div class="tab-content"> -->
						<!-- 
					按年度统计收支记录
					<div id="year_record" class="tab-pane fade in active">
							<div class="row">
								<div class="col-md-12">
									面板
									<div class="panel panel-default">
										<div class="panel-body">
										<div id="yearTitle">
											<label id="yearLab">按年度综合分析收支情况</label>
										</div> 
											<form class="form-inline">
												<div id="yearDiv">
													<span class="chooseSpan">选择年</span>
													<input type="text"  id="ymnian"  class="yearInput" 
													placeholder="请输入年" readonly  name="year" >
													<input  id="yearSelect" type="button" class="btn btn-primary" value="年度分析查询">
												</div>
											</form>
										</div>
									</div>
							
							
								图表展示
									<div class="row">
										<div class="col-md-6">
										
											双图表时，作为左边部分
											<div id="container_year_chart_left"></div>
										</div>
										<div class="col-md-6">
											 双图表时，作为右边部分
											<div id="container_year_chart_right"></div>
										</div>
									</div>
							</div>col-md-12
						</div>
				
					</div>按年度统计收支记录

 -->
						<!-- 按月份统计收支记录-->
						<!-- 	<div id="month_record" class="tab-pane fade in active"> -->
						<div class="row">
							<div class="col-md-12">
								<!-- 面板 -->
								<div class="panel panel-default">
									<div class="panel-body">
										<div id="monthTitle">
											<label id="monthLab">按月份综合分析收支情况</label>
										</div>
										<form class="form-inline">
											<div id="monthDiv">
												<div class="row">
													<div class="col-md-12 col-xs-12">
														<span class="chooseSpan">选择月份</span> <input type="text"
															id="monthInput" class="monthInput" placeholder="请输入年月"
															readonly name="month"> <input id="monthSelect"
															type="button" class="btn btn-warning" value="月份分析查询">
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>

								<!-- 图表展示 -->
								<div class="row">
									<div class="col-md-6">
										<div style="background-color: #F0AD4E;color:white;">
											<span id="month_start">本月财务状况</span>
										</div>
										<div id="top_left">
											<div style="font-size:20px;">
												本月总收支：<span id="currentAllMoney">11</span> 元 -- 收入占<span
													id="currentIncomePercent"></span>， 支出占<span
													id="currentSpendPercent"></span>
											</div>
											<!-- 双图表时，作为左边部分 -->
											<div id="container_month_chart_left"></div>
											<div style="font-size:20px;">
												收入记录：<span id="currentIncomeRecord"></span>条 ----收入总额 <span
													id="currentIncomeMoney"></span>元
											</div>
											<div style="font-size:20px;">
												支出记录：<span id="currentSpendRecord"></span>条 ----支出总额 <span
													id="currentSpendMoney"></span>元
											</div>
											<div style="font-size:20px;">
												余额：<span id="currentLeft"></span>元
											</div>
										</div>
									</div>
									<div class="col-md-6" id="top_right">
										<div
											style="background-color: #F0AD4E;color:white;font-size:20px;">
											上月财务状况</div>
										<div style="font-size:20px;">
											上月总收支：<span id="lastAllMoney"></span> 元 -- 收入占<span
												id="lastIncomePercent"></span>， 支出占<span
												id="lastSpendPercent"></span>
										</div>
										<!-- 双图表时，作为左边部分 -->
										<div id="container_month_chart_right"></div>
										<div style="font-size:20px;">
											收入记录：<span id="lastIncomeRecord"></span>条 ----收入总额 <span
												id="lastIncomeMoney"> </span>元
										</div>
										<div style="font-size:20px;">
											支出记录：<span id="lastSpendRecord"></span>条 ----支出总额 <span
												id="lastSpendMoney"></span>元
										</div>
										<div style="font-size:20px;">
											余额：<span id="lastLeft"></span>元
										</div>
									</div>
									<div class="col-md-12" style="font-size:20px;color:red;">
										财务分析：<br /> <span id="allIncome"> 同比上月, 收入<span
											id="incomeAnalysis"></span>, 支出<span id="spendsAnalysis"></span>,
											余额 <span id="leftAnalysis"></span><br />
										</span>
									</div>

									<div class="col-md-6" id="bottom_left">
										<div
											style="background-color: #F0AD4E;color:white;font-size:20px;">上月同期收入对比</div>
										<div id="container_month_chart_left2"></div>
									</div>
									<div class="col-md-6" id="bottom_right">
										<div
											style="background-color: #F0AD4E;color:white;font-size:20px;">上月同期支出对比</div>
										<div id="container_month_chart_right2"></div>
									</div>

									<div class="col-md-12 col-xs-12">
										<div class="row">
											<div class="col-md-1 col-xs-12" style="font-size:16px;">当前支出</div>
											<div class="col-md-10 col-xs-9">
												<div class="progress" id="current_pro">
													<div id="current-progress-bar"
														class="progress-bar progress-bar-danger"
														role="progressbar" aria-valuenow="60" aria-valuemin="0"
														aria-valuemax="100">
														<span id="current-progress"></span>
													</div>
													<span id="current-progress-wai"></span>
												</div>
											</div>
											<div class="col-md-1 col-xs-3">
												<span id="current-progress2"></span>
											</div>
										</div>

										<div class="row">
											<div class="col-md-1 col-xs-12" style="font-size:16px;">上月同期</div>
											<div class="col-md-10 col-xs-9">
												<div class="progress" id="last_pro">
													<div id="last-progress-bar"
														class="progress-bar progress-bar-info" role="progressbar"
														aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
														<span id="last-progress"></span>
													</div>
													<span id="last-progress-wai"></span>

												</div>
											</div>
											<div class="col-md-1 col-xs-3">
												<span id="last-progress2"></span>
											</div>
										</div>
									</div>

									<div class="col-md-12" style="font-size:18px;color:red;">
										财务分析：<br /> <span id="spendAnalysis"></span>
									</div>


								</div>
							</div>
							<!-- col-md-12 -->
						</div>
						<!-- row -->

					</div>
					<!-- 按月份统计收支记录 -->
				</div>
				<!-- col-md-9范围 -->
			</div>
		</div>

	</div>
	<!-- row范围 -->
	<!-- 	</div> -->
	<!-- 	</div> -->
	<!-- container范围 -->

	<!--计算器-->
	<!-- 模态框（Modal） -->
	<div class="container">
		<div class="row">
			<div class="col-md-12 col-xs-12 col-sm-12">

				<div class="modal fade" id="countMachine" tabindex="-1"
					role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h4 class="modal-title" id="myModalLabel">计算器</h4>
							</div>
							<div class="modal-body">

								<div id="demo"></div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">关闭</button>
							</div>
						</div>
						<!-- /.modal-content -->
					</div>
					<!-- /.modal -->
				</div>
			</div>
		</div>
	</div>
	<!--计算器-->
</body>
</html>