$(function() {

	$(window).load(function() {
		
		
		$("#demo").Calculadora();//计算器
		
		var current=null;//当前时间
		var uid=$("#uid").val();//当前用户id
		var budgetTime=$("#budgetTime").val();//当前月份存在预算
		var budgetValue=$("#budgetValue").val();//预算金额
		
		if(budgetTime!=null){
			current=budgetTime;
		}
		else{
			//获取当前时间
			//现在的时间  年月 YYYY-MM
			var year=new Date().getFullYear();//年
			var month=new Date().getMonth()+1;//月
			if(month<10){
				current=year+"-0"+month;
			}
			else{
				current=year+"-"+month;
			}
		}//时间部分设置
		
		//中间部分不显示   或   显示    后端已经做了判断
		
		//下面部分
		functionAll(uid,current,budgetValue);//计算收入,以及支出   ，绘图

	});


	//添加预算按钮
	$("#add_btn").click(function(){
		var wnum=$("#add_wnum").val();
//		alert(wnum);
		if(wnum==""||wnum==null){
			 $("#addmsg").text("请您输入金额");
			 return false;
		}
		else{
			if(isNaN(wnum)){
		        $("#addmsg").text("请您输入数字");
		        return false;
		    }
			$("#addmsg").text("");
			//添加预算
			 $.post("/financialManage/budget/addBudget.action",$("#add_form").serialize(),function(data){
					alert("添加预算成功！");
					window.location.reload();
			});
		}
	});
	
	
	//编辑预算按钮
	$("#edit_btn").click(function(){
		var wnum=$("#edit_wnum").val();
		if(wnum==""||wnum==null){
			 $("#editmsg").text("请您输入金额");
			 return false;
		}
		else{
			if(isNaN(wnum)){
		        $("#editmsg").text("请您输入数字");
		        return false;
		    }
			$("#editmsg").text("");
			//添加预算
			 $.post("/financialManage/budget/editBudget.action",$("#edit_form").serialize(),function(data){
					alert("编辑预算成功！");
					window.location.reload();
			});
		}
	});
	//删除预算按钮
	$("#delete_budget").click(function(){

		var wid=$("#delete_bug").val();
		if (confirm('确认要删除该条记录吗?')) {
			$.post("/financialManage/budget/deleteBudget.action", {
				"wid" : wid
			}, function(data) {
				//回调为ok时，弹出alert框，并重新刷新页面
				alert("删除预算成功！");
				window.location.reload();
			});
		}
	});
	
	//计算收入,以及支出
	function functionAll(uid,current,budgetValue){
		$.ajax({
			url : "/financialManage/shouzhiRecord/monthInCategoryCountSpend.action",
			type : "get",
			data : "currentTime="+ current+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
//				alert("success:--incomes  && spends"+data);
				
				//计算当前月的收入
				var allIncome=null;//总收入
				if(data.incomes.length==0){
					allIncome=0;
				}
				for(var i=0;i<data.incomes.length;i++){
					allIncome+=data.incomes[i].moneyName;
				}
				var allSpend=null;//总支出
				if(data.spends.length==0){
					allSpend=0;
				}
				else
				{
					//计算当前月的支出
					for(var i=0;i<data.spends.length;i++){
						allSpend+=data.spends[i].moneyName;
					}
					
				}
//				alert("allSpend:"+allSpend);
				//结余
				var duo=allIncome+allSpend;
//				alert("duo:"+duo);
				
				progressCreate(data);//收入排行榜
				progressCreate2(data);//支出排行榜
				
				
				//月度账单等进行显示
				var val=current.split('-');
				var bigFont=val[1];
				$("#bigFont").text(bigFont+"月");//月份
				$("#myIncome").text(allIncome);//收入
				$("#mySpend").text(-allSpend);//支出
				$("#myMore").text(duo);//结余
//				alert((-allSpend/budgetValue).toFixed(2));
//				alert(-allSpend);
				
				//拼接构建 圆环图需要的参数
				//预算金额，支出金额  连个数据的比重
				//budgetValue  预算金额
				//allSpend  支出金额
				var dataAll=null;
//				alert(budgetValue+":--"+(-allSpend));
				var left=budgetValue-(-allSpend);
//				alert(left);
				var sp=0;
				var lp=0;
				
				//支出 >预算   超支
				if(left<=0){
					sp=100;
					lp=0;
					dataAll={"spend":allSpend};
				}
				else{//支出 <=预算
					sp=-allSpend/budgetValue;
					lp=1-sp;
					sp=(sp*100).toFixed(2);//spend
					lp=(lp*100).toFixed(2);//left
					dataAll={"spend":allSpend,"budget":budgetValue};
				}
					
				$("#redBudget").text("预算"+budgetValue+"元");
				//消费   剩余
				$("#budget_spend").text(-allSpend);
				$("#budget_spend_per").text(sp+"%");
				$("#budget_leave").text(left);
				$("#budget_leave_per").text(lp+"%");
				
				circleRoundSpend(dataAll);//绘制圆环图
				
			},
			error : function() {// alert("fail");
			}
		});
	};
	
	
/*------------------------------------------------------------------------------*/	
	function progressCreate(data){//制作支出排行榜
		var allMoney=0;//总金额
		$.each(data.spends,function() {
			allMoney+=this.moneyName;
		});
		var divclass=$("<div></div>").append("<h3>支出排行榜</h3>");
		divclass.appendTo("#container2");//添加divWai到container2标签中
		
	/*	<div class="progress">
			<div class="progress-bar progress-bar-success" role="progressbar"
				 aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"
				 style="width: 40%;">
				<span >40% 完成</span>
			</div>
		</div>
	*/
		//循环遍历
		$.each(data.spends,function() {
			var per=(this.moneyName/allMoney)*100;//百分比
			var divWai=$("<div></div>").attr("class","progress");
			var divli=$("<div></div>").attr("class","progress-bar progress-bar-warning").attr("role","progressbar").
			attr("aria-valuenow","60").attr("aria-valuemin","0").attr("aria-valuemax","100").
			attr("style","width: "+per+"%;");
			per = per.toFixed(2);
			
			var spanli=$("<span></span>").append(per+"%");
			
			//判断逻辑，当per大于90的时候，显示在有颜色的一侧
			if(per>=80){
				divli.append(spanli);//显示文字【里面】
			}
			else{
				divWai.append(spanli);//显示文字【外面】
			}
			
			divWai.append(divli);//添加divli到divWai里面
			
			var span=$("<span></span>").append(this.categoryName+":"+(-this.moneyName));
			span.appendTo("#container2");//添加span到container2标签中
			divWai.appendTo("#container2");//添加divWai到container2标签中
		});
	};
	
	function progressCreate2(data){//制作收入排行榜
		var allMoney=0;//总金额
		$.each(data.incomes,function() {
			allMoney+=this.moneyName;
		});
		var divclass=$("<div></div>").append("<h3>收入排行榜</h3>");
		divclass.appendTo("#container1");//添加divWai到container2标签中
		//循环遍历
		$.each(data.incomes,function() {
			var per=(this.moneyName/allMoney)*100;//百分比
			var divWai=$("<div></div>").attr("class","progress");
			var divli=$("<div></div>").attr("class","progress-bar progress-bar-warning").attr("role","progressbar").
			attr("aria-valuenow","60").attr("aria-valuemin","0").attr("aria-valuemax","100").
			attr("style","width: "+per+"%;");
			per = per.toFixed(2);
			var spanli=$("<span></span>").append(per+"%");
			
			//判断逻辑，当per大于90的时候，显示在有颜色的一侧
			if(per>=80){
				divli.append(spanli);//显示文字【里面】
			}
			else{
				divWai.append(spanli);//显示文字【外面】
			}
			
//			divWai.append(spanli);//显示文字
			var span=$("<span></span>").append(this.categoryName+":"+(this.moneyName));
			divWai.append(divli);//添加divli到divWai里面
			span.appendTo("#container1");//添加divWai到container2标签中
			divWai.appendTo("#container1");//添加divWai到container2标签中
		});
	};

	/*--------------------------------------------------------------------------------------------*/	
	//圆环图--支出 
	function circleRoundSpend(data){  //{"spend":allSpend,"budget":budgetValue};
		var spendArray =[];//外面的数组
		var first=0;
		var second=0;
		var  color=null;
//		alert(data.budget==null);
		if(data.budget==null){//预算小于0，只有消费
			first=data.spend/data.spend;
			spendArray.push(["消费",first]);//已消费
			color=['#FD9240'];//第一个颜色 
		}
		else{
			if(data.spend==0){//只有预算，没有消费
//				alert(data.spend);
				//计算收入的总额
				second=1;//未消费
				spendArray.push(["剩余",second]);//未消费
				color=['#FFD954'];//第二个颜色 
			}
			else{//有消费，有预算
				//计算收入的总额
				first=-data.spend/data.budget;//已消费
				second=1-first;//未消费
				spendArray.push(["消费",first]);//已消费
				spendArray.push(["剩余",second]);//未消费
				color=['#FD9240','#FFD954'];//第一个颜色  第二个颜色
			}
		}
		
		
//		alert("first:"+first+"second:"+second);
		//绘图
		$('#container_budget').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	        },
	        colors:color,
	        title: {
	            floating:true,
	            text: ''
	        },
	        credits:{
	            enabled: false // 禁用版权信息
	       },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: false,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: false,
	                    //消费类型，消费金额的百分比【保留两位小数】
	                    format: '<b>{point.name}</b>: {point.percentage:.2f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	                
	            }
	        },
	        series: [{
	            type: 'pie',
	            innerSize: '30%',
	            name: '金额百分比',
	            data: spendArray
	        }]
	    }, function(c) {
	        // 环形图圆心
	        var centerY = c.series[0].center[1],
	            titleHeight = parseInt(c.title.styles.fontSize);
	        c.setTitle({
	            y:centerY + titleHeight/2
	        });
	        chart = c;
	    });
	};
	

});