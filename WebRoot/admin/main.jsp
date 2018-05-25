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
	
	//去用户修改信息页面
	function toUserEditPage(uid){//异步交互事件
// 		alert(uid);
		$.ajax({
				type : "get",
				url : "/financialManage/userManage/toEditPage.action",
				data : {"uid":uid},
// 				data:JSON.stringify({"uid":uid}),
				contentType:"application/json;charset=utf-8",/* 发送数据给服务器时所用的内容类型	*/
				dataType : "json",//返回时的数据类型json
				success : function(data) {
// 					alert("成功");
					$("#update_uid").val(data.user.uid);
					$("#update_username").val(data.user.username);
					$("#update_password").val(data.user.password);
					$("#update_email").val(data.user.email);
					$("#update_phone").val(data.user.phone);
					var sex=data.user.sex;
					if(sex!=null&&sex!=""){
						if(sex=='男'){
							$("#nan_radio").attr("checked","checked");
						}
						else{
							$("#nv_radio").attr("checked","checked");
						}
					}
					else{
						$("#nan_radio").attr("checked","checked");
					}
					$("#old_username").val(data.old_username);//保存原来的用户名
					
				},
			/* 	 error:function(jqXHR,textStatus,errorThrown){  
			        alert("build failure!");  
			        console.log(jqXHR);  
			        console.log(textStatus);  
			        console.log(errorThrown);  
			    }   */
				error:function(data){
					alert("fail");
				}
// 			    error: function(XMLHttpRequest, textStatus, errorThrown) 
// 			    {  alert(XMLHttpRequest.status);  alert(XMLHttpRequest.readyState);  alert(textStatus); }
			});
	};
	//删除当前用户
	function deleteuser(uid) {
// 		alert("uid:"+uid);
		var currentPage2=$("#currentPage3").val();//但前页
		if (confirm('确认要删除该用户吗?')) {
			//判断当前用户是否可以进行删除
			$.ajax({
				type : "get",
				url : "/financialManage/userManage/ajaxConfirmDeleteUser.action",
				data : {"uid":uid},
				contentType:"application/json;charset=utf-8",/* 发送数据给服务器时所用的内容类型	*/
				dataType : "json",//返回时的数据类型json
				success : function(data) {
// 					alert("成功");
					if(data.name=="yes"){//可以删除
						alert("删除用户成功！");
						//跳转到删除用户action
						window.location.href="/financialManage/userManage/deleteUser.action?uid="+uid+"&currentPage2="+currentPage2;
					}
					else{
						alert("当前用户有很多信息，无法进行直接删除当前用户！");
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
			<!-- 左侧栏 -->
			<div class="col-md-2">
				<div class="left">
					<ul class="nav nav-pills nav-stacked" role="tablist">
						<li class="active" >
							<a  href="${pageContext.request.contextPath}/userManage/findUsers.action">
								<span class="glyphicon glyphicon-user"></span>	
								个人用户管理
							</a>
						</li>
						<li>
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
								<div class="col-md-10">
									<h1 class="page-header">个人用户管理</h1>
								</div>
								<div class="col-md-2">
									<a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#insertUserModal">
									<span class="glyphicon glyphicon-plus"></span> 添加用户</a>
								</div>
							</div>
							<div id="mian">
								<!-- 面板 -->
								<div class="panel panel-default">
									<div class="panel-body">
										<form class="form-inline" id="selectByCondition" name="selectByCondition"
											action="${pageContext.request.contextPath}/userManage/findUsers.action"
											method="post">
										<div>
												<div class="form-group ">
													<label for="username">用户名</label> <input type="text"
														class="form-control" name="username" id="username"
														placeholder="请输入用户名" value="${findUser.username}">
												</div>
												<div class="form-group ">
													<label for="email">邮箱</label> <input type="text"
														class="form-control" name="email" id="email"
														placeholder="请输入邮箱" value="${findUser.email}">
												</div>
												<div class="form-group ">
													<label for="phone">手机号</label> <input type="text"
														class="form-control" name="phone" id="phone"
														placeholder="请输入手机号" value="${findUser.phone}">
												</div>
												<!--  默认情况下，当前页是第0页 -->
												<input type="hidden" id="currentPage" name="currentPage" value="0"/>
<!-- 												<input type="hidden" id="currentPage3" name="currentPage3"/> -->
												<div class="form-group "><!-- col-md-4 col-xs-4 -->
													<input type="submit" class="btn btn-primary btn-block" value="查询" >
												</div>
											</div>
										</form>
									</div>
								</div>
							</div><!-- main -->
						
						<c:if test="${ pageBean.pageList==null}">
							<h1 style="color:red;">当前用户信息为空</h1>
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
												<th>用户名</th>
												<th>密码</th>
												<th>性别</th>
												<th>邮箱</th>
												<th>手机</th>
												<th>操作</th>
											</tr>
										</thead>

										<!-- 表格中的数据 -->
										<tbody id="tableData">
											<c:forEach items="${ pageBean.pageList}" var="user">
												<tr class="active">
													<td>${user.uid }</td>
													<td>${user.username }</td>
													<td>${user.password}</td>
													<td>${user.sex}</td>
													<td>${user.email}</td>
													<td>${user.phone}</td>
													
													<td><a href="#" data-toggle="modal" id="toUserEditPage"
														class="btn btn-info btn-xs" data-target="#userEditModal"
														onclick="toUserEditPage(${user.uid });"> 修改 <span
															class="glyphicon glyphicon-edit" id="myedit"></span>
													</a> <!-- 修改 --> 
													
													
													
													
													<!-- 删除--> <a
														class="btn btn-danger btn-xs" href="javascript:void(0)"
														onclick="deleteuser(${user.uid});">
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
					
					<!-- 添加用户的模态框 -->
					<div class="modal fade" id="insertUserModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					    <div class="modal-dialog">
					        <div class="modal-content">
					      		 <form action="${pageContext.request.contextPath}/userManage/addUser.action"
										id="inserUserForm" method="post">
					            <div class="modal-header">
					                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					                <h4 class="modal-title" id="myModalLabel">添加用户</h4>
					            </div>
					            <div class="modal-body"><!-- 在这里添加一些文本 -->
					            	
										<!-- 输入框组 -->
										<!-- 用户名或者密码输入错误，请重新输入 -->
										<div>
											<label id="insert_msgLabel" style="color:red;">${msg }</label>
										</div>
										<!-- 输入框组 -->
										<div class="form-group">
											<label for="username">用户名</label> 
											<input type="text" class="form-control" placeholder="请输入用户名"
												name="username" id="insert_username" required="required">
										</div>
				
										<!-- 输入框组 -->
										<div class="form-group">
											<label for="password">密码</label> 
											<input type="password" class="form-control" placeholder="请输入密码"
												name="password" id="insert_password" required="required" >
										</div>
				
										<!-- 输入框组 -->
										<div class="form-group">
											<label for="email">邮箱</label> 
											<input type="email" class="form-control" placeholder="请输入邮箱"
												name="email" id="insert_email" required="required">
										</div>
				
										<!-- 输入框组 -->
										<div class="form-group">
											<label for="phone">手机</label> 
												<input type="text" class="form-control" placeholder="请输入手机号"
													name="phone" id="insert_phone" required="required">
										</div>
				
										<!-- 输入框组 -->
										<div class="form-group">
											<label id="sexLabel">性别&nbsp;&nbsp;   </label>
											  	 <label class="radio-inline">
													<input type="radio" class="sexradio" name="sex" value="男" checked="checked" >男  
												</label> 
												<span class="rightradio"> 
													<label class="radio-inline">
														<input type="radio" class="sexradio" name="sex" value="女">女
													</label>
												</span>
										</div>
					            </div>
					            <div class="modal-footer">
					                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					                <button id="insert_user_btn" type="submit" class="btn btn-primary" >提交更改</button>
					            </div>
					            </form>
					        </div><!-- /.modal-content -->
					    </div><!-- /.modal -->
					</div><!-- 添加用户的模态框 -->
					
					
					<!-- 修改用户的模态框 -->
					<div class="modal fade" id="userEditModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					    <div class="modal-dialog">
					        <div class="modal-content">
					        <!-- action="${pageContext.request.contextPath}/userManage/editUser.action"  method="post" 
					        -->
					      		 <form id="updateUserForm" name="updateUserForm"
					      		 action="${pageContext.request.contextPath}/userManage/editUser.action"  method="post" 
					      		 >
					            <div class="modal-header">
					                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					                <h4 class="modal-title" id="myModalLabel">编辑用户信息</h4>
					            </div>
					            <div class="modal-body"><!-- 在这里添加一些文本 -->
					            	
										<!-- 输入框组 -->
										<!-- 用户名或者密码输入错误，请重新输入 -->
										<div>
											<label id="update_msgLabel" style="color:red;">${msg }</label>
										</div>
										<!-- 输入框组 -->
										<div class="form-group">
											<label for="username">用户名</label> 
											<input type="text" class="form-control" placeholder="请输入用户名"
												name="username" id="update_username" required="required">
											<input type="hidden" name="old_username" id="old_username" >
											<input type="hidden" name="uid" id="update_uid">
											<input type="hidden" id="currentPage2" name="currentPage2" value="${pageBean.currentPage }"/>
										</div>
				
										<!-- 输入框组 -->
										<div class="form-group">
											<label for="password">密码</label> 
											<input type="password" class="form-control" placeholder="请输入密码"
												name="password" id="update_password" required="required">
										</div>
				
										<!-- 输入框组 -->
										<div class="form-group">
											<label for="email">邮箱</label> 
											<input type="email" class="form-control" placeholder="请输入邮箱"
												name="email" id="update_email">
										</div>
				
										<!-- 输入框组 -->
										<div class="form-group">
											<label for="phone">手机</label> 
												<input type="text" class="form-control" placeholder="请输入手机号"
													name="phone" id="update_phone">
										</div>
				
										<!-- 输入框组 -->
										<div class="form-group">
											<label id="sexLabel">性别&nbsp;&nbsp;   </label>
											  	 <label class="radio-inline">
													<input id="nan_radio" type="radio" class="sexradio" name="sex" value="男">男  
												</label> 
												<span class="rightradio"> 
													<label class="radio-inline">
														<input id="nv_radio" type="radio" class="sexradio" name="sex" value="女">女
													</label>
												</span>
										</div>
					            </div>
					            <div class="modal-footer">
					                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					                <button id="update_user_btn" type="submit" class="btn btn-primary" >提交更改</button><!-- onclick="updateUserFunction()" -->
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