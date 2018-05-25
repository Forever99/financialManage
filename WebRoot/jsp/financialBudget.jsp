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

<title>财务预算</title>
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
	href="${pageContext.request.contextPath}/css/financialBudget.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/financialBudget.js"></script>



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
					<li ><a
						href="${pageContext.request.contextPath}/shouzhiRecord/findShouzhiRecord.action">财务管理</a></li>
					<li><a
						href="${pageContext.request.contextPath}/toFinancialCount.action">财务统计</a></li>
					<li><a
						href="${pageContext.request.contextPath}/financialAnalysis/toFinancialAnalysis.action">财务分析</a></li>
					<li class="active"><a 
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
					<div class="col-md-12">
						<!-- top -->
						<div class="topContent">
							<div>
								<span id="topTitle">月度账单</span>
							</div>

							<div class="col-md-12">

								<div class="col-md-3 col-xs-3">
									<span id="bigFont" class="bigFont"></span>
								</div>

								<div class="col-md-3 col-xs-3">
									<div class="col-md-12 col-xs-12 topFont">
										<span class="smallFont">收入(元)</span>
									</div>
									<div class="col-md-12 col-xs-12">
										<span id="myIncome" class="smallFont">0</span>
									</div>
								</div>
								<div class="col-md-3 col-xs-3">
									<div class="col-md-12 col-xs-12 topFont">
										<span class="smallFont">支出(元)</span>
									</div>
									<div class="col-md-12 col-xs-12">
										<span id="mySpend" class="smallFont">0</span>
									</div>
								</div>
								<div class="col-md-3 col-xs-3">
									<div class="col-md-12 col-xs-12 topFont">
										<span class="smallFont">结余(元)</span>
									</div>
									<div class="col-md-12 col-xs-12">
										<span id="myMore" class="smallFont">0</span>
									</div>
								</div>
								<div>
									<hr />
								</div>

							</div>
							<!-- col-md-12 -->
						</div>
						<!-- topContent -->


						<!-- center -->
						<div class="col-md-12">
							<c:if test="${budget==null }">
								<div class="centerContent">
									<div class="center_top"></div>
									<div class="center_center">
										<button id="bugdetbtn"
											class="btn btn-warning btn-lg btn-block" data-toggle="modal"
											data-target="#Add_modal">设置预算</button>
									</div>
									<div class="center_bottom"></div>
								</div>
							</c:if>

							<c:if test="${budget!=null }">
								<div class="centerContent2">
									<hr />
									<!-- 							<div class="center_top2"></div> -->

									<div class="center_center2">
										<div class="row">
											<div class="col-md-5 col-xs-5">
												<div>
													<span id="redBudget" style="color:red;"></span> <input
														type="hidden" id="budgetTime" value="${budget.wtime }">
													<input type="hidden" id="budgetValue"
														value="${budget.wnum }">
												</div>
											</div>
											<div
												class="col-md-4 col-md-offset-3 col-xs-4 col-xs-offset-3">

												<a href="javascript:void(0)" data-toggle="modal"
													data-target="#edit_modal"> <span id="leftSpan"
													class="glyphicon glyphicon-cog try">设置</span>
												</a> <a id="delete_budget"> <span
													class="glyphicon glyphicon-trash try">删除</span>
												</a> <input type="hidden" id="delete_bug" value="${budget.wid }">
											</div>
										</div>
										<div class="row" id="row_center">
											<div class="col-md-6 col-xs-6">
												<div class="row">
													<div class="col-md-12 col-xs-12">
														<div id="container_budget"></div>
													</div>
												</div>
											</div>

											<div class="col-md-6  col-xs-6">
												<div id="rightFont">
													<div id="more">
														<div class="col-md-12 col-xs-12">
															<div
																style="height:50%;width:10%;background-color:#FD9240;">&nbsp;</div>
															<span class="try2"> 消费<span id="budget_spend">0</span>元，
																占<span id="budget_spend_per">10%</span>
															</span>
														</div>
														<div class="col-md-12 col-xs-12">
															<div
																style="height:50%;width:10%;background-color:#FFD954;">&nbsp;</div>
															<span class="try2"> 剩余<span id="budget_leave">0</span>元，
																占<span id="budget_leave_per">90%</span>
															</span>
														</div>
													</div>
												</div>
											</div>


										</div>
										<!-- row_center -->
									</div>
									<!-- center_center2 -->
									<hr />
									<!-- 							<div class="center_bottom2"></div> -->

								</div>
							</c:if>

						</div>

						<!-- bottom -->
						<div class="row">
							<div class="col-md-12 col-xs-12">
								<div class="bottomContent">
									<!-- 收入排行榜 -->
									<div class="col-md-6 col-xs-12">
										<div class="left" id="container1"></div>
									</div>

									<!-- 支出排行榜 -->
									<div class="col-md-6 col-xs-12">
										<div class="right" id="container2"></div>
									</div>
								</div>
							</div>
						</div>

					</div>
					<!-- col-md-12范围  -->
				</div>
				<!-- row范围 -->
			</div>
		</div>

	</div>
	<!-- container范围 -->


	<!-- 模态框 -->
	<div class="modal fade" id="Add_modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" id="Add_spend_modal_dialog">
			<form id="add_form">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">预算设置</h4>
					</div>
					<div class="modal-body">

						<div class="input-group">
							<label id="addmsg"></label>
						</div>
						<div class="input-group">
							<span class="input-group-addon"> 预算金额</span> <input type="text"
								name="wnum" id="add_wnum" class="form-control"
								required="required" placeholder="请输入预算金额"> <input
								type="hidden" name="user_id" value="${sessionScope.user.uid}">
						</div>

					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" id="add_btn">保存</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</form>
		</div>
		<!-- modal-dialog -->

	</div>
	<!-- /.modal -->

	<!-- 模态框 -->
	<div class="modal fade" id="edit_modal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog" id="Add_spend_modal_dialog">
			<form id="edit_form">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">预算编辑</h4>
					</div>
					<div class="modal-body">

						<div class="input-group">
							<label id="editmsg"></label>
						</div>
						<div class="input-group">
							<span class="input-group-addon"> 预算金额</span> <input type="text"
								name="wnum" id="edit_wnum" class="form-control"
								required="required" placeholder="请输入预算金额" value="${budget.wnum}">
							<input type="hidden" name="user_id"
								value="${sessionScope.user.uid}"> <input type="hidden"
								name="wid" value="${budget.wid}">
						</div>

					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						<button type="button" class="btn btn-primary" id="edit_btn">保存</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</form>
		</div>
		<!-- modal-dialog -->

	</div>
	<!-- /.modal -->

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