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

<title>备忘录</title>
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
	href="${pageContext.request.contextPath}/css/memorandum.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/memorandum.js">
	
</script>


<script type="text/javascript" charset="utf-8"
	src="${pageContext.request.contextPath}/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8"
	src="${pageContext.request.contextPath}/ueditor/ueditor.all.min.js">
	
</script>

<script type="text/javascript" src="${pageContext.request.contextPath}/app/js/offcanvas.js"></script>
<!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
<!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
<script type="text/javascript" charset="utf-8"
	src="${pageContext.request.contextPath}/ueditor/lang/zh-cn/zh-cn.js"></script>


<!-- 时间控件 -->
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

	// 	deleteMemorandum(${memorandum.mid })
	function deleteMemorandum(mid, currentPage) {
		if (confirm('确认要删除该条记录吗?')) {
			alert("删除记录成功！");
			window.location.href = "/financialManage/memorandum/deleteMemorandum.action?currentPage="
					+ currentPage + "&mid=" + mid;
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
					<li><a
						href="${pageContext.request.contextPath}/wishlist/findAllWishList.action">心愿单</a></li>
					<li class="active"><a 
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

							<!--  -->
							<c:forEach items="${pageBean.pageList }" var="memorandum">
								<div class="list-group-item">
									<span id="myzi">
										&nbsp;&nbsp;&nbsp;&nbsp;${memorandum.topFont } </span> <br />
									<br />

									<p class="text-muted">
										<strong>记录时间：${memorandum.recordTime }</strong> <strong
											class="pull-right"> <!-- 查看备忘详细--> <a
											id="selectById"
											href="${pageContext.request.contextPath}/memorandum/oneMemorandum.action?mid=${memorandum.mid}&currentPage=${pageBean.currentPage }"
											class="btn btn-primary btn-xs"> 详细<span
												class="glyphicon glyphicon-search"></span>
										</a> &nbsp; <!-- 修改 --> <a
											href="${pageContext.request.contextPath}/memorandum/oneMemorandum.action?mid=${memorandum.mid}&currentPage=${pageBean.currentPage }"
											class="btn btn-success btn-xs hidden-xs"> 编辑<span
												class="glyphicon glyphicon-edit"></span>
										</a> &nbsp; <!-- 删除--> <a class="btn btn-danger btn-xs"
											href="javascript:void(0)"
											onclick="deleteMemorandum(${memorandum.mid },${pageBean.currentPage });">
												删除<span class="glyphicon glyphicon-trash"></span>
										</a>
										</strong>
									</p>
								</div>
							</c:forEach>
							<!-- 分页查询表单 -->
							<form class="form-inline" id="selectByCondition"
								name="selectByCondition"
								action="${pageContext.request.contextPath}/memorandum/listMemorandum.action"
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
							<span class="text-center" style="font-size: 30px;">当前备忘录为空，请添加您的备忘录</span>
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
				<a id="navbar-brand" class="navbar-brand"
					href="${pageContext.request.contextPath}/jsp/memorandum/addmemorandum.jsp">
					<span class="glyphicon glyphicon-plus"></span> 创建新的备忘
				</a>
			</div>
		</div>
	</nav>


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