$(function() {
	// financialCount页面加载时，进行绘制年度统计的表
	$(window).load(function() {
		
		$("#demo").Calculadora();//计算器 
		
		// 页面加载时，绘制统计图
		//系统当前时间
		var myDate = new Date();//获取当前的时间
//		$("#top_left").empty();
//		$("#top_right").empty();
//		$("#bottom_left").empty();
//		$("#bottom_right").empty();
		zhixing(myDate,"zero");//画各种图
	});
	// 点击显示 YYYY年格式
	$("#monthInput").jeDate({
		isinitVal : false,
		format : "YYYY-MM"
	});

	function zhixing(myDate,choose){
		myDate=new Date(myDate);
		var year = myDate.getFullYear();//获取当前的年份
		var month=myDate.getMonth()+1;
//		alert("执行--");
		var lastMonth=0;
		var lastYear=0;
		if(month==1){
			lastMonth=12;
			lastYear=year-1;
		}
		else{
			lastMonth=month-1;
			lastYear=year;
		}
		var currentTime=null;//当前时间
		var lastTime=null;//上月时间
		//当前月时间格式
		if(month<10){
			currentTime=year+"-0"+month;
		}
		else{
			currentTime=year+"-"+month;
		}
		//上月时间格式
		if(lastMonth<10){
			lastTime=lastYear+"-0"+lastMonth;
		}
		else{
			lastTime=lastYear+"-"+lastMonth;
		}
		
		$("#monthInput").val(currentTime);//回显年-月数据
		
		//饼图
		AllMonthCount(currentTime,lastTime);//当前月  以及 上月的收支情况统计分析【饼图】
		
		var day=0;
		var currentTimeDay=0;
		var lastTimeDay=0;
		
		if(choose=="all"){
//			alert("all");
//			myDate  2018-04  当前月的末尾
			var time=myDate;
			var year=time.getFullYear();
			var month=time.getMonth()+1;
			if(month<10){
				time=year+"-0"+month;
			}
			else{
				time=year+"-"+month;
			}
//			alert("time:"+time);
			day=howDay(time);//时间格式除了问题！！！！！！！！！！！！！！！！！！！！！
//			day=31;
			var day2=1;
			currentTimeDay=currentTime+"-"+day;//当前月的最后一天
			lastTimeDay=lastTime+"-0"+day2;//当前月的1号
		}
		else{
//			alert("not-all");
			day=myDate.getDate();
			if(day<10){
				currentTimeDay=currentTime+"-0"+day;
				lastTimeDay=lastTime+"-0"+day;
			}
			else{
				currentTimeDay=currentTime+"-"+day;
				lastTimeDay=lastTime+"-"+day;
			}
		}
	
//		alert(currentTime+"::"+lastTime);
//		alert(currentTimeDay+"::"+lastTimeDay);
		allMonthCategoryLine(currentTime,lastTime,currentTimeDay,lastTimeDay);//当前月 以及 上月 的同一时期的各类型数据比较【折线图】
	}
	
	//判断该月是有28，或是29，或是30，或是31天。
	function howDay(currentTime){
		var ar=currentTime.split("-");
		var mon=0;//月份
		var day=0;//天数
		if(ar[1]<10){
			mon=ar[1].charAt(1);//取第二位：即 03  取  3
		}
		//错误，此处mon是String类型  ，而switch中的均为number类型
		//正确：进行如下类型转换
		mon=parseInt(mon);//String-->number
		switch(mon){//通过月份
		  case 1:
		  case 3:
		  case 5:
		  case 7:
		  case 8:
		  case 10:
		  case 12:
			  day=31;//31天
			  break; 
		  case 4:
		  case 6:
		  case 9:
		  case 11:
			  day=30;//30天
			  break; 
		  case 2:
			  if(ar[0]%400==0||(ar[0]%4==0&&ar[0]%100!=0)){
				  day=29;//29天【闰年】
			  }
			  else{
				  day=28;//28天【平年】
			  }
			  break;
//		  default:
//              alert("输入月份有误");
//              break;
		}
		return day;
	}
	
	//查询按钮点击
	$("#monthSelect").click(function(){
//		var myDate=new Date();
		var myDate=$("#monthInput").val();
		if(myDate==null||myDate==""){
			alert("请选择年月");
			return false;
		}
		
//		$("#top_left").empty();
//		$("#top_right").empty();
//		$("#bottom_left").empty();
//		$("#bottom_right").empty();
		zhixing(myDate,"all");
	});
	
	function AllMonthCount(currentTime,lastTime){//当前月  以及上月的收支情况统计分析
		var uid=$("#uid").val();
		$.ajax({
			url : "/financialManage/financialAnalysis/monthAnalysis.action",
			type : "get",
			data : "currentTime=" + currentTime+"&lastTime="+lastTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				/*----------------------------------------------------------------------------------------------*/
				MonthInCountCurrent(data);//本月数据
//  json数据：{"current":{"allMoney":2056,"incomeMoney":522,"incomeRecordCount":2,"spendsMoney":1534,"spendsRecordCount":3},
//  "last":{"allMoney":5600,"incomeMoney":3687,"incomeRecordCount":32,"spendsMoney":1913,"spendsRecordCount":10}}
				//显示数据在页面
				
				
				$("#currentIncomeRecord").text(data.current.incomeRecordCount);
				$("#currentSpendRecord").text(data.current.spendsRecordCount);
				var currentAllMoney=data.current.allMoney;//总金额
				var currentIncomeMoney=data.current.incomeMoney;//收入
				var currentSpendsMoney=data.current.spendsMoney;//支出
				var currentLeftMoney=data.current.incomeMoney-data.current.spendsMoney;//余额
				$("#currentAllMoney").text(currentAllMoney);
				$("#currentIncomeMoney").text(currentIncomeMoney);
				$("#currentSpendMoney").text(currentSpendsMoney);
				$("#currentLeft").text(currentLeftMoney);
				
				var incomePercent;
				var spendsPercent;
				if(data.current.allMoney!=0){
					incomePercent=((data.current.incomeMoney/data.current.allMoney)*100);
					incomePercent=incomePercent.toFixed(2);
					spendsPercent=(100-incomePercent).toFixed(2);
				}
				else{
					incomePercent=0;
					spendsPercent=0;
				}
				
//				alert("---"+spendsPercent);
				$("#currentIncomePercent").text(incomePercent+"%");//收入占比
				$("#currentSpendPercent").text(spendsPercent+"%");//支出占比
				/*----------------------------------------------------------------------------------------------*/
				MonthInCountLast(data);//上月数据
				//显示数据在页面
				$("#lastIncomeRecord").text(data.last.incomeRecordCount);
				$("#lastSpendRecord").text(data.last.spendsRecordCount);
				
				var lastAllMoney=data.last.allMoney;//总金额
				var lastIncomeMoney=data.last.incomeMoney;//收入
				var lastSpendsMoney=data.last.spendsMoney;//支出
				var lastLeftMoney=data.last.incomeMoney-data.last.spendsMoney;//余额
				$("#lastAllMoney").text(lastAllMoney);
				$("#lastIncomeMoney").text(lastIncomeMoney);
				$("#lastSpendMoney").text(data.last.spendsMoney);
				$("#lastLeft").text(lastLeftMoney);
				
//				if(data.last.incomeMoney==0){}
				if(data.last.allMoney!=0){
					incomePercent=((data.last.incomeMoney/data.last.allMoney)*100);
					incomePercent=incomePercent.toFixed(2);
					spendsPercent=(100-incomePercent).toFixed(2);
				}
				else{
					incomePercent=0;
					spendsPercent=0;
				}
//				alert(spendsPercent);
				$("#lastIncomePercent").text(incomePercent+"%");//收入占比
				$("#lastSpendPercent").text(spendsPercent+"%");//支出占比
				
				//财务分析数据显示【红色字体】
				var minusIncomeMoney=currentIncomeMoney-lastIncomeMoney;//收入
				if(currentIncomeMoney!=0||lastIncomeMoney!=0){
					if(minusIncomeMoney>0){
						$("#incomeAnalysis").text("增加"+minusIncomeMoney);
					}
					else if(minusIncomeMoney==0){
						$("#incomeAnalysis").text("保持不变");
					}
					else{// minusAllMoney <0
						$("#incomeAnalysis").text("减少"+minusIncomeMoney);
					}
				}
				else{
					$("#incomeAnalysis").text("无数据可分析");
				}
				
//				spendsAnalysis
				var minusSpendsMoney=currentSpendsMoney-lastSpendsMoney;//支出
				if(currentSpendsMoney!=0||lastSpendsMoney!=0){
					if(minusSpendsMoney>0){
						$("#spendsAnalysis").text("增加"+minusSpendsMoney);
					}
					else if(minusSpendsMoney==0){
						$("#spendsAnalysis").text("保持不变");
					}
					else{// minusIncomeMoney <0
						$("#spendsAnalysis").text("减少"+minusSpendsMoney);
					}
				}
				else{
					$("#spendsAnalysis").text("无数据可分析");
				}
				
//				leftAnalysis
				var minusLeftMoney=currentLeftMoney-lastLeftMoney;//余额
				if(currentLeftMoney!=0||lastLeftMoney!=0){
					if(minusLeftMoney>0){
						$("#leftAnalysis").text("增加"+minusLeftMoney);
					}
					else if(minusLeftMoney==0){
						$("#leftAnalysis").text("保持不变");
					}
					else{// minusSpendsMoney <0
						$("#leftAnalysis").text("减少"+minusLeftMoney);
					}
				}
				else{
					$("#leftAnalysis").text("无数据可分析");
				}
//			
			},error : function() {
//				 alert("fail");
			}
		});
	};
	
	function MonthInCountCurrent(data){//本月的数据
//		var a="ok"+data;
//		alert(a);
		if(data.current.allMoney==0){
//			alert("true111");
			$("#container_month_chart_left").empty();//清空原有的元素
			var ele=$("<span></span>").append("当前月收支信息为空").attr("style","font-size:30px;color:red;");
			ele.appendTo("#container_month_chart_left");
			return;
		}
		else{
			var chart = {// 绘制饼图
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false
			};
			var title = {
				text : ''
			};
			var tooltip = {
				pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
			};
			var plotOptions = {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : true,
						format : '<b>{point.name}</b>: {point.percentage:.1f} %',
						style : {
							color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
									|| 'black'
						}
					}
				}
			};
			// 版权信息
			var credits = {
				text : ''
			};
			
			var currentArray=CurrentPercent(data);//根据获得的数据
			var series = [ {
				type : 'pie',//饼图
				name : '金额比例',
				data : currentArray
			} ];
			var json = {};
			json.chart = chart;
			json.title = title;
			json.tooltip = tooltip;
			json.series = series;
			json.plotOptions = plotOptions;
			json.credits=credits;
//			$("#top_left").show();
			$('#container_month_chart_left').highcharts(json);
//			ele.appendTo("#top_left");
		}
	};
	function MonthInCountLast(data){//上月的数据
		if(data.last.allMoney==0){
			$("#container_month_chart_right").empty();//清空原有的元素
			var ele=$("<span></span>").append("上月收支信息为空").attr("style","font-size:30px;color:red;");
			ele.appendTo("#container_month_chart_right");
			return;
		}
		else{
			var chart = {// 绘制饼图
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false
			};
			var title = {
				text :''
			};
			var tooltip = {
				pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>'
			};
			var plotOptions = {
				pie : {
					allowPointSelect : true,
					cursor : 'pointer',
					dataLabels : {
						enabled : true,
						format : '<b>{point.name}</b>: {point.percentage:.1f} %',
						style : {
							color : (Highcharts.theme && Highcharts.theme.contrastTextColor)
									|| 'black'
						}
					}
				}
			};
			// 版权信息
			var credits = {
				text : ''
			};
			//根据获得的数据
			var lastArray=lastPercent(data);
			var series = [ {
				type : 'pie',//饼图
				name : '金额比例',
				data : lastArray
			} ];
			var json = {};
			json.chart = chart;
			json.title = title;
			json.tooltip = tooltip;
			json.series = series;
			json.plotOptions = plotOptions;
			json.credits=credits;
			$('#container_month_chart_right').highcharts(json);
		}
	};

	//当前月的收支比例，在总金额中的比例
	function CurrentPercent(data){
		//json数据：{"current":{"allMoney":2056,"incomeMoney":522,"incomeRecordCount":2,"spendsMoney":1534,"spendsRecordCount":3},
		var currentArray =[];//外面的数组
		var allMoney=data.current.allMoney;//总收支
		currentArray.push(["收入",data.current.incomeMoney/allMoney]);//收入
		currentArray.push(["支出",data.current.spendsMoney/allMoney]);//支出
		return currentArray;
	}
	//上月的收支比例，在总金额中的比例
	function lastPercent(data){
		var lastArray =[];//外面的数组
		var allMoney=data.last.allMoney;//总收支
		lastArray.push(["收入",data.last.incomeMoney/allMoney]);//收入
		lastArray.push(["支出",data.last.spendsMoney/allMoney]);//支出
		return lastArray;
	}

	
	//当前月 以及 上月 的同一时期的各类型数据比较【折线图】
	function allMonthCategoryLine(currentTime,lastTime,currentTimeDay,lastTimeDay){
		var uid=$("#uid").val();
//		alert(uid);
//		alert("-----------------");
		$.ajax({
			url : "/financialManage/financialAnalysis/monthCurrentDayAnalysis.action",
			type : "get",
			data : "currentTimeDay=" + currentTimeDay+"&lastTimeDay="+lastTimeDay+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
//				alert("success");
				currentTimeLine(data,currentTime);//当前月，当前时间收支图
				lastMonthTimeLine(data,lastTime);//上个月，当前时间收支图
				
				
				/*			{"current":{"incomes":[{"categoryName":"工资","dayName":0,"moneyName":23}],
				 * 
								"spends":[{"categoryName":"伙食费","dayName":0,"moneyName":-900},
								          {"categoryName":"住宿费","dayName":0,"moneyName":-300},
								          {"categoryName":"交通费","dayName":0,"moneyName":-334}]},
								"last":{"incomes":[{"categoryName":"工资","dayName":0,"moneyName":503},
								                   {"categoryName":"借钱","dayName":0,"moneyName":300}],
								                   
								                   "spends":[{"categoryName":"伙食费","dayName":0,"moneyName":-315}]}}*/
				var curAll=0;
				var lastAll=0;
				var curPer=null;//当前月百分比
				var lastPer=null;//上个月百分比
				for(var i=0;i<data.current.spends.length;i++){//当前月支出
					curAll+=data.current.spends[i].moneyName;
				}
				
				for(var i=0;i<data.last.spends.length;i++){//上个月支出
					lastAll+=data.last.spends[i].moneyName;
				}
				if(-curAll>-lastAll){
					curPer=100+"%";
					lastPer=((lastAll/curAll)*100).toFixed(2)+"%";
				}else if(-curAll<-lastAll){
					curPer=((curAll/lastAll)*100).toFixed(2)+"%";
					lastPer=100+"%";
				}else{//  curAll==lastAll
					curPer=100+"%";
					lastPer=100+"%";
				}
				
//				alert(curAll+":::"+lastAll+"-------"+curPer+":"+lastPer);
				
				//进度条
				$("#current-progress-bar").attr("style","width:"+curPer+";");
				$("#last-progress-bar").attr("style","width:"+lastPer+";");
				$("#current-progress").text(curPer);
				$("#current-progress2").text(-curAll+"元");
				
				$("#last-progress").text(lastPer);
				$("#last-progress2").text(-lastAll+"元");
				
				var left=-curAll-(-lastAll);
				if(left>0){
					$("#spendAnalysis").text("同比上月，当前月的同期支出 比 上个月多了"+left+"元");
				}
				else if(left==0){
					$("#spendAnalysis").text("同比上月，当前月的同期支出 比 上个月持平");
				}
				else{
					$("#spendAnalysis").text("同比上月，当前月的同期支出 比 上个月少了"+-left+"元");
				}
//				
				
			},
			error : function() {
//				 alert("fail");
			}
		});
	};

	function currentTimeLine(data,currentTime){//当前月，当前时间收支图
//		alert("执行");
//		alert(data.current.incomes.length==0&&data.last.incomes.length==0);
//		alert("currentTime:"+currentTime+"---"+data.current.incomes.length+":::::"+data.last.incomes.length);
		if(data.current.incomes.length==0&&data.last.incomes.length==0){
//		if(data.current==null){
			//清空原有的元素
			$("#container_month_chart_left2").empty();
			var ele=$("<span></span>").append("收入信息为空").attr("style","font-size:30px;color:red;");
			ele.appendTo("#container_month_chart_left2");
			return;
		}
		else{
			var title = {
				text :  '收入情况'
			};
			var subtitle = {
				text : ''
			};
/*			{"current":{"incomes":[{"categoryName":"工资","dayName":0,"moneyName":23}],
 * 
				"spends":[{"categoryName":"伙食费","dayName":0,"moneyName":-900},
				          {"categoryName":"住宿费","dayName":0,"moneyName":-300},
				          {"categoryName":"交通费","dayName":0,"moneyName":-334}]},
				"last":{"incomes":[{"categoryName":"工资","dayName":0,"moneyName":503},
				                   {"categoryName":"借钱","dayName":0,"moneyName":300}],
				                   
				                   "spends":[{"categoryName":"伙食费","dayName":0,"moneyName":-315}]}}*/
			
			var arr=[];
//			alert("你好："+data.current.incomes.length);
			
			var curIncomeArray=[];//本月数据
			var lastIncomeArray=[];//上月数据
			//所有收入类型名
			for(var i=0;i<data.current.incomes.length;i++){//当前月
				arr.push(data.current.incomes[i].categoryName);
				
			}
			for(var i=0;i<data.last.incomes.length;i++){//上个月
				arr.push(data.last.incomes[i].categoryName);
				
			}
//			alert("数组:"+arr);
			$.unique(arr); //去重
//			alert("去重后的数组："+arr);//去重后的数组
			
//			alert(arr[1]==data.last.incomes[1].categoryName);
			
			//当前月收入
			/*做法：1、先初始化数组元素2、确定数组元素位置是否存在元素，如果存在，则在指定位置进行元素的添加*/
			
			//初始化数组元素
			for(var i=0;i<arr.length;i++){
				curIncomeArray.push(0);//添加数组元素
				lastIncomeArray.push(0);
			}

			
			//本月收入元素设置
			var j=-1;
//			alert("执行代码？");
			for(var i=0;i<arr.length;i++){
				j=-1;
//				alert("data.current.incomes.length:"+data.current.incomes.length);
				//数组中是否存在某个元素
				for(var k=0;k<arr.length;k++){
					//数组的长度问题
					if(k<data.current.incomes.length){
						if(data.current.incomes[k].categoryName==arr[i]){
							j=k;
//							alert("j=k");
							break;
						}
					}
				}
				//jquery代码弊端：使用一次后，就不再执行
//				j=$.inArray(data.current.incomes[i].categoryName, arr);  //返回 存在元素的数组下标
				// 拼接函数(索引位置, 要删除元素的数量, 元素)  
				if(j!=-1){
					curIncomeArray.splice(j, 1, data.current.incomes[i].moneyName);  //添加一个新元素
				}
			}
			//上月收入元素设置
			for(var i=0;i<arr.length;i++){
				if(i<data.last.incomes.length){//必须在数组范围内
					var j=$.inArray(data.last.incomes[i].categoryName, arr);  //返回 存在元素的数组下标
					// 拼接函数(索引位置, 要删除元素的数量, 元素)  
					if(j!=-1){//如果不包含在数组中,则返回 -1;
						lastIncomeArray.splice(j, 1, data.last.incomes[i].moneyName);  //添加一个新元素
					}
				}
			}
//			alert("替代后lastIncomeArray："+lastIncomeArray);
			// x坐标轴
			var xAxis = {
				categories :arr
			};
			// y坐标轴
			var yAxis = {
				title : {
					text : '人民币(元)'
				},
				plotLines : [ {
					value : 0,
					width : 1,
					color : '#808080'
				} ]
			};

			// 提示框
			var tooltip = {
				valueSuffix : '元'
			};

			// 图例
			var legend = {
				// 图例内容布局方式，有水平布局及垂直布局可选，
				// 对应的配置值是： “horizontal”， “vertical”
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'middle',
				borderWidth : 0
			};

			// 数据带有标签
			var plotOptions = {
				line : {
					dataLabels : {
						enabled : true
					},
					enableMouseTracking : false
				}
			};
			// 版权信息
			var credits = {
				text : ''
			};

			var series = [ {
				name : '本月数据',
//				data : [0,100,0],//测试数据
				data : curIncomeArray,
				color : '#FF6666'
			}, {
				name : '上月数据',
//				data : [100,0,100],//测试数据
				data : lastIncomeArray,
				color : '#7CB5EC'
			} ];
			var json = {};
			json.title = title;
			json.subtitle = subtitle;
			json.xAxis = xAxis;
			json.yAxis = yAxis;
			json.tooltip = tooltip;
			json.legend = legend;
			json.credits = credits;
			json.series = series;
			json.plotOptions = plotOptions;
			$('#container_month_chart_left2').highcharts(json);
		}
	}
	
	//上个月，当前时间收支图
	function lastMonthTimeLine(data,lastTime){
//		alert(data.current.spends.length==0&&data.last.spends.length==0);
		if(data.current.spends.length==0&&data.last.spends.length==0){
//		if(data.last==null){
			//清空原有的元素
			$("#container_month_chart_right2").empty();
			var ele=$("<span></span>").append("支出信息为空").attr("style","font-size:30px;color:red;");
			ele.appendTo("#container_month_chart_right2");
			return;
		}
		else{
			var title = {
				text :'支出情况'
			};
			var subtitle = {
				text : ''
			};

			var arr=[];
			var curSpendArray=[];//本月数据
			var lastSpendArray=[];//上月数据
			//所有支出类型名
			for(var i=0;i<data.current.spends.length;i++){//当前月
				arr.push(data.current.spends[i].categoryName);
				
			}
			for(var i=0;i<data.last.spends.length;i++){//上个月
				arr.push(data.last.spends[i].categoryName);
				
			}
			$.unique(arr); //去重
//			alert(arr);
			
			//当前月支出
			/*做法：1、先初始化数组元素2、确定数组元素位置是否存在元素，如果存在，则在指定位置进行元素的添加*/
			//初始化数组元素
			for(var i=0;i<arr.length;i++){
				curSpendArray.push(0);//添加数组元素
			}
//			alert("初始化curSpendArray："+curSpendArray);
			
			for(var i=0;i<arr.length;i++){
				//必要前提条件，在数组范围内
				if(i<data.current.spends.length){
					var j=$.inArray(data.current.spends[i].categoryName, arr);  //返回 存在元素的数组下标
	//				alert("j:"+j);
					// 拼接函数(索引位置, 要删除元素的数量, 元素)  
					curSpendArray.splice(j, 1, -data.current.spends[i].moneyName);  //添加一个新元素
				}
			}
//			alert("替代后curSpendArray："+curSpendArray);
		/*	
		 * 考虑不周全，失败，因为到中间有些类型的元素为空值时，无法进行一一对应
			for(var i=0;i<arr.length;i++){
				var len=data.current.spends.length;//本月支出的数组长度
				if(len>=i+1){//len-1>=i
					//支出元素设置
					if(arr[i]==data.current.spends[i].categoryName){//当前位置存在
						curSpendArray.push(-data.current.spends[i].moneyName);//添加数组元素
					}
					else{//当前位置不存在数据
						curSpendArray.push(0);//添加数组元素
					}
				}
				else{//len-1 <i   超出数组长度，直接添加一个空元素
					curSpendArray.push(0);//添加数组元素
				}
			}*/
			
//			alert("curSpendArray:"+curSpendArray);
			
			
			//上个月支出
			//初始化数组元素
			for(var i=0;i<arr.length;i++){
				lastSpendArray.push(0);//添加数组元素
			}
//			alert("初始化lastSpendArray："+lastSpendArray);
			for(var i=0;i<arr.length;i++){
				//必要前提条件，在数组范围内
				if(i<data.last.spends.length){
					var j=$.inArray(data.last.spends[i].categoryName, arr);  //返回 存在元素的数组下标
//					alert("j:"+j);
					// 拼接函数(索引位置, 要删除元素的数量, 元素)  
					lastSpendArray.splice(j, 1, -data.last.spends[i].moneyName);  //添加一个新元素
//					alert("替代后lastSpendArray："+lastSpendArray);
				}
			}
//			alert("替代后lastSpendArray："+lastSpendArray);
			
			// x坐标轴
			var xAxis = {
				categories :arr
			};
			// y坐标轴
			var yAxis = {
				title : {
					text : '人民币(元)'
				},
				plotLines : [ {
					value : 0,
					width : 1,
					color : '#808080'
				} ]
			};

			// 提示框
			var tooltip = {
				valueSuffix : '元'
			};

			// 图例
			var legend = {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'middle',
				borderWidth : 0
			};

			// 数据带有标签
			var plotOptions = {
				line : {
					dataLabels : {
						enabled : true
					},
					enableMouseTracking : false
				}
			};
			// 版权信息
			var credits = {
				text : ''
			};

			var series = [ {
				name : '本月数据',
//				data : [0,100,0],//测试数据
				data : curSpendArray,
				color : '#FF6666'
			}, {
				name : '上月数据',
//				data : [100,0,100],//测试数据
				data : lastSpendArray,
				color : '#7CB5EC'
			} ];
			var json = {};
			json.title = title;
			json.subtitle = subtitle;
			json.xAxis = xAxis;
			json.yAxis = yAxis;
			json.tooltip = tooltip;
			json.legend = legend;
			json.credits = credits;
			json.series = series;
			json.plotOptions = plotOptions;
			$('#container_month_chart_right2').highcharts(json);
		}
	}

});