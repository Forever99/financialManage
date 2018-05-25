$(document).ready(function(){
	//登录框的事件
	//loginbtn按钮添加点击事件  --验证非空
	$("#loginbtn").click(function(){//验证 用户名或者密码是否为空
		var username=$("#adminname").val();//表单值
		var password=$("#password").val();
		if (username == null || username== ""  || password == null || password== "") {
			$("#msgLabel").text("用户名或者密码不能为空...");
	        //alert("用户名或者密码不能为空...");
	        return false;
	    }
	});
	
});

