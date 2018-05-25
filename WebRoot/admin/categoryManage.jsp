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
	src="${pageContext.request.contextPath}/js/admin/categoryManage.js"></script>

<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath }/css/admin/main.css">


<script type="text/javascript">

	//设置当前页，并且提交表单
	function toCurrentPage(currentPage){
		$("#currentPage").val(currentPage);//设置当前页
		//提交表单
		document.selectByCondition.submit();
	}
	
	//去收支类别修改信息页面
	function toshouzhiCategoryEditPage(szcid){//异步交互事件
		$.ajax({
				type : "get",
				url : "/financialManage/categoryManage/toEditPage.action",
				data : {"szcid":szcid},
				contentType:"application/json;charset=utf-8",/* 发送数据给服务器时所用的内容类型	*/
				dataType : "json",//返回时的数据类型json
				success : function(data) {
					$("#update_szcid").val(data.shouzhiCategory.szcid);
					$("#update_parent_category").val(data.shouzhiCategory.parent_category);
					$("#update_son_category").val(data.shouzhiCategory.son_category);
					$("#old_son_category").val(data.old_son_category);//保存原来的收支子类型
				},
				error:function(data){alert("fail");}
			});
	};
	
	
	//删除当前用户
	function deleteshouzhiCategory(szcid) {
// 		alert("uid:"+uid);
		var currentPage2=$("#currentPage3").val();//但前页
		if (confirm('确认要删除该收支信息吗?')) {
			//判断当前用户是否可以进行删除
			$.ajax({
				type : "get",
				url : "/financialManage/categoryManage/ajaxConfirmDeleteShouzhiCategory.action",
				data : {"szcid":szcid},
				contentType:"application/json;charset=utf-8",/* 发送数据给服务器时所用的内容类型	*/
				dataType : "json",//返回时的数据类型json
				success : function(data) {
// 					alert("成功");
					if(data.name=="yes"){//可以删除
						alert("删除收支类型成功！");
						//跳转到删除收支信息action
						window.location.href="/financialManage/categoryManage/deleteShouzhiCategory.action?szcid="+szcid+"&currentPage2="+currentPage2;
					}
					else{
						alert("当前收支类型有很相应的收支记录，无法进行直接删除！");
					}
				},
				error:function(data){
					alert("fail");
				}
			});
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
					
						<li class="active" >
							<a href="${pageContext.request.contextPath}/categoryManage/findCategorys.action">
								<span class="glyphicon glyphicon-signal"></span>
								收支类别管理
							</a>
						</li>
						<li>
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
					<!-- 个人用户管理 -->
					<div id="userManage" class="tab-pane fade in active">
							<div class="row">
								<div class="col-md-8">
									<h1 class="page-header">收支类别管理</h1>
								</div>
								<div class="col-md-2">
									<a class="btn btn-primary" data-toggle="modal" data-target="#insertIncomeModal">
									<span class="glyphicon glyphicon-plus"></span> 添加收入类型</a>
								</div>
								<div class="col-md-2">
									<a class="btn btn-primary" data-toggle="modal" data-target="#insertSpendModal">
									<span class="glyphicon glyphicon-plus"></span> 添加支出类型</a>
								</div>
							</div>
							<div id="mian">
								<!-- 面板 -->
								<div class="panel panel-default">
									<div class="panel-body">
										<form class="form-inline" id="selectByCondition" name="selectByCondition"
											action="${pageContext.request.contextPath}/categoryManage/findCategorys.action"
											method="post">
										<div>
												<div class="form-group ">
													<label for="username">收支类型</label> 
													<select class="form-control" name="parent_category"  id="parent_category">
														<option value="">--------请选择--------</option>
														<option value="收入" 
														<c:if test="${findShouzhiCategory.parent_category=='收入' }">selected="selected"</c:if>
														>收入</option>
														<option value="支出" 
														<c:if test="${findShouzhiCategory.parent_category=='支出' }">selected="selected"</c:if>
														>支出</option>
													</select>
												</div>
												<div class="form-group ">
													<label for="email">收支子类型</label> <input type="text"
														class="form-control" name="son_category" id="son_category"
														placeholder="请输入收支子类型"  value="${findShouzhiCategory.son_category }">
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
							<h1 style="color:red;">当前收支类型信息为空</h1>
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
												<th>收支类型</th>
												<th>收支子类型</th>
												<th>操作</th>
											</tr>
										</thead>

										<!-- 表格中的数据 -->
										<tbody id="tableData">
											<c:forEach items="${ pageBean.pageList}" var="shouzhiCategory">
												<tr class="active">
													<td>${shouzhiCategory.szcid }</td>
													<td>${shouzhiCategory.parent_category}</td>
													<td>${shouzhiCategory.son_category}</td>
													
													<td><a href="#" data-toggle="modal" id="toshouzhiCategoryEditPage"
														class="btn btn-info btn-xs" data-target="#shouzhiCategoryEditModal"
														onclick="toshouzhiCategoryEditPage(${shouzhiCategory.szcid });"> 修改 <span
															class="glyphicon glyphicon-edit" id="myedit"></span>
													</a> <!-- 修改 --> 
													
													
													
													
													<!-- 删除--> <a
														class="btn btn-danger btn-xs" href="javascript:void(0)"
														onclick="deleteshouzhiCategory(${shouzhiCategory.szcid});">
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
								<!--分页数据${ pageBean} -->
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
					
					<!-- 添加收入类型的模态框 -->
					<div class="modal fade" id="insertIncomeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
							<div class="modal-dialog" id="Add_income_modal_dialog" style="width:300px;">
								<form id="add_income_category_form" name="add_income_category_form" method="post"
								 action="${pageContext.request.contextPath}/categoryManage/addCategory.action">
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal"
												aria-hidden="true">&times;</button>
											<h4 class="modal-title" id="myModalLabel2">添加收入类型</h4>
										</div>
										<div class="modal-body">
											<div class="input-group">
												<span class="input-group-addon"> 收入类型</span>
												 <input type="text" name="son_category"
													id="add_income_son_category" class="form-control"
													required="required" placeholder="请输入收入类型">
											</div>
											<div style="margin-top:10px;">
												<label id="add_income_category_msg" style="color:red;"></label> 
												<input type="hidden" name="parent_category" id="add_income_parent_category" value="收入">
												<input type="hidden" id="currentPage4" name="currentPage" value="${pageBean.currentPage }"/>
											</div>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-default"
												data-dismiss="modal">关闭</button>
											<button type="submit" class="btn btn-primary"
												id="add_income_category_btn">添加类型</button>
										</div>
									</div><!-- /.modal-content -->
								</form>
						</div><!-- modal-dialog -->
					</div><!-- 添加收入类型的模态框 ->
					
					<!-- 添加支出类型的模态框 -->
					<div class="modal fade" id="insertSpendModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
							<div class="modal-dialog" id="Add_income_modal_dialog" style="width:300px;">
								<form id="add_spend_category_form" name="add_spend_category_form" method="post"
								 action="${pageContext.request.contextPath}/categoryManage/addCategory.action">
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal"
												aria-hidden="true">&times;</button>
											<h4 class="modal-title" id="myModalLabel2">添加支出类型</h4>
										</div>
										<div class="modal-body">
											<div class="input-group">
												<span class="input-group-addon"> 支出类型</span>
												 <input type="text" name="son_category"
													id="add_spend_son_category" class="form-control"
													required="required" placeholder="请输入支出类型">
											</div>
											<div style="margin-top:10px;">
												<label id="add_spend_category_msg" style="color:red;"></label> <input
													type="hidden" name="parent_category" value="支出">
													<input type="hidden" id="currentPage5" name="currentPage" value="${pageBean.currentPage }"/>
											</div>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-default"
												data-dismiss="modal">关闭</button>
											<button type="submit" class="btn btn-primary"
												id="add_spend_category_btn">添加类型</button>
										</div>
									</div><!-- /.modal-content -->
								</form>
						</div><!-- modal-dialog -->
					</div><!-- 添加支出类型的模态框 ->
					
					
					<!-- 修改用户的模态框 -->
					<div class="modal fade" id="shouzhiCategoryEditModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					    <div class="modal-dialog">
					        <div class="modal-content">
					      		 <form id="updateShouzhiForm" name="updateShouzhiForm"
					      		 action="${pageContext.request.contextPath}/categoryManage/editShouzhiCategory.action"  method="post" 
					      		 >
					            <div class="modal-header">
					                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					                <h4 class="modal-title" id="myModalLabel">编辑收支信息</h4>
					            </div>
					            <div class="modal-body"><!-- 在这里添加一些文本 -->
					            	
										<!-- 输入框组 -->
										<!-- 用户名或者密码输入错误，请重新输入 -->
										<div>
											<label id="update_msgLabel" style="color:red;">${msg }</label>
										</div>
										<!-- 输入框组 -->
										<div class="form-group">
											<label for="parent_category">收支类型</label> 
											<input type="text" class="form-control" placeholder="请输入用户名"
												name="parent_category" id="update_parent_category" readonly="readonly">
										</div>
				
										<!-- 输入框组 -->
										<div class="form-group">
											<label for="son_category">收支子类型</label> 
											<input type="text" class="form-control" placeholder="收支子类型"
												name="son_category" id="update_son_category">
											<input type="hidden" name="old_son_category" id="old_son_category" >
											<input type="hidden" name="szcid" id="update_szcid">
											<input type="hidden" id="currentPage2" name="currentPage2" value="${pageBean.currentPage }"/>
											<input type="hidden" id="exitShouzhi" name="exitShouzhi"/>
										</div>
				
					            </div>
					            <div class="modal-footer">
					                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					                <button id="update_shouzhiCategory_btn" type="button" class="btn btn-primary" >提交更改</button><!-- onclick="updateUserFunction()" -->
					                <input type="submit" hidden="hidden" id="newBtnSubmit">
					            </div>
					            </form>
					        </div><!-- /.modal-content -->
					    </div><!-- /.modal -->
					</div><!-- 修改用户的模态框 -->
					
					

					</div><!-- userManage -->
			</div>
		</div><!-- row -->

	</div>
	<!-- container -->
</body>
</html>