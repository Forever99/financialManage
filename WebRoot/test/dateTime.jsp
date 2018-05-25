<%@page import="java.util.Date"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
  <head>
    <title>EasyUI入门—</title>
  <!-- 引入JQuery -->
  <script type="text/javascript" src="${pageContext.request.contextPath}/jquery-easyui-1.5.4.2/jquery.min.js"></script>
  <!-- 引入EasyUI -->
  <script type="text/javascript" src="${pageContext.request.contextPath}/jquery-easyui-1.5.4.2/jquery.easyui.min.js"></script>
  <!-- 引入EasyUI的中文国际化js，让EasyUI支持中文 -->
  <script type="text/javascript" src="${pageContext.request.contextPath}/jquery-easyui-1.5.4.2/locale/easyui-lang-zh_CN.js"></script>
  <!-- 引入EasyUI的样式文件-->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/jquery-easyui-1.5.4.2/themes/default/easyui.css" type="text/css"/>
  <!-- 引入EasyUI的图标样式文件-->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/jquery-easyui-1.5.4.2/themes/icon.css" type="text/css"/>
  
  <!-- 引入自定义文件 -->
   <script type="text/javascript" src="${pageContext.request.contextPath}/js/dateTime.js"></script>
   
  </head>
  
  <body>
  	<table>
    <tr>
       <td>年月</td>
       <td>
<!-- 		<input id="attYearMonth"  name="attYearMonth" class="easyui-datebox"  style="width: 172px"  value="getdate()"/> -->
         <input id="attYearMonth"  name="attYearMonth" class="easyui-datebox"  style="width: 172px"/>
      </td>
    </tr>
</table>
  
    <h2>Initialize Value for DateTime</h2>
	<p>The value is initialized when DateTimeBox has been created.</p>
	<div style="margin:20px 0;"></div>
	<input class="easyui-datetimebox" value="10/11/2012 2:3:56" style="width:200px">
  </body>
</html>