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

<title>我的心愿单</title>
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
	href="${pageContext.request.contextPath}/css/wishlist.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/wishlist.js">
	
</script>


<!-- 时间控件 -->
<!-- jquery文件的冲突问题 -->
<%-- <script type="text/javascript"
	src="${pageContext.request.contextPath }/jedate/jquery-1.7.2.js"></script> --%>

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

<script type="text/javascript"
	src="${pageContext.request.contextPath}/app/js/offcanvas.js"></script>

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

	//设置当前页，并且提交表单
	function toCurrentPage(currentPage) {
		$("#currentPage").val(currentPage);//设置当前页
		//提交表单
		document.selectByCondition.submit();
	}

	function toeditPage(id) {//去修改信息页面
		// 		alert("你好："+id);
		//异步请求
		$.ajax({
			type : "get",
			url : "/financialManage/wishlist/toEdit.action",
			data : {
				"id" : id
			},
			dataType : "json",//返回时的数据类型json
			success : function(data) {
				// 					alert("success");
				//回显示在模态框中
				$("#edit_wid").val(data.wid);
				$("#edit_wish").val(data.wish);
				$("#edit_wnum").val(data.wnum);
				$("#edit_wdate").val(data.wdate);
				$("#edit_state").val(data.state);
				$("#edit_id").val(data.id);//保存id
			},
			error : function(data) {
				alert("失败");
			}
		});

	};

	function deleteWish(id) {
		if (confirm('确认要删除该条记录吗?')) {
			$.post("/financialManage/wishlist/deleteWish.action", {
				"id" : id
			}, function(data) {
				//回调为ok时，弹出alert框，并重新刷新页面
				alert("删除记录成功！");
				window.location.reload();
			});
		}
	};
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
					<li><a
						href="${pageContext.request.contextPath}/financialAnalysis/toFinancialAnalysis.action">财务分析</a></li>
					<li><a
						href="${pageContext.request.contextPath}/budget/findBudget.action">财务预算</a></li>
					<li class="active"><a 
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
	<div class="container" id="mainContent">
		<div class="row-offcanvas row-offcanvas-left">
			<div class="starter-template">
				<div class="row">

					<div class="col-md-12">
						<div class="list-group">

							<!-- 心愿单列表项 -->
							<c:forEach items="${pageBean.pageList }" var="oneWish">
								<div class="list-group-item">
									<div id="wishtitle">${oneWish.wid }</div>
									<span id="redZi" class="glyphicon glyphicon-heart"></span> <span
										id="redZi">我的心愿：</span> <span id="wishZi">${oneWish.wish }</span>
									<br /> <span id="redZi" class="glyphicon glyphicon-yen"></span>
									<span id="redZi">目标金额：</span> <span id="wishZi">${oneWish.wnum }元</span>
									<div id="juli"></div>
									<!-- 			                <br/> -->

									<div class="row">
										<div class="col-md-8 col-xs-12">
											<!-- 									<p class="text-muted"> -->
											<strong>完成状态 <span class="badge">${oneWish.state }</span>
											</strong>
											<!-- 修改 -->
											<a href="javascript:void(0)" data-toggle="modal"
												data-target="#editModal" class="btn btn-success btn-xs"
												onclick="toeditPage(${oneWish.id});"> 编辑<span
												class="glyphicon glyphicon-edit"></span>
											</a> &nbsp;
											<!-- 删除-->
											<a class="btn btn-danger btn-xs" href="javascript:void(0)"
												onclick="deleteWish(${oneWish.id});"> 删除<span
												class="glyphicon glyphicon-trash"></span>
											</a>
											<!-- 									</p> -->
										</div>
										<!-- class="pull-right" -->

										<div class="col-md-2 col-md-offset-2 col-xs-12">
											<!-- 									<p class="text-muted"> -->
											<strong> 记录时间：${oneWish.wdate } </strong>
											<!-- 									</p> -->
										</div>
									</div>
								</div>
							</c:forEach>

							<!-- 分页查询表单 -->
							<form class="form-inline" id="selectByCondition"
								name="selectByCondition"
								action="${pageContext.request.contextPath}/wishlist/findAllWishList.action"
								method="post">
								<!-- 当前页 -->
								<input type="hidden" id="currentPage" name="currentPage">
							</form>


						</div>
						<!-- list-group范围 -->

						<c:if test="${ not empty pageBean.pageList}">
							<!-- 分页功能的制作 -->
							<!-- 分页功能的制作 -->
							<div align="center">
								<ul class="pagger pagination pagination-lg">
									<li><a href="javascript:void(0)"
										onclick="toCurrentPage(0)">首页</a></li>
									<li><c:if test="${pageBean.currentPage-1>=0}">
											<a href="javascript:void(0)"
												onclick="toCurrentPage(${pageBean.currentPage-1})">上一页</a>
										</c:if> <c:if test="${pageBean.currentPage-1<0}">
											<a href="javascript:void(0)" id="pageThing">上一页</a>
										</c:if></li>
									<li><c:if
											test="${pageBean.currentPage+1<pageBean.allPage}">
											<a href="javascript:void(0)"
												onclick="toCurrentPage(${pageBean.currentPage+1})">下一页</a>

										</c:if> <c:if test="${pageBean.currentPage+1>=pageBean.allPage}">
											<a href="javascript:void(0)" id="pageThing">下一页</a>
										</c:if></li>
									<li><a href="javascript:void(0)"
										onclick="toCurrentPage(${pageBean.allPage-1})">尾页</a></li>
								</ul>
							</div>
							<!-- 分页所在 -->
						</c:if>
						<c:if test="${empty pageBean.pageList}">
							<span class="text-center" style="font-size: 30px;">当前心愿单为空，请添加您的心愿单</span>
						</c:if>

					</div>
					<!-- col-md-12范围 -->
				</div>
				<!-- row范围 -->
			</div>
		</div>
	</div>
	<!-- container范围 -->


	<!-- 底部添加心愿单栏目，固定 -->
	<nav id="bottomNav" class="navbar navbar-default navbar-fixed-bottom"
		role="navigation">
		<div class="container-fluid">
			<div id="contentNav">
				<a id="navbar-brand" class="navbar-brand" href="#"
					data-toggle="modal" data-target="#addModal"> <span
					class="glyphicon glyphicon-plus"></span> 创建新的心愿单
				</a>
			</div>
		</div>
	</nav>

	<!-- 添加模态框（Modal） -->
	<div class="modal fade" id="addModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel3" aria-hidden="true">
		<div class="modal-dialog">
			<!-- action="${pageContext.request.contextPath}/shouzhiRecord/add.action" method="post" -->
			<form id="addform">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" id="closeBtn"
							data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel3">添加心愿单</h4>
					</div>

					<div class="modal-body">

						<!-- 错误提示标签 -->
						<label id="add_msg"></label><input type="hidden" name="user_id"
							value="${sessionScope.user.uid}">
						<!--这里添加一些文本【主体】  -->
						<div class="form-group">
							<label for="add_wish">许下我的心愿</label> <input type="text"
								id="add_wish" name="wish" class="form-control"
								placeholder="写下我的心愿">
						</div>
						<div class="form-group">
							<label for="add_wnum">心愿目标金额</label> <input type="text"
								id="add_wnum" name="wnum" id="my_szr_comment"
								class="form-control" placeholder="输入心愿金额">
						</div>
						<div class="form-group">
							<label for="add_wdate">心愿记录日期</label> <input type="text"
								name="wdate" id="add_wdate" class="form-control"
								placeholder="输入心愿记录日期">
						</div>
						<div class="modal-footer">
							<button type="button" id="closeBtn2" class="btn btn-default"
								data-dismiss="modal">关闭</button>
							<button id="addButton" type="button" class="btn btn-primary">添加</button>
						</div>


					</div>
					<!-- modal-body -->
				</div>
				<!-- /.modal-content -->

			</form>

		</div>
		<!-- modal-dialog -->
	</div>
	<!-- 模态框（Modal） -->



	<!-- 修改模态框 -->
	<div class="modal fade" id="editModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel3" aria-hidden="true">
		<div class="modal-dialog">
			<form id="editform">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" id="closeBtn"
							data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel3">修改心愿单</h4>
					</div>

					<div class="modal-body">
						<!-- 错误提示标签 -->
						<label id="edit_msg"></label> <input type="hidden" name="user_id"
							value="${sessionScope.user.uid}"> <input type="hidden"
							id="edit_id" name="id">
						<!--这里添加一些文本【主体】  -->
						<div class="form-group">
							<label for="edit_wish">我的心愿</label> <input type="text"
								id="edit_wish" name="wish" class="form-control"
								placeholder="写下我的心愿">
						</div>
						<div class="form-group">
							<label for="edit_wnum">心愿目标金额</label> <input type="text"
								id="edit_wnum" name="wnum" class="form-control"
								placeholder="输入心愿金额">
						</div>
						<div class="form-group">
							<label for="edit_wdate">心愿记录日期</label> <input type="text"
								name="wdate" id="edit_wdate" class="form-control"
								placeholder="输入心愿记录日期">
						</div>
						<div class="form-group">
							<label for="add_wdate">心愿记录状态</label> <select id="edit_state"
								name="state" class="form-control">
								<option value="未完成">未完成</option>
								<option value="已完成">已完成</option>
							</select>
						</div>
						<div class="modal-footer">
							<button type="button" id="closeBtn2" class="btn btn-default"
								data-dismiss="modal">关闭</button>
							<button id="editButton" type="button" class="btn btn-primary">提交修改</button>
						</div>


					</div>
					<!-- modal-body -->
				</div>
				<!-- /.modal-content -->
			</form>
		</div>
		<!-- modal-dialog -->
	</div>
	<!-- 修改模态框  -->


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