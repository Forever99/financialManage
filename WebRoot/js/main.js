
//在文档加载（就绪）之后运行下面这些jquery代码
//即在 DOM 加载完成后才可以对 DOM 进行操作。
$(document).ready(function(){
	//开始jquery代码
	
	
	$("#demo").Calculadora();//计算器
	
	// 点击显示 YYYY-MM年月格式
	$("#attYearMonth").jeDate({
		isinitVal : false,
		format : "YYYY-MM"
	});
	$("#my_szr_date").jeDate({
		isinitVal : false,
		format : "YYYY-MM-DD"
	});
	$("#add_income_szr_date").jeDate({
		isinitVal : false,
		format : "YYYY-MM-DD"
	});
	$("#add_spend_szr_date").jeDate({
		isinitVal : false,
		format : "YYYY-MM-DD"
	});
	
	
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
//		$("#username").focus();
	});
	
	
	//checkbox全选，全不选的实现
	$("#all").click(function(){
		//全选
		//attr  换成  prop 新版本jquery
		 $('input[name="record"]').prop("checked", this.checked);
		
	});
	//反选
	 $("input[name='record']").click(function(){  
         $("#all").prop("checked",
        		 $("input[name='record']").length == $("input[name='record']:checked").length ? true : false); 
     });  
	 
	 //checkbox选中的循环遍历   --批量删除
	 $("#deleteBatch").click(function(){
		 var str = "";//存放checkbox的id
         $("input[name='record']").each(function(){    
             if($(this).is(":checked"))    
             {    
                 str +=  $(this).attr("id")+",";   
             }    
         });    
//		alert(str);
		if(confirm('确认要批量删除该这些收支记录吗?')){
			$.post("/financialManage/shouzhiRecord/deleteBatch.action", {"id":str}, function(data) { 
			//回调为ok时，弹出alert框，并重新刷新页面
			alert("删除收支记录成功！");
			window.location.reload();
		});
		}
	 });
	 
//------------------------------------------------------------------------------------------	 
//添加收入类型模态框事件
	 
	 //【1】input 失去焦点时
	 $("#add_income_category_input").blur(function(){
		 var son=$("#add_income_category_input").val();
		 //为空时
		 if(son==null||son==""){
			 $("#add_income_category_msg").text("添加类型名不能为空，请输入");
		 }
		 else{
//			 $("#add_income_category_msg").text("");
			//ajax异步请求，当前收入类型是否存在
			 $.ajax({
					//请求资源路径
					url:"/financialManage/shouzhiCategory/findsonCategoryByNameAndAjax.action",
					async:true,
					type:"post",
					data:{"son_category":son},
					dataType:"json",//返回时的数据类型json
					//当请求成功时运行的函数
					success:function(data){
						if(data.name=="exit"){
							//存在，不可以插入
							 $("#add_income_category_msg").text("该类型已存在，请重新输入");
							 $("#add_income_category_input").val("");
						}
						else{
							//不存在，可以插入
							 $("#add_income_category_msg").text("");
						}
						
					},
					//当请求失败时运行的函数
					error:function(data){
					}
			});
		 }
	 });
	 //【2】添加按钮点击时
	 //添加收入类型按钮  add_income_category_btn
	 $("#add_income_category_btn").click(function(){
		 var son=$("#add_income_category_input").val();
		 alert("son:--"+son);
		 if(son!=null&&son!=""){
			 //提交表单数据
			 $.post("/financialManage/shouzhiCategory/addShouzhiCategory.action", $("#add_income_category_form")
						.serialize(), function(data) { //序列化数据为对象
					//回调为ok时，弹出alert框，并重新刷新页面
					alert("添加收入类型成功！");
					window.location.reload();
				});
		 }
		 else{
			 //对于提示信息的判断处理
			 var txt=$("#add_income_category_msg").text();
			 if(txt==null||txt==""){
				 $("#add_income_category_msg").text("添加类型名不能为空，请输入");
			 }
			 return false;
		 }
	 });
	 
//----------------------------------------------------------
	 //添加收入信息非空  及其 校验
	 
	 
//	 add_income_szr_comment  ||   add_income_comment_msg
	 $("#add_income_szr_comment").blur(function(){
		 var comment=$("#add_income_szr_comment").val();
		 if(comment==null||comment==""){
//			 $("#add_income_comment_msg").text("收入备注不能为空");
			 $("#msgLabel").text("收入备注不能为空");
		 }
		 else{
//			 $("#add_income_comment_msg").text("");
			 $("#msgLabel").text("");
		 }
	 });
	 
//	 add_income_szr_num      ||   add_income_num_msg
	 $("#add_income_szr_num").blur(function(){
		 var num=$("#add_income_szr_num").val();
//		 alert(num);
		 if(num==null||num==""){
//			 $("#add_income_num_msg").text("收入金额不能为空");
			 $("#msgLabel").text("收入金额不能为空");
		 }
		 else{
//			 $("#add_income_num_msg").text("");
			 //不为空时，校验是否为数字，如果不是数字，则清空，并提醒，否则不用提醒
			 if(!isNaN(num)){//是数字
//				 $("#add_income_num_msg").text("");
				 $("#msgLabel").text("");
				}else{//不全是数字
//					$("#add_income_num_msg").text("请输入数字，不能带有字母或其它");
					$("#msgLabel").text("请输入数字，不能带有字母或其它");
				}
		 }
	 });
	 
	 $("#add_income_szr_date").mouseleave(function(){
		 var date=$("#add_income_szr_date").val();
		 if(date==null||date==""){
//			 $("#add_income_date_msg").text("收入日期不能为空");
			 $("#msgLabel").text("收入日期不能为空");
			 
		 }
		 else{
//			 $("#add_income_date_msg").text("");
			 $("#msgLabel").text("");
		 }
	 });
	 //重置按钮
	 $("#add_income_reset").click(function(){
//		 $("#add_income_comment_msg").text("");
//		 $("#add_income_num_msg").text("");
//		 $("#add_income_date_msg").text("");
		 $("#msgLabel").text("");
		 
	 });
	 
	
	 //添加收入信息   表单: add_income_form      submit按钮 :  add_income_submit
	 $("#add_income_submit").click(function(){
		 //非空判断
		 var comment=$("#add_income_szr_comment").val();
		 if(comment==null||comment==""){
			 $("#add_income_comment_msg").text("收入备注不能为空");
			 return false;
		 }
		 var num=$("#add_income_szr_num").val();
		 if(num==null||num==""){
			 $("#add_income_num_msg").text("收入金额不能为空");
			 return false;
		 }
		 var date=$("#add_income_szr_date").val();
		 if(date==null||date==""){
			 $("#add_income_date_msg").text("收入日期不能为空");
			 return false;
		 }
	 });
	 
	 //存在跳转问题，不采用
	 /* //提交表单数据
		 $.post("/financialManage/shouzhiRecord/addShouzhiRecord.action", $("#add_income_form")
					.serialize(), function(data) { //序列化数据为对象
				//回调为ok时，弹出alert框，并重新刷新页面
				alert("添加收入数据成功！");
				window.location.href="/financialManage/shouzhiRecord/findShouzhiRecord.action";
//				alert("new  href");
			});*/
	 
	 
//------------------------------------------------------------------------------------------		 
//添加支出类型
	 
//添加支出类型模态框事件
	 
	 //【1】input 失去焦点时
	 $("#add_spend_category_input").blur(function(){
		 var son=$("#add_spend_category_input").val();
		 //为空时
		 if(son==null||son==""){
			 $("#add_spend_category_msg").text("添加类型名不能为空，请输入");
		 }
		 else{
//			 $("#add_spend_category_msg").text("");
			//ajax异步请求，当前支出类型是否存在
			 $.ajax({
					//请求资源路径
					url:"/financialManage/shouzhiCategory/findsonCategoryByNameAndAjax.action",
					async:true,
					type:"post",
					data:{"son_category":son},
					dataType:"json",//返回时的数据类型json
					//当请求成功时运行的函数
					success:function(data){
						if(data.name=="exit"){
							//存在，不可以插入
							 $("#add_spend_category_msg").text("该类型已存在，请重新输入");
							 $("#add_spend_category_input").val("");
						}
						else{
							//不存在，可以插入
							 $("#add_spend_category_msg").text("");
						}
						
					},
					//当请求失败时运行的函数
					error:function(data){
					}
			});
		 }
	 });
	 //【2】添加按钮点击时
	 //添加支出类型按钮  add_spend_category_btn
	 $("#add_spend_category_btn").click(function(){
		 var son=$("#add_spend_category_input").val();//输入的内容
		 if(son!=null&&son!=""){
			 //提交表单数据
			 $.post("/financialManage/shouzhiCategory/addShouzhiCategory.action", $("#add_spend_category_form")
						.serialize(), function(data) { //序列化数据为对象
					//回调为ok时，弹出alert框，并重新刷新页面
					alert("添加支出类型成功！");
					window.location.reload();
				});
		 }
		 else{
			 //对于提示信息的判断处理
			 var txt=$("#add_spend_category_msg").text();
			 if(txt==null||txt==""){
				 $("#add_spend_category_msg").text("添加类型名不能为空，请输入");
			 }
			 return false;
		 }
	 });
	 
	 //添加支出信息非空  及其 校验
//	 add_spend_szr_comment  ||   add_spend_comment_msg
	 $("#add_spend_szr_comment").blur(function(){
		 var comment=$("#add_spend_szr_comment").val();
		 if(comment==null||comment==""){
			 $("#add_spend_comment_msg").text("支出备注不能为空");
		 }
		 else{
			 $("#add_spend_comment_msg").text("");
		 }
	 });
	 
//	 add_spend_szr_num      ||   add_spend_num_msg
	 $("#add_spend_szr_num").blur(function(){
		 var num=$("#add_spend_szr_num").val();
//		 alert(num);
		 if(num==null||num==""){
			 $("#add_spend_num_msg").text("支出金额不能为空");
		 }
		 else{
//			 $("#add_spend_num_msg").text("");
			 //不为空时，校验是否为数字，如果不是数字，则清空，并提醒，否则不用提醒
			 if(!isNaN(num)){//是数字
				 $("#add_spend_num_msg").text("");
				}else{//不全是数字
					$("#add_spend_num_msg").text("请输入数字，不能带有字母或其它");
				}
		 }
	 });
	 
	 $("#add_spend_szr_date").mouseleave(function(){
		 var date=$("#add_spend_szr_date").val();
		 if(date==null||date==""){
			 $("#add_spend_date_msg").text("支出日期不能为空");
		 }
		 else{
			 $("#add_spend_date_msg").text("");
		 }
	 });
	 //重置按钮
	 $("#add_spend_reset").click(function(){
		 $("#add_spend_comment_msg").text("");
		 $("#add_spend_num_msg").text("");
		 $("#add_spend_date_msg").text("");
		 
	 });
	
	 //添加支出信息   表单: add_spend_form      submit按钮 :  add_spend_submit
	 $("#add_spend_submit").click(function(){
		 //非空判断
		 var comment=$("#add_spend_szr_comment").val();
		 if(comment==null||comment==""){
			 $("#add_spend_comment_msg").text("支出备注不能为空");
			 return false;
		 }
		 var num=$("#add_spend_szr_num").val();
		 if(num==null||num==""){
			 $("#add_spend_num_msg").text("支出金额不能为空");
			 return false;
		 }
		 var date=$("#add_spend_szr_date").val();
		 if(date==null||date==""){
			 $("#add_spend_date_msg").text("支出日期不能为空");
			 return false;
		 }
	 });
	 
	 
});
