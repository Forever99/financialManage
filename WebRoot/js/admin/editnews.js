$(function() {
	// 点击显示 YYYY年格式
	$("#recordTime").jeDate({
		isinitVal : false,
		format : "YYYY-MM-DD"
	});
	
	$("#nTitle").blur(function(){//文章标题
		nTitleNotEmpty();
	});
	$("#author").blur(function(){//作者
		authorNotEmpty();
	});
	$("#keyword").blur(function(){//关键字
		keywordNotEmpty();
	});
	
	function nTitleNotEmpty(){
		var nTitle=$("#nTitle").val();
		nTitle=nTitle.replace( /^\s*/, '');//去除左边空格之后的值
		if(nTitle==""||nTitle==null){
			$("#myMsg").text("新闻标题不能为空，请输入标题");
			return false;
		}
		else{
			$("#myMsg").text("");
			return true;
		}
	};
	function authorNotEmpty(){
		var author=$("#author").val();
		author=author.replace( /^\s*/, '');//去除左边空格之后的值
		if(author==""||author==null){
			$("#myMsg").text("作者不能为空，请输入作者");
			return false;
		}
		else{
			$("#myMsg").text("");
			return true;
		}
	};
	function keywordNotEmpty(){
		var keyword=$("#keyword").val();
		keyword=keyword.replace( /^\s*/, '');//去除左边空格之后的值
		if(keyword==""||keyword==null){
			$("#myMsg").text("关键字不能为空，请输入关键字");
			return false;
		}
		else{
			$("#myMsg").text("");
			return true;
		}
	};
	function recordTimeNotEmpty(){
		var recordTime=$("#recordTime").val();
		if(recordTime==""||recordTime==null){
			$("#myMsg").text("记录日期不能为空，请输入记录日期");
			return false;
		}
		else{
			$("#myMsg").text("");
			return true;
		}
	};
	$("#mySubmit").click(function(){
		//非空判断
		var flag1= nTitleNotEmpty();
		var flag2=authorNotEmpty();
		var flag3=keywordNotEmpty();
		var flag4=recordTimeNotEmpty();
		
		var flag5=true;//文件内容判断结果
		var flag6=true;//上传内容判断结果
		
		//编辑框的内容的非空判断
		$("#editvalue").val(UE.getEditor('editor').getPlainTxt());//纯文本格式的内容存放在input标签中
		var edit = $("#editvalue").val();
		var replaceEdit = edit.replace( /^\s*/, '');//去除左边空格之后的值
		if (replaceEdit.length == 0) {
			flag5=false;
		}
		
		//附件内容的非空判断
		var file=$("#file").val();
		if(file==null||file==""){
			flag6=false;
		}
		
		//前四项基本内容为非空
		if(flag1==true&&flag2==true&&flag3==true&&flag4==true){
			$("#myMsg").text("");
			//判断flag5或者flag6只有有一项不为空
			if(flag5==false&&flag6==false){//文章内容为空，不提交表单
				alert("请选择方式一：手动输入文章内容，或者选择方式二：以附件形式上传文章内容");
				return false;
			}
			else{
				document.upfile.submit();//提交表单
				return true;
			}
		}
		else{
			if(flag1==false){
				$("#nTitle").focus();
			}
			else{
				if(flag2==false){
					$("#author").focus();
				}
				else{
					 if(flag3==false){
						$("#keyword").focus();
					 }
					 else{
						 $("#recordTime").focus();
					 }
				}
			}
			$("#myMsg").text("请输入文章标题，作者，关键字，记录日期等项...");
			return false;
		}
	});
	
});