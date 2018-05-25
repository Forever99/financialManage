$(document).ready(function(){

	$("#demo").Calculadora();//计算器
	
	// 点击显示 YYYY-MM年月格式
	$("#add_wdate").jeDate({
		isinitVal : false,
		format : "YYYY-MM-DD"
	});
	
	$("#edit_wdate").jeDate({
		isinitVal : false,
		format : "YYYY-MM-DD"
	});
	
	
	//添加校验 与  提交事件
	$("#addButton").click(function(){
//		alert("1111");
//		var text=$("#add_msg").text();//提醒
		var wish=$("#add_wish").val();//心愿
		var wdate=$("#add_wdate").val();//心愿日期
		var wnum=$("#add_wnum").val();//心愿金额
		if(wish==null||wish==""){
			$("#add_msg").text("心愿不能为空");
			return false;
		}
		if(wnum==null||wnum==""){
			$("#add_msg").text("心愿金额不能为空");
			$("#add_wnum").focus();
			return false;
		}
		else{//非空时，进行判断
			if(isNaN(wnum)){//不是数字
				$("#add_msg").text("心愿金额必须为数字，请正确输入");
				return false;
		    } 
		}
		if(wdate==null||wdate==""){
			$("#add_msg").text("心愿日期不能为空");
			return false;
		}
		$("#add_msg").text("");
		//符合校验，进行表单提交
		$.post("/financialManage/wishlist/addWish.action", $("#addform").serialize(), function(data) { //序列化数据为对象
			//回调为ok时，弹出alert框，并重新刷新页面
			alert("添加心愿单成功！");
			window.location.reload();
		});
	});
	
	
/*	//修改的值
	$("#myedit").click(function(){
		var ed=this.val();
		consle.log(ed);
		alert(ed);
	});*/
	
	//修改表单事件
	$("#editButton").click(function(){
		var wish=$("#edit_wish").val();//心愿
		var wdate=$("#edit_wdate").val();//心愿日期
		var wnum=$("#edit_wnum").val();//心愿金额
		
		if(wish==null||wish==""){
			$("#edit_msg").text("心愿不能为空");
			return false;
		}
		if(wnum==null||wnum==""){
			$("#edit_msg").text("心愿金额不能为空");
			$("#edit_wnum").focus();
			return false;
		}
		else{//非空时，进行判断
			if(isNaN(wnum)){//不是数字
				$("#edit_msg").text("心愿金额必须为数字，请正确输入");
				return false;
		    } 
		}
		if(wdate==null||wdate==""){
			$("#edit_msg").text("心愿日期不能为空");
			return false;
		}
		$("#edit_msg").text("");
		//提交表单
		//符合校验，进行表单提交
		
		$.post("/financialManage/wishlist/editWish.action", $("#editform").serialize(), function(data) { //序列化数据为对象
			//回调为ok时，弹出alert框，并重新刷新页面
			alert("修改心愿单成功！");
			window.location.reload();
		});
		
	});
	
	
});
