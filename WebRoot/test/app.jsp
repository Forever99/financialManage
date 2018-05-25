<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>    
<html>    
<head>    
    <title>bootstrap实现导航栏的响应式布局，当在小屏幕、手机屏幕浏览时自动折叠隐藏</title>    
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">    
    <link href="${pageContext.request.contextPath}/bootstrap/css/bootstrap.min.css" rel="stylesheet">    
    <style type="text/css">  
        .nav-logo{  
            float: left;  
            height: 40px;  
            margin-top: 5px;  
            overflow: hidden;  
        }  
        .nav-logo a{  
            margin: 0;  
            padding: 0;  
        }  
    </style>  
</head>    
<body>    
     <!--导航-->    
    <div class="navbar navbar-fixed-top navbar-inverse" >    
      <div class="container">    
        <div class="nav-logo">  
            <a class="" href="#">  
                <img class="img-responsive" src="${pageContext.request.contextPath}/images/logo.jpg" alt="北京市XXXX科技有限公司" style="height: 100%;width: auto;" />  
            </a>  
        </div>  
        <div class="navbar-header">    
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navBar">    
            <span class="icon-bar"></span>  
            <span class="icon-bar"></span>  
            <span class="icon-bar"></span>  
          </button>  
        </div>    
        <div class="collapse navbar-collapse navbar-right" id="navBar">    
          <ul class="nav navbar-nav">  
            <li><a href="#">首页</a></li>  
            <li><a href="#">公司介绍</a></li>  
            <li class="dropdown">  
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">  
                    产品中心<span class="caret"></span>  
                </a>  
                <ul class="dropdown-menu" role="menu">  
                    <li><a href="#">SmartCall智能呼</a></li>  
                    <li><a href="#">运营管理平台ＯＭＳ</a></li>  
                    <li><a href="#">客户关系管理系统</a></li>  
                    <li><a href="#">电销系统</a></li>  
                    <li><a href="#">知识库管理</a></li>  
                    <li><a href="#">排班管理模块</a></li>  
                    <li><a href="#">考试培训系统</a></li>  
                    <li><a href="#">多媒体调度指挥系统</a></li>  
                </ul>  
            </li>  
            <li class="dropdown">  
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">  
                    行业方案<span class="caret"></span>  
                </a>  
                <ul class="dropdown-menu" role="menu">  
                    <li><a href="#">多媒体呼叫中心</a></li>  
                    <li><a href="#">保险行业</a></li>  
                    <li><a href="#">制造行业</a></li>  
                    <li><a href="#">政府部门</a></li>  
                    <li><a href="#">教育行业</a></li>  
                    <li><a href="#">酒店/旅游</a></li>  
                    <li><a href="#">电子商务</a></li>  
                    <li><a href="#">社区服务</a></li>  
                    <li><a href="#">铁路/客运</a></li>  
                    <li><a href="#">医疗卫生</a></li>  
                </ul>  
            </li>  
            <li><a href="#">公司新闻</a></li>  
            <li><a href="#">典型客户</a></li>  
            <li><a href="#">合作伙伴</a></li>  
            <li><a href="#">联系我们</a></li>  
          </ul>    
        </div>  
      </div>  
    </div>    
      
      
    <script src="${pageContext.request.contextPath}/jquery/jquery.min.js"></script>    
    <script src="${pageContext.request.contextPath}/bootstrap/js/bootstrap.min.js"></script>    
</body>    
</html>    
