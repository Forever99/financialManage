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

<title>我的备忘</title>
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

<!-- 自定义控件 -->	
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/css/memorandum.css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/memorandum.js">	
</script>


<script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/ueditor/ueditor.all.min.js"> </script>
<!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
<!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
<script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/ueditor/lang/zh-cn/zh-cn.js"></script>


<!-- 时间控件 -->
<script type="text/javascript"
	src="${pageContext.request.contextPath }/jedate/jquery.jedate.js"></script>
<link type="text/css" rel="stylesheet"
	href="${pageContext.request.contextPath }/jedate/skin/jedate.css">

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
  
  	//可以获得编辑器的带格式的纯文本内容
	 function getPlainTxt() {
		//纯文本格式的内容存放在input标签中
        $("#editvalue").val(UE.getEditor('editor').getPlainTxt());
        var edit=$("#editvalue").val();
        
        var replaceEdit= edit.replace(/\s+/g,"");//取出所有空格之后的值
        if(replaceEdit.length==0){
        	$("#myMsg").text("请输入备忘信息");
			return false;
        }
		else{
			return true;
		}
      }
</script>
</head>

<body>
	<!-- 导航栏的制作 -->
	<nav class="navbar navbar-default" role="navigation" >
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

				<a class="navbar-brand"> 财务管理系统 
				</a>
			</div>

			<div class="collapse navbar-collapse" id="home-navbar-collapse">
				<!-- 导航元素 -->
				<ul class="nav navbar-nav">
					<li ><a href="${pageContext.request.contextPath}/shouzhiRecord/findShouzhiRecord.action">财务管理</a></li>
					<li><a
						href="${pageContext.request.contextPath}/toFinancialCount.action">财务统计</a></li>
					<li><a href="${pageContext.request.contextPath}/financialAnalysis/toFinancialAnalysis.action">财务分析</a></li>
					<li><a href="${pageContext.request.contextPath}/budget/findBudget.action">财务预算</a></li>
					<li><a href="${pageContext.request.contextPath}/wishlist/findAllWishList.action">心愿单</a></li>
					<li class="active"><a href="${pageContext.request.contextPath}/memorandum/listMemorandum.action">备忘录</a></li>
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
					            <a role="menuitem" tabindex="-1" href="${pageContext.request.contextPath}/jsp/userSetting.jsp">
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
<div class="container"  id="mainContent" >
		<div class="row">
			<div class="col-md-1 "></div>
			<div class="col-md-10">
				    <div>
				        <form name="upfile" action="${pageContext.request.contextPath}/memorandum/editMemorandum.action" method="post">
				       <div class="row">
					       <div class="col-md-4 col-xs-4">
						        <a href="javascript :;" onClick="javascript :history.back(-1);">
						        	<span class="glyphicon glyphicon-arrow-left addZiti" >上一页</span>
						        </a>
					        </div>
					        <div  class="col-md-8 col-xs-8" style="text-align:right;">
					      	  <span style="color:green;" class="addZiti">编辑备忘</span>
				        </div>
				       </div>
			            <script id="editor" type="text/plain"
			                style="width:100%;height:500px;">${content}</script>
			                
			                
			            <input type="hidden" id="editvalue" name="editvalue">
			            
			            <!-- 参数 -->
			       		<input type="hidden" name="thingPath" value="${memorandum.thingPath }">
			            <input type="hidden" name="mid" value="${memorandum.mid }">
			            <!-- 当前页 -->
			            <input type="hidden" name="currentPage" value="${currentPage}">
			            <button  type="submit" class="btn btn-primary" 
			            onclick="return getPlainTxt()">编辑备忘</button>
			            
			            <label id="myMsg" style="color:red;font-size:30px;"></label>
				        </form>
				    </div>
				    <script type="text/javascript">
				        //实例化编辑器
				        //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
				        var ue = UE.getEditor('editor');
				    </script>
			
		    </div><!-- col-md-12范围 -->
		</div><!-- row范围 -->
	</div><!-- container范围 -->
		
</body>
</html>