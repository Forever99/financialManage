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
<link rel="stylesheet" href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css">
<!-- jquery文件，务必在bootstrap.min.js之前引入 -->
<script type="text/javascript" src="${pageContext.request.contextPath}/jquery/jquery.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js"></script>

<!-- 引入JQuery -->
<!-- <script type="text/javascript" -->
<!-- 	src="${pageContext.request.contextPath}/jquery-easyui-1.5.4.2/jquery.min.js"></script> -->
<%-- <!-- 引入EasyUI -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5.4.2/jquery.easyui.min.js"></script>
<!-- 引入EasyUI的中文国际化js，让EasyUI支持中文 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5.4.2/locale/easyui-lang-zh_CN.js"></script>
<!-- 引入EasyUI的样式文件-->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5.4.2/themes/default/easyui.css"
	type="text/css" />
<!-- 引入EasyUI的图标样式文件-->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5.4.2/themes/icon.css"
	type="text/css" /> --%>

<!-- 自定义文件 -->
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/main.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/main.js"></script>
<%-- <!-- 引入自定义文件 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/dateTime.js"></script> --%>
	
<!-- 自定义控件 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath }/jedate/jquery.jedate.js"></script>
<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath }/jedate/skin/jedate.css">
	
<!-- 计算器 -->
<!-- <script src="jquery-2.1.4.min.js"></script> -->
<link rel="stylesheet" href="${pageContext.request.contextPath }/bootstrap/cal/SimpleCalculadorajQuery.css">
<script src="${pageContext.request.contextPath }/bootstrap/cal/SimpleCalculadorajQuery.js"></script>   

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

	//模态框 --去修改的事件
	//	 $("#toeditPage").click(function(){   //难点：解决id的传值问题  把id放在hidden中，然后获取即可
	//		 var id=$("#update_delete_id").val();
	function toeditPage(id) {
		// 		 alert(id);
		//重要！！！！！！！！！！！！
		$("#my_szr_category").empty();//清空select中的数据
		//异步交互事件
		//返回ShouzhiRecord对象 +
		$
				.ajax({
					type : "get",
					url : "/financialManage/shouzhiRecord/toEdit.action",
					data : {
						"id" : id
					},
					dataType : "json",//返回时的数据类型json
					success : function(data) {
						// 				alert("成功");
						//alert(data.shouzhiRecord.szrid);
						//实例：后台响应数据
						//{"shouzhiRecord":
						//{"shouzhiCategory":{"parent_category":"支出","son_category":"伙食费","szcid":2},
						//"szr_comment":"午餐","szr_date":1519920000000,"szr_num":-10,"szrid":2,"user_id":1},
						//"son":["伙食费","住宿费","交通费","通讯费"]}

						//select标签   my_szr_category
						//循环遍历
						$.each(data.son,function() {
							var optionEle = $("<option></option>").append(this).attr("value",this);
							//添加选中的情况
							if (data.shouzhiRecord.shouzhiCategory.son_category == this) {
								optionEle.attr("selected",
										"selected");//添加属性
							}
							optionEle.appendTo("#my_szr_category");//添加option到select标签中
						});

						$("#my_szrid2").val(data.shouzhiRecord.szrid);
						//回显示在模态框中
						$("#my_szrid").val(data.shouzhiRecord.szrid);
						$("#my_szr_comment")
								.val(data.shouzhiRecord.szr_comment);
						$("#my_szr_num").val(data.shouzhiRecord.szr_num);

						//回显格式化之后的对象   String类型
						//alert(data.formatDate);
						//$("#my_szr_date").val(data.formatDate);
// 						$("#my_szr_date").datebox("setValue",
// 								data.shouzhiRecord.szr_date);
								
						$("#my_szr_date").val(
								data.shouzhiRecord.szr_date);

						$("#my_szr_category").val(
								data.son.shouzhiCategory.son_category);

						/* for(var i=0;i<data.son.length;i++){
							//alert(i);
							var y=data.son[i];
							$("option").append("<option value='y'>y</option>");
						} */

						// 				$("#my_szr_category").
						//$("#my_szr_category").val(data.shouzhiRecord.shouzhiCategory.son_category);
					},
					error : function(data) {
						alert("失败");
					}
				});
	};
	/*
		// alert("当前id:"+id);
	};*/

	//修改收支记录信息
	//$.post(URL,data,callback);   
	//失败
	function updateShouzhiRecord() {
		$.post("/financialManage/shouzhiRecord/edit.action", $("#updateform")
				.serialize(), function(data) { //序列化数据为对象
			//回调为ok时，弹出alert框，并重新刷新页面
			alert("更新收支记录成功！");
			window.location.reload();
		});
	}

	//删除收支记录信息
	function deleteshouzhiRecord(id) {
		if (confirm('确认要删除该收支记录吗?')) {
			$.post("/financialManage/shouzhiRecord/deleteOne.action", {
				"id" : id
			}, function(data) {
				//回调为ok时，弹出alert框，并重新刷新页面
				alert("删除收支记录成功！");
				window.location.reload();
			});
		}
	}
</script>
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
					<li class="active"><a href="${pageContext.request.contextPath}/shouzhiRecord/findShouzhiRecord.action">财务管理</a></li>
					<li><a
						href="${pageContext.request.contextPath}/toFinancialCount.action">财务统计</a></li>
					<li><a href="${pageContext.request.contextPath}/financialAnalysis/toFinancialAnalysis.action">财务分析</a></li>
					<li><a href="${pageContext.request.contextPath}/budget/findBudget.action">财务预算</a></li>
					<li><a href="${pageContext.request.contextPath}/wishlist/findAllWishList.action">心愿单</a></li>
					<li><a href="${pageContext.request.contextPath}/memorandum/listMemorandum.action">备忘录</a></li>
					<li class="hidden-xs"><a href="#" data-toggle="modal" data-target="#countMachine">计算器</a></li>
					<li><a href="${pageContext.request.contextPath}/news/findNewsList.action?currentPage=0">财务新闻</a></li>
				</ul>

				<!-- 导航元素 -->
				<ul class="nav navbar-nav navbar-right">
					<li><a href="javascript:void(0)">欢迎：${sessionScope.user.username}</a></li>
					
					<li class="dropdown" id="user_setting">
					    <button type="button" class="btn dropdown-toggle" id="dropdownMenu1" data-toggle="dropdown">
					    	<span class="glyphicon glyphicon-user"></span>&nbsp;用户设置
					        <span class="caret"></span>
					    </button>
					    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
					        <li role="presentation">
					            <a role="menuitem" tabindex="-1" href="${pageContext.request.contextPath}/user/toUserSetting.action">
					            <span class="glyphicon glyphicon-user"></span>用户设置
					            </a>
					        </li>
					        <li role="presentation" class="divider"></li>
					        <li role="presentation">
					            <a role="menuitem" tabindex="-1" href="${pageContext.request.contextPath}/user/logout.action">
					          <span class="glyphicon glyphicon-log-out"></span>退出登录
					            </a>
					               <input type="hidden" id="uid" name="uid" value="${sessionScope.user.uid }">
					        </li>
					    </ul>
					</li><!-- 用户设置范围 -->
				</ul>
			</div>
		</div>
	</nav>

	<!-- 网页的主体内容显示 -->
	<!-- style="background:#fff;border:1px solid;width:400px;height:400px" -->
	<div class="container">

		<div class="row">
			<!-- 左  右的布局 -->
			<!-- 左边-->
			<div class="col-md-9 ">
				<ul class="nav nav-pills">
					<li class="active"><a data-toggle="tab"
						href="#income_spend_record">收支明细</a></li>
					<li><a data-toggle="tab" href="#incomeRecord">收入记账</a></li>
					<li><a data-toggle="tab" href="#spendRecord">支出记账</a></li>
				</ul>
				<!-- 跳转的页面 -->
				<div class="tab-content">

					<!-- 收支明细页面 -->
					<div id="income_spend_record" class="tab-pane fade in active">

						<div id="year_month">
							<!-- 面板 -->
							<div class="panel panel-default">
								<div class="panel-body">
									<form class="form-inline" id="selectByCondition"
										action="${pageContext.request.contextPath}/shouzhiRecord/findShouzhiRecord.action"
										method="get">
									<div class="col-md-11 col-md-offset-1 col-xs-11 col-xs-offset-1 " id="shouzhi_top">
											<span>
												<label for="attYearMonth" style="font-size:20px;" class="hidden-xs">收支年月</label>
												 <input type="text"  id="attYearMonth" 
													 name="szr_date" value="${date_condition}"  placeholder="请输入收支年月"
													 readonly="readonly">
											</span>
											<span>
												<label for="beizhu" style="font-size:20px;" class="hidden-xs">收支备注</label> 
												<input type="text" name="szr_comment" id="beizhu" class="form-control hidden-xs"
													placeholder="请输入收支备注名" value="${comment_condition}">
											</span>
<!-- 											<div class="form-group ">col-md-4 col-xs-4 -->
												<label><input type="submit" id="shouzhiSubmit" class="btn btn-primary" value="查询" ></label>
<!-- 											</div> -->
										</div>
									</form>
								</div>
							</div>

						</div>
						<!-- year_month -->

						<h3>收支数据明细</h3>
						<c:if test="${ pageBean.pageList==null}">
							<h1 style="color:red;">当前收支数据为空</h1>
						</c:if>
						<c:if test="${ pageBean.pageList!=null}">
							<!-- mytable用来控制宽高 -->
							<div class="mytable">
								<form action="" method="post">
									<table class="table">
										<thead>
											<tr>
												<th class="hidden-xs" style="text-align:left;">全选<input type="checkbox"
													id="all"></th>
												<th class="hidden-xs">编号</th>
												<th>收支备注</th>
												<th>金额</th>
												<th>收支日期</th>
												<th>收支类型</th>
												<th>操作</th>
											</tr>
										</thead>

										<!-- 表格中的数据 -->
										<tbody id="tableData">
											<c:forEach items="${ pageBean.pageList}" var="shouzhiRecord">
												<tr class="active">
													<td class="hidden-xs"><input type="checkbox"
														id="${shouzhiRecord.szrid }" name="record"></td>
													<td class="hidden-xs">${shouzhiRecord.szrid }</td>
													<td>${shouzhiRecord.szr_comment}</td>
													<td>${shouzhiRecord.szr_num}</td>
													<td>${shouzhiRecord.szr_date}</td>
													<td>${shouzhiRecord.shouzhiCategory.son_category}</td>
													
													<td><a href="#" data-toggle="modal" id="toeditPage"
														class="btn btn-info btn-xs" data-target="#myeditModal"
														onclick="toeditPage(${shouzhiRecord.szrid });"> 修改 <span
															class="glyphicon glyphicon-edit" id="myedit"></span>
													</a> <!-- 修改 --> 
													
													
													
													
													<!-- 删除--> <a
														class="btn btn-danger btn-xs" href="javascript:void(0)"
														id="toDelete" onclick="deleteshouzhiRecord(${shouzhiRecord.szrid });">
															删除<span class="glyphicon glyphicon-trash"></span> <input
															type="hidden" id="update_delete_id"
															value="${shouzhiRecord.szrid }">
													</a></td>
													
													
												</tr>
											</c:forEach>
										</tbody>
									</table>
									<button type="button" class="btn btn-warning hidden-xs" id="deleteBatch">批量删除</button>
								</form>



								<!-- 分页功能的制作 -->
								<!--分页数据${ pageBean} -->
								<div align="center">
									<ul class="pagger pagination pagination-lg">
										<li><a
											href="${pageContext.request.contextPath}/shouzhiRecord/findShouzhiRecord.action?currentPage=0&szr_date=${date_condition}&szr_comment=${comment_condition}"
											id="pageThing">首页</a></li>
										<li><c:if test="${pageBean.currentPage-1>=0}">
												<a
													href="${pageContext.request.contextPath}/shouzhiRecord/findShouzhiRecord.action?currentPage=${pageBean.currentPage-1}&szr_date=${date_condition}&szr_comment=${comment_condition} "
													id="pageThing">上一页</a>
											</c:if> <c:if test="${pageBean.currentPage-1<0}">
												<a href="javascript:void(0)" id="pageThing">上一页</a>
											</c:if></li>
										<li><c:if
												test="${pageBean.currentPage+1<pageBean.allPage}">
												<a
													href="${pageContext.request.contextPath}/shouzhiRecord/findShouzhiRecord.action?currentPage=${pageBean.currentPage+1}&szr_date=${date_condition}&szr_comment=${comment_condition}"
													id="pageThing">下一页</a>
											</c:if> <c:if test="${pageBean.currentPage+1>=pageBean.allPage}">
												<a href="javascript:void(0)" id="pageThing">下一页</a>
											</c:if></li>
										<li><a
											href="${pageContext.request.contextPath}/shouzhiRecord/findShouzhiRecord.action?currentPage=${pageBean.allPage-1}&szr_date=${date_condition}&szr_comment=${comment_condition}"
											id="pageThing">尾页</a></li>
									</ul>
								</div>
								<!-- 分页所在 -->

							</div>
							<!-- mytable的范围之内 -->
						</c:if>

						<!-- 模态框（Modal） -->
						<div class="modal fade" id="myeditModal" tabindex="-1"
							role="dialog" aria-labelledby="myModalLabel3" aria-hidden="true">
							<div class="modal-dialog">
								<!-- 								action="${pageContext.request.contextPath}/shouzhiRecord/edit.action" method="post" -->
								<form id="updateform">
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" id="closeBtn"
												data-dismiss="modal" aria-hidden="true">&times;</button>
											<h4 class="modal-title" id="myModalLabel3">修改当前收支记录</h4>
										</div>

										<div class="modal-body">

											<!-- 错误提示标签 -->
											<label id="forgetmsg"></label>
											<!--这里添加一些文本【主体】  -->
											<input type="hidden" name="szrid" id="my_szrid2">
											<div class="form-group">
												<label for="my_szrid">收支编号</label> <input type="text"
													id="my_szrid" class="form-control" disabled="disabled">
											</div>
											<div class="form-group">
												<label for="szr_comment">收支备注</label> <input type="text"
													name="szr_comment" id="my_szr_comment" class="form-control"
													required="required" placeholder="请输入收支备注">
											</div>
											<div class="form-group">
												<label for="szr_num">收支金额</label> <input type="text"
													name="szr_num" id="my_szr_num" class="form-control"
													required="required" placeholder="请输入收支金额">
											</div>
											<div class="form-group">
												<label for="szr_date">收支日期</label> 
												
												<input type="text" name="szr_date"
													id="my_szr_date" class="form-control"
													required="required"  placeholder="请输入收支日期">
													
												<!-- 	<input type="text"
													style="width:568px;height:34px;" name="szr_date"
													id="my_szr_date" class="form-control   easyui-datebox"
													required="required" editable="false" placeholder="请输入收支日期"> -->
													
												<!-- </div> -->
												<!-- 保存查询的数据 -->
												<div>
													<label id="saveCategory"></label>
												</div>

												<div class="form-group">
													<label for="szr_category">收支类型</label> <select
														class="form-control" id="my_szr_category"
														name="shouzhiCategory.son_category">
													</select>
													<!-- 														<option value="" id="optionFirst">--请选择--</option> -->
													<!-- 													<c:forEach items="${sessionScope.sonCategory}" var="son"> -->
													<!-- 														<option value="${son.son_category}" -->
													<!-- 														<%-- 	<c:if test="${sessionScope.currentCategory==son.son_category}"> selected</c:if> --%>> -->
													<!-- 															${son.son_category}</option> -->
													<!-- 													</c:forEach> -->
												</div>

											</div>
											<div class="modal-footer">
												<button type="button" id="closeBtn2" class="btn btn-default"
													data-dismiss="modal">关闭</button>
												<button type="button" class="btn btn-primary"
													onclick="updateShouzhiRecord()">提交更改</button>
												<!-- 											<input type="submit" class="btn btn-primary" value="提交更改" > -->
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

					</div>
					<!-- 收支明细页面 -->


					<!-- 收入记账 -->
					<div id="incomeRecord" class="tab-pane fade">

						<div class="row">
							<div class="col-md-12 ">
								<h1>收入记账</h1>
								<hr />
								<form id="add_income_form"
									action="${pageContext.request.contextPath}/shouzhiRecord/addShouzhiRecord.action"
									method="post">
									
									<div>
										<label id="msgLabel" style="color:red;">${msg }</label>
									</div>
									<div class="form-group">
										<div class="input-group">
											<span class="input-group-addon"> 收入备注*</span> <input
												type="text" name="szr_comment" id="add_income_szr_comment"
											    class="form-control" placeholder="请输入收入备注"> 
<!-- 												<span>&nbsp;<label -->
<!-- 												class="add_income_msg" id="add_income_comment_msg" -->
<!-- 												style="color:red;font-size:20px;text-align:center;"></label></span> -->
										</div>
									</div>
									<div class="form-group">
										<div class="input-group">
											<span class="input-group-addon"> 收入金额*</span> <input
												type="text" name="szr_num" id="add_income_szr_num"
												class="form-control" 
												placeholder="请输入收入金额(必须是数字)"> <span><!-- &nbsp; -->
<!-- 												<label -->
<!-- 												class="add_income_msg" id="add_income_num_msg" -->
<!-- 												style="color:red;font-size:20px;text-align:center;"></label> -->
												</span>
										</div>
									</div>
									<div class="form-group">
										<div class="input-group">
											<span class="input-group-addon"> 收入日期*</span> 
											<!-- style="width:412px;" -->
											<input type="text" name="szr_date" id="add_income_szr_date"
												class="form-control"  
												placeholder="请输入收入日期" readonly="readonly" editable="false"> 
												
												<!-- <input
												type="text" name="szr_date" id="add_income_szr_date"
												style="width:414px;height:34px;"
												class="form-control   easyui-datebox" editable="false"
												placeholder="请输入收入日期">  -->
												
												<span><!-- &nbsp;<label
												class="add_income_msg" id="add_income_date_msg"
												style="color:red;font-size:20px;text-align:center;"></label> --></span>
										</div>

									</div>
									<div class="row">
										<div class="col-md-7 col-xs-7">
											<div class="form-group">
													<div class="input-group">
														<span class="input-group-addon"> 收入类型*</span> <select
															class="form-control" id="add_income_category"
															name="shouzhiCategory.szcid"  >
															<c:forEach items="${incomes}" var="income">
																<option value="${income.szcid}">${income.son_category}</option>
															</c:forEach>
														</select> 
														<input type="hidden" name="user_id"
														value="${sessionScope.user.uid}">
													</div>
											</div>
										</div>
										<div class="col-md-4 col-md-offset-1 col-xs-5" >
											<a class="btn btn-primary"  id="add_shouru" data-toggle="modal" href="javascript:void(0)"
												data-target="#Add_income_modal">
												<span class="glyphicon glyphicon-plus"></span>&nbsp;添加收入类型
											</a>
										</div>
									</div>
									<div class="row">
									 	<div class="col-md-3 col-xs-6">
										<input type="submit" id="add_income_submit"
											class="btn btn-success btn-lg text-center" value="提交收入信息"> <span
											id="submit_dis_reset"></span> 
										</div>	
										<div class="col-md-3 col-xs-6">	
										<input type="reset" id="add_income_reset" class="btn btn-success btn-lg"
											value="重置收入信息">
										</div>
									</div>
									
								</form>
							</div><!-- col-md-6  col-md-offset-3 -->
						</div><!-- row -->

					</div><!-- 收入记账 -->

					<!-- 添加收入模态框  Add_income_modal -->
					<div class="modal fade" id="Add_income_modal" tabindex="-1"
						role="dialog" aria-labelledby="myModalLabel2" aria-hidden="true">
						<div class="modal-dialog" id="Add_income_modal_dialog">
							<form id="add_income_category_form">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"
											aria-hidden="true">&times;</button>
										<h4 class="modal-title" id="myModalLabel2">添加收入类型</h4>
									</div>
									<div class="modal-body">
										<div class="input-group">
											<span class="input-group-addon"> 收入类型</span> <input
												type="text" name="son_category"
												id="add_income_category_input" class="form-control"
												required="required" placeholder="请输入收入类型">
										</div>
										<div style="margin-top:10px;">
											<label id="add_income_category_msg"></label> <input
												type="hidden" name="parent_category" value="收入">
										</div>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-default"
											data-dismiss="modal">关闭</button>
										<button type="button" class="btn btn-primary"
											id="add_income_category_btn">添加类型</button>
									</div>
								</div><!-- /.modal-content -->
							</form>
						</div><!-- modal-dialog -->
					</div><!-- <!-- 添加收入模态框  Add_income_modal --> 

					<!-- 支出记账 -->
					<div id="spendRecord" class="tab-pane fade">
						<!-- 支出记账 -->
						<div class="row">
							<div class="col-md-12">
								<h1>支出记账</h1>
								<hr />
								<form id="add_spend_form"
									action="${pageContext.request.contextPath}/shouzhiRecord/addShouzhiRecord.action"
									method="post">
									
									<div>
										<label id="msgSpendLabel" style="color:red;">${msg }</label>
									</div>
									
									<div class="form-group">
										<div class="input-group">
											<span class="input-group-addon"> 支出备注*</span> <input
												type="text" name="szr_comment" id="add_spend_szr_comment"
												class="form-control"
												placeholder="请输入支出备注"> </span>
										</div>
									</div>
									<div class="form-group">
										<div class="input-group">
											<span class="input-group-addon"> 支出金额*</span> <input
												type="text" name="szr_num" id="add_spend_szr_num"
												class="form-control"
												placeholder="请输入支出金额(必须是数字)"></span>
										</div>
									</div>
									<div class="form-group">
										<div class="input-group">
											<span class="input-group-addon"> 支出日期*</span> 
											
											<input type="text" name="szr_date" id="add_spend_szr_date"
												class="form-control" editable="false"
												placeholder="请输入支出日期"> 
										</div>

									</div>
									<div class="row">
										<div class="col-md-7 col-xs-7">
											<div class="form-group">
												<div class="input-group">
													<span class="input-group-addon"> 支出类型*</span> <select
														class="form-control" id="add_spend_category"
														name="shouzhiCategory.szcid">
														<c:forEach items="${spends}" var="spend">
															<option value="${spend.szcid}">${spend.son_category}</option>
														</c:forEach>
													</select> 
													</div>
											</div>	
										</div><!-- col-md-7 col-xs-7 -->
										<div class="col-md-4 col-md-offset-1 col-xs-5">		
											<a class="btn btn-primary" data-toggle="modal" href="javascript:void(0)"
												data-target="#Add_spend_modal" id="add_zhichu">
												<span class="glyphicon glyphicon-plus"></span>&nbsp;添加支出类型
											</a>
											<input type="hidden" name="user_id"
												value="${sessionScope.user.uid}">
										</div>
										
									</div>
									
									<div class="row">
									 	<div class="col-md-3 col-xs-6">
										<input type="submit" id="add_spend_submit"
											class="btn btn-success btn-lg" value="提交支出信息">  
										</div>	
										<div class="col-md-3 col-xs-6">	
										<input type="reset" id="add_spend_reset" class="btn btn-success btn-lg"
											value="重置支出信息">
										</div>
									</div>
								</form>
							</div><!-- col-md-6  col-md-offset-3 -->
						</div><!-- row -->

					</div><!-- 支出记账 范围-->

					<!-- 添加支出模态框  Add_spend_modal -->
					<div class="modal fade" id="Add_spend_modal" tabindex="-1"
						role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
						<div class="modal-dialog" id="Add_spend_modal_dialog">
							<form id="add_spend_category_form">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
										<h4 class="modal-title" id="myModalLabel">添加支出类型</h4>
									</div>
									<div class="modal-body">
									
										<div class="input-group">
											<span class="input-group-addon"> 支出类型</span> 
											<input type="text" name="son_category"
												id="add_spend_category_input" class="form-control"
												required="required" placeholder="请输入支出类型">
										</div>
										<div style="margin-top:10px;">
											<label id="add_spend_category_msg"></label> 
											<input type="hidden" name="parent_category" value="支出">
										</div>
									</div>
									<div class="modal-footer">
										<button type="button" class="btn btn-default"
											data-dismiss="modal">关闭</button>
										<button type="button" class="btn btn-primary"
											id="add_spend_category_btn">添加类型</button>
									</div>
								</div>
								<!-- /.modal-content -->
							</form>
						</div><!-- modal-dialog -->
						
					</div><!-- /.modal -->


				</div><!-- 跳转的页面 范围 tab-content-->

			</div>
			<!-- col-md-9范围 -->


			<!-- 右侧信息栏制作 -->
			<div class="col-md-3 visible-md-3 hidden-xs hidden-sm"><!-- 在手机端不进行显示 -->
				<div class="panel panel-default">
			        <div class="panel-heading">
<!-- 			        	<span class="glyphicon glyphicon-option-vertical"></span> -->
			          		  财务新闻
<!-- 			          	  <span class="glyphicon glyphicon-option-vertical"></span> -->
			          	  	推荐
			          	  
			            <a href="${pageContext.request.contextPath}/news/findNewsList.action?currentPage=0" class="text-muted pull-right">more<span class="glyphicon glyphicon-chevron-right"></span></a>
			        </div>
			        <ul class="list-group">
			        	<c:forEach items="${newsList}" var="news">
				            <li class="list-group-item">
				            	<div>
				            		<a href="${pageContext.request.contextPath}/news/news.action?nid=${news.nid}"  target="_blank" class="text-muted" style="font-family: '黑体';margin-top: 2px;">
					                	${news.nTitle}
					                </a>
				                </div>
				                <div >
					                  <span style="width:150px;">
						               	  <span class="badge" style="margin-left: 0px;color: white;background-color: #5BC0DE;">
						               	  	${news.keyword}
						               	  </span>
					               	  </span>
					               	 <span class="badge" style="margin-left: 0px;color: white;background-color: #5BC0DE;">
					               		 阅读量: ${news.visitCount}
					               	 </span>
				                </div>
				            </li>
			            </c:forEach>
			        </ul>
			    </div>
			
			</div><!-- col-md-3范围 -->
			
				<!-- 提醒栏 remind-column -->

<!-- 				<div class="side-bar-card"> -->
<!-- 					<div class="card-title">提醒栏</div> -->
<!-- 					<div class="card-body"> -->
<!-- 						<div class="list"> -->

<!-- 							<div class="item"> -->
<!-- 								<div class="title">专业从事系统集成工作的高科技公司。</div> -->
<!-- 							</div> -->
<!-- 							<div class="item"> -->
<!-- 								<div class="title">专业从事系统集成工作的高科技公司。</div> -->
<!-- 							</div> -->
<!-- 							<div class="item"> -->
<!-- 								<div class="title">专业从事系统集成工作的高科技公司。</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
				<!-- side-bar-card提醒栏范围 -->

				<!-- 新闻栏 -->
				<!-- 				<div id="news-column"></div> -->
<!-- 				<hr /> -->
<!-- 				<div class="side-bar-card"> -->
<!-- 					<div class="card-title">新闻栏</div> -->
<!-- 					<div class="card-body"> -->
<!-- 						<div class="list"> -->
<!-- 							<div class="item"> -->
<!-- 								<div class="title">专业从事系统集成工作的高科技公司。</div> -->
<!-- 							</div> -->

<!-- 							<div class="item"> -->
<!-- 								<div class="title">专业从事系统集成工作的高科技公司。</div> -->
<!-- 							</div> -->
<!-- 						</div> -->
<!-- 					</div> -->
<!-- 				</div> -->
				<!-- 新闻栏 范围-->

		</div>
		<!-- row范围 -->
	</div>
	<!-- container范围 -->
	
	
	<!-- 	#countMachine -->
	
	<!--计算器-->
	<!-- 模态框（Modal） -->
	<div class="container">
		<div class="row">
			<div class="col-md-12 col-xs-12 col-sm-12">
			
				<div class="modal fade" id="countMachine" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				    <div class="modal-dialog">
				        <div class="modal-content">
				            <div class="modal-header">
				                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				                <h4 class="modal-title" id="myModalLabel">计算器</h4>
				            </div>
				            <div class="modal-body">
				            
				          	 <div id="demo"></div>   
				            </div>
				            <div class="modal-footer">
				                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				            </div>
				        </div><!-- /.modal-content -->
				    </div><!-- /.modal -->
				</div>
			</div>
		</div>
	</div><!--计算器-->
	
</body>
</html>