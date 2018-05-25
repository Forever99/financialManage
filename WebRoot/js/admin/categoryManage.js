$(function() {

	//收入子类型------------------------------------------------------------------------------------------------------
	//添加子类型模态框里面的事件
	//收入子类型  失去焦点时，进行收入子类型是否存在的判断  （1）存在，什么都不做  （2）不存在，提示"收入子类型不存在"，清空输入框
	$("#add_income_son_category").blur(function(){
		var category=$("#add_income_son_category").val();
		if(category==null||category==""){
			$("#add_income_category_msg").text("收入子类型不能为空");
		}
		else{//收入子类型不为空时，进行上述的判定 --通过ajax进行实现
			valiadeExit();
		}
	});
	
	function valiadeExit(){
//		var son_category=$("#add_income_son_category").val();
//		var parent_category=$("#add_income_parent_category").val();
		$.ajax({
			url:"/financialManage/categoryManage/ajaxFindCategory.action",
			async:true,
			type:"post",
			//规定要发送到服务器的数据（对象）
			data:$('#add_income_category_form').serializeArray(),//方法一：表单里面的数据
			
//			data:{"parent_category": parent_category, "son_category": son_category},//方法二：自己拼接对象里面的数据
			//发送数据到服务器时所使用的内容类型
//			contentType:"application/json;charset=utf-8",//默认情况，如果不是传json格式的，不要写这个东西
			dataType:"json",//返回时的数据类型json
			//当请求成功时运行的函数
			success:function(data){
//				alert(data.name);
//				var val=data.name;
				if(data.name=="yes"){//当前子类型已存在
					$("#add_income_category_msg").text("该收支子类型已存在，请修改当前值");
				}
				else{
					$("#add_income_category_msg").text("");
				}
//				return val;
			},
			//当请求失败时运行的函数
			error:function(data){
				alert("失败");
			}
//			error:function(jqXHR,textStatus,errorThrown){  
//		        alert("build failure!");  
//		        console.log(jqXHR);  
//		        console.log(textStatus);  
//		        console.log(errorThrown);  
//			}   
		});
	}
	
	//添加按钮判断事件--什么时候表单不提交
	$("#add_income_category_btn").click(function(){
		//再次验证收入子类型问题！！！
		$.ajax({
			url:"/financialManage/categoryManage/ajaxFindCategory.action",
			async:true,
			type:"post",
			//规定要发送到服务器的数据（对象）
			data:$('#add_income_category_form').serializeArray(),//表单里面的数据
			dataType:"json",//返回时的数据类型json
			//当请求成功时运行的函数
			success:function(data){
//				alert(data.name);
//				var val=data.name;
				if(data.name=="yes"){//当前子类型已存在
					$("#add_income_category_msg").text("该收支子类型已存在，请修改当前值");
				}
				else{
					$("#add_income_category_msg").text("");
				}
			},
			//当请求失败时运行的函数
			error:function(data){
				alert("失败");
			}
		});
		var label=$("#add_income_category_msg").text();//消息提示框
		var son=$("#add_income_son_category").val();//最后一个输入框phone的判断  是否为空，极为重要
		if(label==""||label==null){
			if(son!=""&&son!=null){
				alert("添加收入子类型成功");
				document.add_income_category_form.submit();//提交表单
				return true;
			}
		}
		return false;//表单不提交
		
	});
	//模态框的关闭事件
	$('#insertIncomeModal').on('hide.bs.modal', function () {
		$("#add_income_category_msg").text("");//清空
		$("#add_income_son_category").val("");//清空
	});
	
	//支出子类型------------------------------------------------------------------------------------------------------
	//支出子类型  失去焦点时，进行支出子类型是否存在的判断  
	$("#add_spend_son_category").blur(function(){
		var category=$("#add_spend_son_category").val();
		if(category==null||category==""){
			$("#add_spend_category_msg").text("支出子类型不能为空");
		}
		else{//支出子类型不为空时，进行上述的判定 --通过ajax进行实现
			valiadeExit2();
		}
	});
	
	function valiadeExit2(){
		$.ajax({
			url:"/financialManage/categoryManage/ajaxFindCategory.action",
			async:true,
			type:"post",
			//规定要发送到服务器的数据（对象）
			data:$('#add_spend_category_form').serializeArray(),//方法一：表单里面的数据
			dataType:"json",//返回时的数据类型json
			//当请求成功时运行的函数
			success:function(data){
				if(data.name=="yes"){//当前子类型已存在
					$("#add_spend_category_msg").text("该收支子类型已存在，请修改当前值");
				}
				else{
					$("#add_spend_category_msg").text("");
				}
			},
			//当请求失败时运行的函数
			error:function(data){
				alert("失败");
			}
		});
	}
	
	//添加按钮判断事件--什么时候表单不提交
	$("#add_spend_category_btn").click(function(){
		//再次验证支出子类型问题！！！
		$.ajax({
			url:"/financialManage/categoryManage/ajaxFindCategory.action",
			async:true,
			type:"post",
			//规定要发送到服务器的数据（对象）
			data:$('#add_spend_category_form').serializeArray(),//表单里面的数据
			dataType:"json",//返回时的数据类型json
			//当请求成功时运行的函数
			success:function(data){
				if(data.name=="yes"){//当前子类型已存在
					$("#add_spend_category_msg").text("该收支子类型已存在，请修改当前值");
				}
				else{
					$("#add_spend_category_msg").text("");
				}
			},
			//当请求失败时运行的函数
			error:function(data){
				alert("失败");
			}
		});
		var label=$("#add_spend_category_msg").text();//消息提示框
		var son=$("#add_spend_son_category").val();//最后一个输入框phone的判断  是否为空，极为重要
		if(label==""||label==null){
			if(son!=""&&son!=null){
				alert("添加支出子类型成功");
				document.add_spend_category_form.submit();//提交表单
				return true;
			}
		}
		return false;//表单不提交
		
	});
	//模态框的关闭事件
	$('#insertSpendModal').on('hide.bs.modal', function () {
		$("#add_spend_category_msg").text("");//清空
		$("#add_spend_son_category").val("");//清空
	});
	
	//-----------------------------------------------------------------------------------------------
	
	//修改收支类型信息的校验  
	function valiadeSonCategory(){//校验收支子类型的方法
		//$("#exitShouzhi").val();--用户判断  ，not 非空[非当前值 ：存在 exit ，不存在 notexit ，当前值 current]，空  yes
//		var bool=new Boolean();   //默认不提交表单
		var bool=false;   //默认不提交表单
		var son=$("#update_son_category").val();//收支子类型
//		alert("son::"+son);
		if(son==null||son==""){
			$("#update_msgLabel").text("收支子类型不能为空，请输入");
			bool=false;//不提交表单
			console.log("不提交表单:[空值]"+bool);
//			return false;
		}
		else{
			//收支子类型不为空时，进行上述的判定 --通过ajax进行实现
			//1、收支子类型和原来相同，不用进行什么验证；
			//2、收支子类型原来不同，需要进行是否存在的验证
			var old_son_category=$("#old_son_category").val();//原来的收支子类型
//			alert(son==old_son_category);
			if(son==old_son_category){
				$("#update_msgLabel").text("");
				$("#exitShouzhi").val("current");//当前值
				alert("当前收支子类型无修改");
				bool=false;//不提交表单
				console.log("不提交表单:[未修改值]"+bool);
//				return false;
			}
			else{//是否与其它存在冲突
				var parent_category=$("#update_parent_category").val();
				$.ajax({
					url:"/financialManage/categoryManage/ajaxFindCategory.action",
					async:true,
					type:"post",
					//规定要发送到服务器的数据（对象）
					data:{"parent_category": parent_category, "son_category": son},//自己拼接对象里面的数据
					dataType:"json",//返回时的数据类型json
					//当请求成功时运行的函数
					success:function(data){
						var val=data.name;
						console.log(val);
						if(val=="yes"){//当前子类型已存在
							$("#update_msgLabel").text("该收支子类型已存在，请修改当前值");
							bool=false;//不提交表单
							console.log("不提交表单:[当前类型已经存在]"+bool);
//							return bool;
//							return false;
						}
						else{
							$("#update_msgLabel").text("");
							bool=true;//提交表单
							console.log("提交表单:[新类型]"+bool);
							alert("修改收支子类型成功");
							document.updateShouzhiForm.submit();//提交表单
//							return bool;
//							return true;
						}
					}
				});
			}
		}
		console.log("当前的bool值是："+bool);
//		alert("当前的bool值是："+bool);
		return bool;
	}
	$("#update_son_category").blur(function(){//判断是否为空
//		alert("显示：");
//		valiadeSonCategory();
		
		var son=$("#update_son_category").val();//收支子类型
		if(son==null||son==""){
			$("#update_msgLabel").text("收支子类型不能为空，请输入");
		}
	});
	
	//什么时候表单不提交
	
	//提交表单
	$("#update_shouzhiCategory_btn").click(function(){
//		var bool= new Boolean(valiadeSonCategory());//类型是object
		var bool=valiadeSonCategory();//类型是boolean
//		alert((typeof(bool)+"::::"+bool));         //这些代码都无效
//		console.log(typeof(bool)+"::::"+bool);
//		console.log(typeof(new Boolean(bool)));
//		if(bool){
//			document.updateShouzhiForm.submit();//提交表单
//			return true;
//		}
//		else{
//			return false;
//		}
	});
	
/*		var ex=$("#exitShouzhi").val();
		if(ex=="yes"){
			$("#update_msgLabel").text("收支子类型不能为空，请输入");//信息提示框
			return false;
		}
		else{
			if(ex=="current"){//当前值，无需进行修改
				alert("收支子类型仍旧为当前值，无需进行修改");//信息提示框
				return false;
			}
			else{
				if(ex=="exit"){//存在，需要进行修改当前值
					$("#update_msgLabel").text("该收支子类型已存在，请修改当前值");//信息提示框
					return false;
				}
				else {//不存在，可以进行修改    //else (ex=="notexit")
					return true;
				}
			}
		}*/
	
	//模态框的关闭事件
	$('#shouzhiCategoryEditModal').on('hide.bs.modal', function () {
		$("#update_msgLabel").text("");//清空
	});

});