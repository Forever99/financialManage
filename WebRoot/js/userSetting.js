
//在文档加载（就绪）之后运行下面这些jquery代码
//即在 DOM 加载完成后才可以对 DOM 进行操作。
$(document).ready(function(){
	//开始jquery代码
	
	//用户的非空，存在等判断
	function userexit(){
		var username=$("#username").val();
		username=username.replace(/\s+/g,"");//取出空格
		var oldusername=$("#oldusername").val();//未修改的用户名
		//用户名没有修改
		if(username==null||username==""){
			$("#msgLabel").text("用户名不能为空");
			return false;
		}
		if(username==oldusername){
//			$("#msgLabel").text("用户名没有修改");
//			return false;
		}
		else{//验证当前用户名是否存在，如果存在，提示重新输入

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
//					alert("成功");
					//返回的data是 exit 或者 notexit
					
					if(data.name=="exit"){//用户已存在
						$("#msgLabel").text("该用户已存在，请修改当前用户名");
						return false;
					}
					else{
						$("#msgLabel").text("");
						return true;
					}
				},
				//当请求失败时运行的函数
				error:function(data){
					$("#msgLabel").text("失败");
					return false;
				}
			
			});
		}
	}
	
	//失去焦点时
	$("#username").blur(function(){
      userexit();
	});
//	oldusername
	
	//【1】密码框获取焦点时的事件
	$("#password").focus(function(){
		var username=$("#username").val();
		username=username.replace(/\s+/g,"");//取出空格
		if(username==null||username==""){
			$("#msgLabel").text("用户名不能为空");
			return false;
		}
	});
	
	//【2】密码框失去焦点时的事件
	$("#password").blur(function(){
	
		var password=$("#password").val();
		password=password.replace(/\s+/g,"");//去空格
		
		if(password.length==0){
			$("#msgLabel").text("密码不能为空,请不要输入空格");
			return false;
		}else{
			$("#msgLabel").text("");//清空
			return true;;
		}
	});
	

	
	//【3】邮箱输入框非空时，进行邮箱格式的校验
	$("#email").blur(function(){//失去焦点时
		var x=$("#email").val();
		x=x.replace(/\s+/g,"");//去空格
		//邮箱格式的校验
		if(x.length!=0){
			var atpos=x.indexOf("@");//@的位置
			var dotpos=x.lastIndexOf(".");//.的位置
			//位置从第0位开始算起
			//@的位置在1或者1以后
			//.的位置在@的位置之后，而且最少是多两个位置
			//.的位置加2，必须比email的长度少于2
		 	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){
		 		$("#msgLabel").text("不是一个有效的 e-mail 地址，请修改email");
		 		return false;
		 	}
		 	else{
		 		$("#msgLabel").text("");
		 		return true;
		 	}
		}
		return true;
	});
	
	//【4】手机输入框为非空时，进行手机格式的校验
	$("#phone").blur(function(){//失去焦点时
		 var phone=$("#phone").val();
		 phone=phone.replace(/\s+/g,"");//去空格
		 
		 if(phone.length!=0){
			 //正则表达式
			 var regExp =/^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
	         if(!regExp.test(phone)){  
	        	$("#msgLabel").text("不是一个有效的手机号码，请修改phone");
	              return false;  
	         }
	         else{
			 		$("#msgLabel").text("");
			 	}
		 }
		return true;
	});
	
	//【5】注册按钮判断事件--什么时候表单不提交
	$("#registbtn").click(function(){

		userexit();//用户的非空，存在等判断
		var password=$("#password").val();
		password=password.replace(/\s+/g,"");//去空格
		if(password.length==0){
			$("#msgLabel").text("密码不能为空,请不要输入空格");
			return false;
		}else{
			$("#msgLabel").text("");//清空
//			alert("修改");
//			$.post("/financialManage/user/editUser.action", $("#myform").serialize(), function(data) { //序列化数据为对象
//				//回调为ok时，弹出alert框，并重新刷新页面
//				alert("修改信息成功！");
//				 window.location.href="/financialManage/shouzhiRecord/findShouzhiRecord.action";
//			});
		}
	});

});
