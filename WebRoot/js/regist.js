
//在文档加载（就绪）之后运行下面这些jquery代码
//即在 DOM 加载完成后才可以对 DOM 进行操作。
$(document).ready(function(){
	//开始jquery代码
	
	
	//【1】用户名  失去焦点时，进行用户名是否存在的判断  （1）存在，什么都不做  （2）不存在，提示"用户名不存在"，清空输入框
	$("#username").blur(function(){
		var username=$("#username").val();
		if(username==null||username==""){
			$("#msgLabel").text("用户名不能为空");
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
						$("#msgLabel").text("该用户已存在，请重新输入");
						$("#username").val("");//清空值
//						$("#username").focus();
					}
					else{
						$("#msgLabel").text("");
					}
				},
				//当请求失败时运行的函数
				error:function(data){
					$("#msgLabel").text("失败");
				}
			
			});
		}
	});
	
	//【2】密码框获取焦点时的事件
	$("#password").focus(function(){
		var username=$("#username").val();
		if(username==null||username==""){
			$("#msgLabel").text("用户名不能为空");
//			$("#username").focus();
		}
	});
	
	//【3】密码框失去焦点时的事件
	$("#password").blur(function(){
		var password=$("#password").val();
		if(password==null||password==""){
			$("#msgLabel").text("密码不能为空");
//			$("#password").focus();
		}else{
			$("#msgLabel").text("");//清空
		}
	});
	
	//【4】确认密码框失去焦点时的事件
	$("#repassword").blur(function(){
		var password=$("#password").val();
		var repassword=$("#repassword").val();
		if(repassword==null||repassword==""){
			$("#msgLabel").text("确认密码不能为空");
//			$("repassword").focus();
		}
		else{
			if(password!=repassword){
				$("#msgLabel").text("两次输入密码不一致，请重新输入新密码");
				$("#password").val("");
				$("#repassword").val("");
//				$("#password").focus();
			}
		}
	});
	
	//【5】邮箱输入框非空时，进行邮箱格式的校验
	$("#email").blur(function(){//失去焦点时
		var x=$("#email").val();
		
		//邮箱格式的校验
		if(x!=null||x!=""){
			var atpos=x.indexOf("@");//@的位置
			var dotpos=x.lastIndexOf(".");//.的位置
			//位置从第0位开始算起
			//@的位置在1或者1以后
			//.的位置在@的位置之后，而且最少是多两个位置
			//.的位置加2，必须比email的长度少于2
		 	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
		 		$("#msgLabel").text("不是一个有效的 e-mail 地址，请修改email");
//		 		$("#email").focus();
		 		return false;
		 	}
		 	else{
		 		$("#msgLabel").text("");
		 	}
		 	
		}
	});
	
	//【6】手机输入框为非空时，进行手机格式的校验
	$("#phone").blur(function(){//失去焦点时
		 var phone=$("#phone").val();
		 //正则表达式
		 var regExp =/^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
         if(!regExp.test(phone)){  
        	$("#msgLabel").text("不是一个有效的手机号码，请修改phone");
//		 	$("#phone").focus();
              return false;  
         }
         else{
		 		$("#msgLabel").text("");
		 	}
	});
	
	//【7】注册按钮判断事件--什么时候表单不提交
	$("#registbtn").click(function(){
		var label=$("#msgLabel").text();//消息提示框内容为空
		var phone=$("#phone").val();//最后一个输入框phone的判断  是否为空，极为重要
		if(label==""||label==null){
			if(phone!=""&&phone!=null){
				return true;
			}
		}
		return false;//表单不提交
	});
	//【8】重置按钮事件 --重置消息提示框
	$("#resetbtn").click(function(){
		$("#msgLabel").text("");//清空
		$("#username").val("");//清空
		$("#password").val("");//清空
		$("#repassword").val("");//清空
		$("#email").val("");//清空
		$("#phone").val("");//清空
	});
});
