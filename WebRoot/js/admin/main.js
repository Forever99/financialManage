$(function() {

	//添加用户模态框里面的事件
	//用户名  失去焦点时，进行用户名是否存在的判断  （1）存在，什么都不做  （2）不存在，提示"用户名不存在"，清空输入框
	$("#insert_username").blur(function(){
		var username=$("#insert_username").val();
		if(username==null||username==""){
			$("#insert_msgLabel").text("用户名不能为空");
		}
		else{//用户名不为空时，进行上述的判定 --通过ajax进行实现
			$.ajax({
				//请求资源路径
				url:"/financialManage/user/findUserByNameAndAjax.action",
				async:true,
				//规定请求的类型（GET 或 POST）
				type:"post",
				//规定要发送到服务器的数据（json格式）
				data:JSON.stringify({"username":$(this).val()}),
				//发送数据到服务器时所使用的内容类型
				contentType:"application/json;charset=utf-8",
				dataType:"json",//返回时的数据类型json
				//当请求成功时运行的函数
				success:function(data){
					//alert(data.name);
					//返回的data是 exit 或者 notexit
					if(data.name=="exit"){//用户已存在
						$("#insert_msgLabel").text("该用户已存在，请重新输入");
						$("#insert_username").val("");//清空值
					}
					else{
						$("#insert_msgLabel").text("");
					}
				},
				//当请求失败时运行的函数
				error:function(data){
					$("#insert_msgLabel").text("失败");
				}
			
			});
		}
	});
	
	//密码框获取焦点时的事件
	$("#insert_password").focus(function(){
		var username=$("#insert_username").val();
		if(username==null||username==""){
			$("#insert_msgLabel").text("用户名不能为空");
		}
	});
	
	//密码框失去焦点时的事件
	$("#insert_password").blur(function(){
		var password=$("#insert_password").val();
		if(password==null||password==""){
			$("#insert_msgLabel").text("密码不能为空");
		}else{
			$("#insert_msgLabel").text("");//清空
		}
	});
	
	
	//邮箱输入框非空时，进行邮箱格式的校验
	$("#insert_email").blur(function(){//失去焦点时
		var x=$("#insert_email").val();
		//邮箱格式的校验
		if(x!=null||x!=""){
			var atpos=x.indexOf("@");//@的位置
			var dotpos=x.lastIndexOf(".");//.的位置
			//位置从第0位开始算起
			//@的位置在1或者1以后
			//.的位置在@的位置之后，而且最少是多两个位置
			//.的位置加2，必须比email的长度少于2
		 	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
		 		$("#insert_msgLabel").text("不是一个有效的 e-mail 地址，请修改email");
		 	}
		 	else{
		 		$("#insert_msgLabel").text("");
		 	}
		 	
		}
	});
	
	//手机输入框为非空时，进行手机格式的校验
	$("#insert_phone").blur(function(){//失去焦点时
		 var phone=$("#insert_phone").val();
		 //正则表达式
		 var regExp =/^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
         if(!regExp.test(phone)){  
        	$("#insert_msgLabel").text("不是一个有效的手机号码，请修改phone");
         }
         else{
		 		$("#insert_msgLabel").text("");
		 	}
	});
	
	//添加按钮判断事件--什么时候表单不提交
	$("#insert_user_btn").click(function(){
		
		//再次验证用户名问题！！！
		var username=$("#insert_username").val();
		$.ajax({
			//请求资源路径
			url:"/financialManage/user/findUserByNameAndAjax.action",
			async:true,
			//规定请求的类型（GET 或 POST）
			type:"post",
			//规定要发送到服务器的数据（json格式）
			data:JSON.stringify({"username":username}),
			//发送数据到服务器时所使用的内容类型
			contentType:"application/json;charset=utf-8",
			dataType:"json",//返回时的数据类型json
			//当请求成功时运行的函数
			success:function(data){
				//alert(data.name);
				//返回的data是 exit 或者 notexit
				if(data.name=="exit"){//用户已存在
					$("#insert_msgLabel").text("该用户已存在，请重新输入");
					$("#insert_username").val("");//清空值
				}
				else{
					$("#insert_msgLabel").text("");
				}
			},
			//当请求失败时运行的函数
			error:function(data){
				$("#insert_msgLabel").text("失败");
			}
		
		});
		
		var label=$("#insert_msgLabel").text();//消息提示框内容为空
		var phone=$("#insert_phone").val();//最后一个输入框phone的判断  是否为空，极为重要
		if(label==""||label==null){
			if(phone!=""&&phone!=null){
				alert("添加记录成功");
				return true;
			}
		}
		return false;//表单不提交
	});

	//模态框的关闭事件
	$('#insertUserModal').on('hide.bs.modal', function () {
	  // 执行一些动作
		$("#insert_msgLabel").text("");//清空
		$("#insert_username").val("");//清空
		$("#insert_password").val("");//清空
		$("#insert_email").val("");//清空
		$("#insert_phone").val("");//清空
	});
	
	
	function exitUserVailade(){
		var username=$("#update_username").val();
//		alert("username"+username);
		if(username==null||username==""){
			$("#update_msgLabel").text("用户名不能为空");
		}
		else{
			//用户名不为空时，进行上述的判定 --通过ajax进行实现
			//1、用户名和原来相同，不用进行什么验证；
			//2、用户名和原来不同，需要进行是否存在的验证
//			alert("进入：：");
			var old_username=$("#old_username").val();//原来的用户名
//			alert(username==old_username);
			if(username==old_username){
				return true;
			}
			else{
				$.ajax({
					//请求资源路径
					url:"/financialManage/user/findUserByNameAndAjax.action",
					async:true,
					//规定请求的类型（GET 或 POST）
					type:"post",
					//规定要发送到服务器的数据（json格式）
					data:JSON.stringify({"username":username}),
					//发送数据到服务器时所使用的内容类型
					contentType:"application/json;charset=utf-8",
					dataType:"json",//返回时的数据类型json
					//当请求成功时运行的函数
					success:function(data){
						//alert(data.name);
						//返回的data是 exit 或者 notexit
						if(data.name=="exit"){//用户已存在
							$("#update_msgLabel").text("该用户已存在，请修改当前用户名");
							$("#update_username").focus();
						}
						else{
							$("#update_msgLabel").text("");
						}
					},
					//当请求失败时运行的函数
					error:function(data){
						$("#update_msgLabel").text("失败");
					}
				
				});
			}
		}
	}
	
	//修改用户信息模态框的相关事件
	//用户名  失去焦点时，进行用户名是否存在的判断  （1）存在，什么都不做  （2）不存在，提示"用户名不存在"，清空输入框
	$("#update_username").blur(function(){
		 exitUserVailade();
	});
	function exitUser(){
		var text=$("#update_msgLabel").text();
		if(text=="该用户已存在，请修改当前用户名"){
			$("#update_username").focus();
		}
	}
	//密码框获取焦点时的事件
	$("#update_password").focus(function(){
		exitUser();
	});
	$("#update_phone").focus(function(){
		exitUser();
	});
	$("#update_email").focus(function(){
		exitUser();
	});
	
	//密码框失去焦点时的事件
	$("#update_password").blur(function(){
		var password=$("#update_password").val();
		if(password==null||password==""){
			$("#update_msgLabel").text("密码不能为空");
		}else{
			$("#update_msgLabel").text("");//清空
		}
	});
	
	
	//邮箱输入框非空时，进行邮箱格式的校验
	$("#update_email").blur(function(){//失去焦点时
		var x=$("#update_email").val();
		//邮箱格式的校验
		if(x!=null&&x!=""){
			var atpos=x.indexOf("@");//@的位置
			var dotpos=x.lastIndexOf(".");//.的位置
			//位置从第0位开始算起
			//@的位置在1或者1以后
			//.的位置在@的位置之后，而且最少是多两个位置
			//.的位置加2，必须比email的长度少于2
		 	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
		 		$("#update_msgLabel").text("不是一个有效的 e-mail 地址，请修改email");
		 	}
		 	else{
		 		$("#update_msgLabel").text("");
		 	}
		 	
		}
	});
	
	//手机输入框为非空时，进行手机格式的校验
	$("#update_phone").blur(function(){//失去焦点时
		 var phone=$("#update_phone").val();
		 phone=phone.replace(/(^\s*)|(\s*$)/g, "");//去除空字符串
		 if(phone!=""&&phone!=null){
			//正则表达式
			 var regExp =/^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
	         if(!regExp.test(phone)){  
	        	$("#update_msgLabel").text("不是一个有效的手机号码，请修改phone");
	         }
	         else{
			 		$("#update_msgLabel").text("");
			 	}
		 }
	});
	
	//模态框的关闭事件
	$('#userEditModal').on('hide.bs.modal', function () {
		// 执行一些动作
		$("#update_msgLabel").text("");//清空
		$("#update_username").val("");//清空
		$("#update_password").val("");//清空
		$("#update_email").val("");//清空
		$("#update_phone").val("");//清空
	});
	
	//更新按钮判断事件--什么时候表单不提交
	$("#update_user_btn").click(function(){
		//再次验证用户名问题！！！
		exitUserVailade();
		var label=$("#update_msgLabel").text();//消息提示框内容为空
		if(label==""||label==null){
//				var currentPage=$("#currentPage").val();//当前页
				alert("修改信息成功");
//				$.post("/financialManage/userManage/toEditPage.action", $("#updateUserForm")
//						.serialize(), function(data) { //序列化数据为对象
//					//回调为ok时，弹出alert框，并重新刷新页面
//					alert("修改信息成功！");
////					window.location.reload();
//					window.href="/financialManage/userManage/findUsers.action?currentPage="+currentPage;
//				});
			
			return true;
		}
		return false;//表单不提交
	});
	
	
});