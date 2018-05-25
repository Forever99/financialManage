<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/ueditor/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/ueditor/ueditor.all.min.js"> </script>
<!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
<!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
<script type="text/javascript" charset="utf-8" src="${pageContext.request.contextPath}/ueditor/lang/zh-cn/zh-cn.js"></script>


</head>
<body>

      <div>
		        <form name="upfile" action="${pageContext.request.contextPath}/memorandum/addMemorandum.action" method="post">
		        <a href="javascript :;" onClick="javascript :history.back(-1);">
		        	<span class="glyphicon glyphicon-arrow-left" style="font-size:20px;">返回</span>
		        </a>
		        <div style="text-align:center;"><span style="font-size:30px;">显示备忘</span></div>
	            <script id="editor" type="text/plain"
	                style="width:100%;height:500px;">${content }</script>
		        </form>
		    </div>
		    <script type="text/javascript">
		        //实例化编辑器
		        //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
		        var ue = UE.getEditor('editor');
		    </script>
</body>
</html>