<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css">
<!-- jquery文件，务必在bootstrap.min.js之前引入 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery/jquery.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js"></script>

<!-- 自定义文件 -->

<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/admin/main.js"></script>

<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath }/css/admin/main.css">


<script type="text/javascript">

	//设置当前页，并且提交表单
	function toCurrentPage(currentPage){
		$("#currentPage").val(currentPage);//设置当前页
		//提交表单
		document.selectByCondition.submit();
	}
	
	//删除当前用户
	function deleteNews(nid) {
		var currentPage2=$("#currentPage3").val();//当前页
		if (confirm('确认要删除该条新闻信息吗?')) {
			window.location.href="/financialManage/newsManage/deleteNews.action?nid="+nid+"&currentPage2="+currentPage2;
		}
	}
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
								<li><a href="javascript:void(0)">欢迎: <span class="glyphicon glyphicon-user"></span> ${sessionScope.admin.adminname }</a></li>
								<li><a href="${pageContext.request.contextPath}/userManage/logout.action"><span class="glyphicon glyphicon-log-out"></span> 退出登录</a></li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</div>
		<!-- 上边导航栏 -->

		
		<div class="row">
<!-- 			<div class="col-md-1"></div> -->
			<!-- 左侧栏 -->
			<div class="col-md-2">
				<div class="left">
					<ul class="nav nav-pills nav-stacked" role="tablist">
						<li >
							<a   href="${pageContext.request.contextPath}/userManage/findUsers.action">
								<span class="glyphicon glyphicon-user"></span>	
								个人用户管理
							</a>
						</li>
					
						<li >
							<a href="${pageContext.request.contextPath}/categoryManage/findCategorys.action">
								<span class="glyphicon glyphicon-signal"></span>
								收支类别管理
							</a>
						</li>
						<li class="active" >
							<a href="${pageContext.request.contextPath}/newsManage/findNewsList.action">
								<span class="glyphicon glyphicon-folder-open"></span> 
								财务新闻管理
							</a>
						</li>
					</ul>
				</div>
			</div>
			
			
			<!-- 中间主体内容部分 -->
			<div class="col-md-10">
					<!-- 财务新闻管理 -->
					<div id="newsManage" class="tab-pane fade in active">
							<div class="row">
								<div class="col-md-10">
									<h1 class="page-header">财务新闻管理</h1>
								</div>
								<div class="col-md-2">
									<a class="btn btn-primary btn-lg" href="${pageContext.request.contextPath}/admin/news/addnews.jsp">
									<span class="glyphicon glyphicon-plus"></span> 添加新闻</a>
								</div>
							</div>
							<div id="mian">
								<!-- 面板 -->
								<div class="panel panel-default">
									<div class="panel-body">
										<form class="form-inline" id="selectByCondition" name="selectByCondition"
											action="${pageContext.request.contextPath}/newsManage/findNewsList.action"
											method="post">
										<div>
												<div class="form-group ">
													<label for="nTitle">文章标题</label> <input type="text"
														class="form-control" name="nTitle" id="nTitle"
														placeholder="请输入文章标题" value="${findNews.nTitle}">
												</div>
												<div class="form-group ">
													<label for="author">文章作者</label> <input type="text"
														class="form-control" name="author" id="author"
														placeholder="请输入文章作者" value="${findNews.author}">
												</div>
												<div class="form-group ">
													<label for="keyword">关键词</label> <input type="text"
														class="form-control" name="keyword" id="keyword"
														placeholder="请输入关键词" value="${findNews.keyword}">
												</div>
												<!--  默认情况下，当前页是第0页 -->
												<input type="hidden" id="currentPage" name="currentPage" value="0"/>
												<div class="form-group "><!-- col-md-4 col-xs-4 -->
													<input type="submit" class="btn btn-primary btn-block" value="查询" >
												</div>
											</div>
										</form>
									</div>
								</div>
							</div><!-- main -->
						
						<c:if test="${ pageBean.pageList==null}">
							<h1 style="color:red;">当前财务新闻为空</h1>
						</c:if>
						<c:if test="${ pageBean.pageList!=null}">
							<!-- mytable用来控制宽高 -->
							<div class="mytable">
								<form action="" method="post">
								<div style="height: 427px;"><!-- 固定高度，进行控制表格的高度 -->
									<table class="table">
										<thead>
											<tr class="success">
												<th>编号</th>
												<th>文章标题</th>
												<th>作者</th>
												<th>关键词</th>
												<th>浏览次数</th>
												<th>记录日期</th>
												<th>文章内容</th>
												<th>操作</th>
											</tr>
										</thead>

										<!-- 表格中的数据 -->
										<tbody id="tableData">
											<c:forEach items="${ pageBean.pageList}" var="news">
												<tr class="active">
													<td>${news.nid }</td>
													<td>${news.nTitle }</td>
													<td>${news.author}</td>
													<td>${news.keyword}</td>
													<td>${news.visitCount}</td>
													<td>${news.recordTime}</td>
													<td>
													<a href="${pageContext.request.contextPath}/newsManage/toEditPage.action?nid=${news.nid}&currentPage=${pageBean.currentPage}">详细</a>
													</td><!-- ${news.nContent} -->
													<td><a href="${pageContext.request.contextPath}/newsManage/toEditPage.action?nid=${news.nid}&currentPage=${pageBean.currentPage}" 
														class="btn btn-info btn-xs"> 修改 <span
															class="glyphicon glyphicon-edit" id="myedit"></span>
													</a> <!-- 修改 --> 
													<!-- 删除--> <a
														class="btn btn-danger btn-xs" href="javascript:void(0)"
														onclick="deleteNews(${news.nid });">
															删除<span class="glyphicon glyphicon-trash"></span>
															<input type="hidden" id="currentPage3" name="currentPage3" value="${pageBean.currentPage }"/>
													</a></td>
												</tr>
											</c:forEach>
										</tbody>
									</table>
								</div><!-- 控制table的高 -->
								</form>

								<!-- 分页功能的制作 -->
								<div align="center">
									<ul class="pagger pagination pagination-lg">
										<li><a href="javascript:void(0)" onclick="toCurrentPage(0)">首页</a></li>
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
							</div>
							<!-- mytable的范围之内 -->
						</c:if>
					</div><!-- newsManage -->
			</div>
		</div><!-- row -->

	</div>
	<!-- container -->
</body>
</html>