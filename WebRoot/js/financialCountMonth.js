$(function() {
	// 点击显示 YYYY-MM年月格式
	$("#chooseInput").jeDate({
		isinitVal : false,
		format : "YYYY-MM"
	});

	// financialCount页面加载时，进行绘制月份统计的表
	$(window).load(function() {
		// 页面加载时，绘制统计图
		var myDate = new Date();//获取当前的时间
		var year = myDate.getFullYear();//获取当前的年份
		var month=myDate.getMonth()+1;//当前月份
		//时间格式的处理
		var currentTime=0;
		if(month<10){
			currentTime=year+"-0"+month;
		}
		else{
			currentTime=year+"-"+month;
		}
		$("#ymnian").val(year);//回显时间
		
		//扇形图
		$("#container_month_chart_left").show();
		$("#container_month_chart_right").show();
		MonthInCategoryCountPieShanIncome(currentTime);//收入
		MonthInCategoryCountPieShanSpend(currentTime);//支出
		$("#container_month_chart").hide();
		/*
		//折线图
		MonthInDayCountLine(currentTime);//当前时间
*/		
	});
	
	//点击时，进行查询
	$("#monthSelect").click(function() {
		var currentTime = $("#chooseInput").val();//获得时间
		var chart=$("#dayChart").val();//获得图的类型
		
		//为空时，获得系统时间
		if (currentTime == null || currentTime == "") {
			var myDate = new Date();//获取当前的时间
			var year = myDate.getFullYear();//获取当前的年份
			var month=myDate.getMonth()+1;//当前月份
			//时间格式的处理
			if(month<10){
				currentTime=year+"-0"+month;
			}
			else{
				currentTime=year+"-"+month;
			}
		}
		if(chart=="折线图"){
			$("#container_month_chart").show();
			MonthInDayCountLine(currentTime);//折线图
			$("#container_month_chart_left").hide();
			$("#container_month_chart_right").hide();
		}
		else if(chart=="柱形图"){
			$("#container_month_chart").show();
			MonthInDayCountColumn(currentTime);//柱形图
			$("#container_month_chart_left").hide();
			$("#container_month_chart_right").hide();
		}
		else if(chart=="饼图"){
			$("#container_month_chart_left").show();
			$("#container_month_chart_right").show();
			MonthInCategoryCount(currentTime);//饼图	--收入
			MonthInCategoryCountSpends(currentTime);//饼图 --支出
			$("#container_month_chart").hide();
		}
		else if(chart=="条形图"){
			$("#container_month_chart").show();
			MonthInDayCountBar(currentTime);//条形图
			$("#container_month_chart_left").hide();
			$("#container_month_chart_right").hide();
		}
		else if(chart=="面积图"){
			$("#container_month_chart").show();
			MonthInDayCountArea(currentTime);//面积图
			$("#container_month_chart_left").hide();
			$("#container_month_chart_right").hide();
		}
		else if(chart=="金字塔形图"){
			$("#container_month_chart").show();
			MonthInDayCountColumnKing(currentTime);
			$("#container_month_chart_left").hide();
			$("#container_month_chart_right").hide();
		}
		else if(chart=="圆环图"){
			$("#container_month_chart_left").show();
			$("#container_month_chart_right").show();
			MonthInCategoryCountPieCircleRoundSpend(currentTime);//支出 
			MonthInCategoryCountPieCircleRoundIncome(currentTime);//收入
			
			$("#container_month_chart").hide();
		}
		else if(chart=="雷达图"){
			$("#container_month_chart").show();
			MonthInCategoryCountRadarMap(currentTime);
			$("#container_month_chart_left").hide();
			$("#container_month_chart_right").hide();
		}
		else if(chart=="综合图"){
			$("#container_month_chart").show();
			MonthInCategoryCountAllKind(currentTime);
			$("#container_month_chart_left").hide();
			$("#container_month_chart_right").hide();
		}
		else{//扇形图  chart=="扇形图"
			$("#container_month_chart_left").show();
			$("#container_month_chart_right").show();
			MonthInCategoryCountPieShanIncome(currentTime);//收入
			MonthInCategoryCountPieShanSpend(currentTime);//支出
			$("#container_month_chart").hide();
		}
		$("#chooseInput").val(currentTime);
		return true;
	});
	
	
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
	
	//创建数组，对应于改月为28，或是29，或是30，或是31天。
	function howArr(day){
		var arr=[];//数组
		if(day==28){
			arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];
		}
		else if(day==29){
			arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
		}
		else if(day==30){
			arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
		}
		else{//day==31
			arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
		}
		return arr;
	}
	/*-------------------------------------------------------------------------------*/
	//每天收入类型参数构造【初始值为0时】
	function dayIncomeArrayZero(day,data){
		var incomeArray = new Array(day);
		// 收入--初始化
		for (var i = 0; i < incomeArray.length; i++) {
			incomeArray[i] = 0;
		}
		// 将json中的值赋值到相应的数组中
		if (data.incomes != null) {
			for (var i = 0; i < data.incomes.length; i++) {
				var a = data.incomes[i].dayName - 1;// 天所在下标
				incomeArray[a] = data.incomes[i].moneyName;
			}
		}
		return incomeArray;
	}
	
	//每天收入类型参数构造【初始值为null时】
	function dayIncomeArrayNull(day,data){
		var incomeArray = new Array(day);
		// 收入--初始化
		for (var i = 0; i < incomeArray.length; i++) {
			incomeArray[i] = null;
		}
		// 将json中的值赋值到相应的数组中
		if (data.incomes != null) {
			for (var i = 0; i < data.incomes.length; i++) {
				var a = data.incomes[i].dayName - 1;// 天所在下标
				incomeArray[a] = data.incomes[i].moneyName;
			}
		}
		return incomeArray;
	}
	//每天支出类型参数构造【初始值为0时】
	function daySpendsArrayZero(day,data){
		// 支出数组
		var spendArray = new Array(day);
		// 支出 -- 初始化
		for (var i = 0; i < spendArray.length; i++) {
			spendArray[i] = 0;
		}
		if (data.spends != null) {
			for (var i = 0; i < data.spends.length; i++) {
				var a = data.spends[i].dayName - 1;// 天所在下标
				spendArray[a] = -data.spends[i].moneyName;//支出也为整数形式表现
			}
		}
		return spendArray;
	}
	//每天支出类型参数构造【初始值为null时】
	function daySpendsArrayNull(day,data){
		// 支出数组
		var spendArray = new Array(day);
		// 支出 -- 初始化
		for (var i = 0; i < spendArray.length; i++) {
			spendArray[i] = null;
		}
		if (data.spends != null) {
			for (var i = 0; i < data.spends.length; i++) {
				var a = data.spends[i].dayName - 1;// 天所在下标
				spendArray[a] = -data.spends[i].moneyName;//支出也为整数形式表现
			}
		}
		return spendArray;
	}
	/*-------------------------------------------------------------------------------*/
	//计算各种收入类型在，在总金额中的比例
	function incomeArrayInMonthAndCategory(data){
		var incomeArray =[];//外面的数组
		//计算收入的总额
		var allMoney=0;
		for(var i=0;i<data.incomes.length;i++){
			allMoney+=data.incomes[i].moneyName;
		}
		for(var i=0;i<data.incomes.length;i++){
			incomeArray.push([data.incomes[i].categoryName,data.incomes[i].moneyName/allMoney]);
		}
		
		return incomeArray;
	}
	//计算各种收入类型在，在总金额中的比例
	function spendArrayInMonthAndCategory(data){
		var spendArray =[];//外面的数组
		//计算收入的总额
		var allMoney=0;
		for(var i=0;i<data.spends.length;i++){
			allMoney+=data.spends[i].moneyName;
		}
		for(var i=0;i<data.spends.length;i++){
			spendArray.push([data.spends[i].categoryName,data.spends[i].moneyName/allMoney]);
		}
		return spendArray;
	}
	/*-------------------------------------------------------------------------------*/
	// 绘制月份统计报表【折线图】
	function MonthInDayCountLine(currentTime) {
//		alert("执行");
		var uid=$("#uid").val();
		var day=howDay(currentTime);//是28，还是29，还是30，还是31
		var arr=howArr(day);//x轴的坐标构建
		$.ajax({
			url : "/financialManage/shouzhiRecord/MonthInDayCount.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				// alert("success");
				if(data.spends.length==0&&data.incomes.length==0){
					//清空原有的元素
					$("#container_month_chart").empty();
					var ele=$("<span></span>").append(currentTime+"收支信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart");
					return;
				}
				else{
					var title = {
						text : currentTime + '收支情况'
					};
					var subtitle = {
						text : ''
					};
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
						text : 'financialCount.com'
					};
					// 创建 数据列series
					// 收入数组
					var incomeArray=dayIncomeArrayZero(day,data);
					var spendArray=daySpendsArrayZero(day,data);
					
					var series = [ {
						name : '收入',
						data : incomeArray,
						color : '#FF6666'
					}, {
						name : '支出',
						data : spendArray,
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
	
					$('#container_month_chart').highcharts(json);
				}
			},
			error : function() {
				// alert("fail");
			}
		});
	}
	
	/*----------------------------------------------------------------------------------------------*/
	//柱形图
	function MonthInDayCountColumn(currentTime){
		var uid=$("#uid").val();
		var day=howDay(currentTime);//是28，还是29，还是30，还是31
		var arr=howArr(day);//x轴的坐标构建
		$.ajax({
			url : "/financialManage/shouzhiRecord/MonthInDayCount.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				// alert("success");
				if(data.spends.length==0&&data.incomes.length==0){
					//清空原有的元素
					$("#container_month_chart").empty();
					var ele=$("<span></span>").append(currentTime+"收支信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart");
					return;
				}
				else{
					 var chart = {
						  type: 'column'
					};
					var title = {
						text : currentTime+ '收支情况'
					};
					var subtitle = {
						text : ''
					};
					// x坐标轴
					var xAxis = {
						categories : arr,
						crosshair: true
					};
					// y坐标轴
					var yAxis = {
						title : {
							text : '人民币(元)'
						}
					};
					// 提示框
					var tooltip = {
					  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				         '<td style="padding:0"><b>{point.y:.1f} 元</b></td></tr>',
				      footerFormat: '</table>',
				      shared: true,
				      useHTML: true
					};
					// 数据带有标签
					var plotOptions = {
						 shadow: false,            //不显示阴影
						 column: {
					         pointPadding: 0.2,
					         borderWidth: 0,
					         dataLabels:{ //柱状图数据标签
					             enabled:true,              //是否显示数据标签
	//				             color:'#e3e3e3',        //数据标签字体颜色
					             formatter: function() {        //格式化输出显示
					                  return "¥" + (this.y);
					              }
					         }
					      }
					};
					// 版权信息
					var credits = {
						text : 'financialCount.com'
					};
					
					// 创建 数据列series
					// 收入数组
					var incomeArray=dayIncomeArrayNull(day,data);
					var spendArray=daySpendsArrayNull(day,data);
					var series = [ {
						name : '收入',
						data : incomeArray,
						color : '#FF6666'
					}, {
						name : '支出',
						data : spendArray,
						color : '#7CB5EC'
					} ];
					var json = {};
					json.chart = chart; 
					json.title = title;
					json.subtitle = subtitle;
					json.xAxis = xAxis;
					json.yAxis = yAxis;
					json.tooltip = tooltip;
					json.credits = credits;
					json.series = series;
					json.plotOptions = plotOptions;
					$('#container_month_chart').highcharts(json);
				}
			},
			error : function() {// alert("fail");
			}
		});
	};
	//条形图
	function MonthInDayCountBar(currentTime){
		var uid=$("#uid").val();
		var day=howDay(currentTime);//是28，还是29，还是30，还是31
		var arr=howArr(day);//x轴的坐标构建
		$.ajax({
			url : "/financialManage/shouzhiRecord/MonthInDayCount.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				if(data.spends.length==0&&data.incomes.length==0){
					//清空原有的元素
					$("#container_month_chart").empty();
					var ele=$("<span></span>").append(currentTime+"收支信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart");
					return;
				}
				else{
					var chart = {
						      type: 'bar'
					};
					var title = {
						text : currentTime + '收支情况'
					};
					var subtitle = {
						text : ''
					};
					// x坐标轴
					var xAxis = {
						categories : arr,
						title: {
							      text: '天数(天)'
							   }
					};
					// y坐标轴
					var yAxis = {
						  min: 0,
					      title: {
					         text : '人民币(元)',
					         align: 'high'
					      },
					      labels: {
					         overflow: 'justify'
					      }
					};
	
					// 提示框
					 var tooltip = {
						      valueSuffix: ' 元'
					 };
					 // 图例
					 var legend = {
						      layout: 'vertical',
						      align: 'right',
						      verticalAlign: 'top',
						      x: -40,
						      y: 100,
						      floating: true,
						      borderWidth: 1,
						      backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
						      shadow: true
					};
				// 数据带有标签
				 var plotOptions = {
					      bar: {
					         dataLabels: {
					            enabled: true
					         }
					      }
				 };
					// 版权信息
					var credits = {
						text : 'financialCount.com'
					};
					// 创建 数据列series
					// 收入数组
					var incomeArray=dayIncomeArrayNull(day,data);
					var spendArray=daySpendsArrayNull(day,data);
					
					var series = [ {
						name : '收入',
						data : incomeArray,
						color : '#FF6666'
					}, {
						name : '支出',
						data : spendArray,
						color : '#7CB5EC'
					} ];
					var json = {};
					json.chart = chart; 
					json.title = title;
					json.subtitle = subtitle;
					json.xAxis = xAxis;
					json.yAxis = yAxis;
					json.tooltip = tooltip;
					json.legend = legend;
					json.credits = credits;
					json.series = series;
					json.plotOptions = plotOptions;
					$('#container_month_chart').highcharts(json);
					}
			},
			error : function() {
				// alert("fail");
			}
		});
	};
	//面积图
	function MonthInDayCountArea(currentTime){
		var uid=$("#uid").val();
		var day=howDay(currentTime);//是28，还是29，还是30，还是31
//		var arr=howArr(day);//x轴的坐标构建
		$.ajax({
			url : "/financialManage/shouzhiRecord/MonthInDayCount.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				if(data.spends.length==0&&data.incomes.length==0){
					//清空原有的元素
					$("#container_month_chart").empty();
					var ele=$("<span></span>").append(currentTime+"收支信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart");
					return;
				}
				else{
					var chart={
					            type: 'area'
					        };
			        var title={
			            text:currentTime+ '收支情况'
			        };
			        var subtitle={
			            text: '基础面积图'
			        };
			        var xAxis={
			        	title : {
								text : '天数(天)'
							},
			            allowDecimals: false,
			            labels: {
			                formatter: function () {
			                    return this.value; 
			                }
			            }
			        };
			        var yAxis={
			            title: {
			                text: '人民币(元)'
			            },
			            labels: {
			                formatter: function () {
			                    return this.value+"元";
			                }
			            }
			        };
			        var tooltip={
			            pointFormat: '{series.name}金额 <b>{point.y:,.0f}</b>元'
			        };
			        var plotOptions={
			            area: {
			                pointStart:1,//天数
			                marker: {
			                    enabled: false,
			                    symbol: 'circle',
			                    radius: 2,
			                    states: {
			                        hover: {
			                            enabled: true
			                        }
			                    }
			                }
			            }
			        };
			        // 创建 数据列series
					// 收入数组
					var incomeArray=dayIncomeArrayZero(day,data);
					var spendArray=daySpendsArrayZero(day,data);
			      
			        var series=[{
			            name: '收入',
			            data: incomeArray,
			            color : '#FF6666'
			        }, {
			            name: '支出',
			            data: spendArray,
			            color : '#7CB5EC'
			        }];
					
					var json = {};
					json.chart = chart; 
					json.title = title;
					json.subtitle = subtitle;
					json.xAxis = xAxis;
					json.yAxis = yAxis;
					json.tooltip = tooltip;
					json.series = series;
					json.plotOptions = plotOptions;
					$('#container_month_chart').highcharts(json);
				}
			},
			error : function() {
				alert("fail");
			}
		});
	};
	//金字塔型图
	function MonthInDayCountColumnKing(currentTime){
		var uid=$("#uid").val();
		var day=howDay(currentTime);//是28，还是29，还是30，还是31
		var arr=howArr(day);//x轴的坐标构建
		$.ajax({
			url : "/financialManage/shouzhiRecord/MonthInDayCount.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				if(data.spends.length==0&&data.incomes.length==0){
					//清空原有的元素
					$("#container_month_chart").empty();
					var ele=$("<span></span>").append(currentTime+"收支信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart");
					return;
				}
				else{
					var chart={
			                type: 'bar'
			         };
					var title = {
						text : currentTime + '收支情况'
					};
					var subtitle = {
						text : ''
					};
					// x坐标轴
					var xAxis = [{
						categories : arr,
						reversed: false,
						
						labels: {
			                    step: 2
			                }
						},{ 
		                    opposite: true,
		                    reversed: false,
		                    categories: arr,
		                    linkedTo: 0,
		                    labels: {
		                        step: 2
				             }
					}];
					
					// 提示框
					var tooltip = {
				      formatter: function () {
		                    return '<b>第' + this.point.category + '天</b><br/>' +
		                        '金额: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
		                }
					};
					// 数据带有标签
					var plotOptions = {
						series: {
				                    stacking: 'normal'
				                }
				       //设置间距！！！！！！！！！！！！！！！！！！【金字塔图】  --通过容器div来进行设置！！！！
					};
					// 版权信息
					var credits = {
						text : 'financialCount.com'
					};
	

					// 创建 数据列series
					// 收入数组
					var incomeArray = new Array(day);
					// 收入--初始化
					for (var i = 0; i < incomeArray.length; i++) {
						incomeArray[i] = null;
					}
					// 将json中的值赋值到相应的数组中
					if (data.incomes != null) {
						for (var i = 0; i < data.incomes.length; i++) {
							var a = data.incomes[i].dayName - 1;// 天所在下标
							incomeArray[a] = data.incomes[i].moneyName;
						}
					}
					// 支出数组
					var spendArray = new Array(day);
					// 支出 -- 初始化
					for (var i = 0; i < spendArray.length; i++) {
						spendArray[i] = null;
					}
					if (data.spends != null) {
						for (var i = 0; i < data.spends.length; i++) {
							var a = data.spends[i].dayName - 1;// 天所在下标
							spendArray[a] = data.spends[i].moneyName;//支出也为负数形式表现！！！
						}
					}
			
					// 将json中的值赋值到相应的数组中
					var maxValue=0;//收入最大
					var minValue=0;//支出最大
					var allMax=0;//总的最大
		
					if (data.incomes != null) {
						//计算收入最大值
						for (var i = 0; i < data.incomes.length; i++) {
							if(data.incomes[i].moneyName>=maxValue){
								maxValue=data.incomes[i].moneyName;
							}
						}
					}
					if (data.spends != null) {
						//计算收入最大值
						for (var i = 0; i < data.spends.length; i++) {
							if(data.spends[i].moneyName>=minValue){
								minValue=data.spends[i].moneyName;
							}
						}
					}
					if(maxValue>=minValue){
						allMax=maxValue;
					}
					else{
						allMax=minValue;
					}
					// y坐标轴
					var yAxis = {
					 title: {
		                    text: null
		                },
		                labels: {
		                    formatter: function () {
		                        return (Math.abs(this.value)) + '元';
		                    }
		                },
		                min: -allMax,
		                max: allMax
					};
					var series = [ {
						name : '收入',
						data : incomeArray,
						color : '#FF6666'
					}, {
						name : '支出',
						data : spendArray,
						color : '#7CB5EC'
					} ];
					var json = {};
					json.chart = chart; 
					json.title = title;
					json.subtitle = subtitle;
					json.xAxis = xAxis;
					json.yAxis = yAxis;
					json.tooltip = tooltip;
					json.credits = credits;
					json.series = series;
					json.plotOptions = plotOptions;
//					$("#container_month_chart").attr("style","height:500px;");
					$('#container_month_chart').highcharts(json);
				}
			},
			error : function() {
			}
		});
	};
	//雷达图
	function MonthInCategoryCountRadarMap(currentTime){
		var uid=$("#uid").val();
		var day=howDay(currentTime);//是28，还是29，还是30，还是31
		var arr=howArr(day);//x轴的坐标构建
		$.ajax({
			url : "/financialManage/shouzhiRecord/MonthInDayCount.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				if(data.spends.length==0&&data.incomes.length==0){
					//清空原有的元素
					$("#container_month_chart").empty();
					var ele=$("<span></span>").append(currentTime+"收支信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart");
					return;
				}
				else{
					// 创建 数据列series
					// 收入数组
					var incomeArray=dayIncomeArrayZero(day,data);
					var spendArray=daySpendsArrayZero(day,data);
					  $('#container_month_chart').highcharts({
					        chart: {
					            polar: true,
					            type: 'line'
					        },
					        title: {
					            text: currentTime + '收支情况',
					            x: -80
					        },
					        pane: {
					            size: '95%'
					        },
					        xAxis: {
					            categories: arr,
					            tickmarkPlacement: 'on',
					            lineWidth: 0
					        },
					        yAxis: {
					            gridLineInterpolation: 'polygon',
					            lineWidth: 0,
					            min: 0
					        },
					        tooltip: {
					            shared: true,
					            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}元</b><br/>'
					        },
					        legend: {
					            align: 'right',
					            verticalAlign: 'top',
					            y: 70,
					            layout: 'vertical'
					        },
					        series: [{
					            name: '收入',
					            data: incomeArray,
					            pointPlacement: 'on'
					        }, {
					            name: '支出',
					            data: spendArray,
					            pointPlacement: 'on'
					        }]
					    });
				}
			},
			error : function() {// alert("fail");
			}
		});
	};
	//综合图
	function MonthInCategoryCountAllKind(currentTime){
		var uid=$("#uid").val();
		var day=howDay(currentTime);//是28，还是29，还是30，还是31
		var arr=howArr(day);//x轴的坐标构建
		$.ajax({
			url : "/financialManage/shouzhiRecord/MonthInDayCount.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				if(data.spends.length==0&&data.incomes.length==0){
					//清空原有的元素
					$("#container_month_chart").empty();
					var ele=$("<span></span>").append(currentTime+"收支信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart");
					return;
				}
				else{
					// 创建 数据列series
					// 收入数组
					var incomeArray=dayIncomeArrayZero(day,data);
					var spendArray=daySpendsArrayZero(day,data);
					
					//计算平均值
					var average=[];//平局值
					for (var i = 0; i < arr.length; i++) {
						average[i]=(spendArray[i]+incomeArray[i])/2;
					}
					
					//计算收支总额
					var dataList=[];
					var spendAll=0;
					for(var i=0;i<data.spends.length;i++){
						spendAll+=-data.spends[i].moneyName;//确保为正数
					}
//					alert("spendAll:"+spendAll);
				
					var incomeAll=0;
					for(var i=0;i<data.incomes.length;i++){
						incomeAll+=data.incomes[i].moneyName;
					}
//					alert("incomeAll:"+incomeAll);
					dataList.push({'name':"收入",'y':incomeAll,'color':Highcharts.getOptions().colors[0]});
					dataList.push({'name':"支出",'y':spendAll,'color':Highcharts.getOptions().colors[1]});
					
					 $('#container_month_chart').highcharts({
					        title: {
					            text: currentTime+'收支综合占比图'
					        },
					        xAxis: {
					        	categories : arr
					        },
					        yAxis:{
			        	      title: {
			        	         text: '金额(元)'
			        	      }
					        }, 
					        plotOptions: {
					            series: {
					                stacking: 'normal'
					            }
					        },
					        labels: {
					            items: [{
					                html: '收支占比',
					                style: {
					                    left: '100px',
					                    top: '18px',
					                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
					                }
					            }]
					        },
					        series: [{
					            type: 'column',
					            name: '收入',
					            data: incomeArray//每天的收入
					        }, {
					            type: 'column',
					            name: '支出',
					            data: spendArray//每天的支出
					        }, {
					            type: 'spline',
					            name: '收支平均值',
					            data: average,//每天的收入，支出的平均值
					            marker: {
					                lineWidth: 2,
					                lineColor: Highcharts.getOptions().colors[3],
					                fillColor: 'white'
					            }
					        }, {
					            type: 'pie',
					            name: '总的金额(元)',
					            data: dataList,
					            center: [100, 80],
					            size: 100,
					            showInLegend: false,
					            dataLabels: {
					                enabled: false
					            }
					        }]
					    });
					 
					
				}
			},
			error : function() {// alert("fail");
			}
		});
	};
	
	/*----------------------------------------------------------------------------------------------*/
	//饼图	--收入
	function MonthInCategoryCount(currentTime){
		var uid=$("#uid").val();
		$.ajax({
			url : "/financialManage/shouzhiRecord/monthInCategoryCountIncome.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				if(data.incomes.length==0){
					//清空原有的元素
					$("#container_month_chart_left").empty();
					var ele=$("<span></span>").append(currentTime+"收入信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart_left");
					return;
				}
				else{
					//覆盖现有元素！！！
					// 绘制饼图
					var chart = {
						plotBackgroundColor : null,
						plotBorderWidth : null,
						plotShadow : false
					};
					var title = {
						text : currentTime+' 各收入类别占有比例'
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
							},
						showInLegend: true//显示图例
						}
					};
					// 版权信息
					var credits = {
						text : 'financialCount.com'
					};
					//根据获得的数据
					var incomeArray=incomeArrayInMonthAndCategory(data);
					var series = [ {
						type : 'pie',//饼图
						name : '收入类别金额比例',
						data : incomeArray
					} ];
					var json = {};
					json.chart = chart;
					json.title = title;
					json.tooltip = tooltip;
					json.series = series;
					json.plotOptions = plotOptions;
					json.credits=credits;
					$('#container_month_chart_left').highcharts(json);
				}
			},
			error : function() {// alert("fail");
			}
		});
	};
	//饼图 --支出
	function MonthInCategoryCountSpends(currentTime){
		var uid=$("#uid").val();
		$.ajax({
			url : "/financialManage/shouzhiRecord/monthInCategoryCountSpend.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				if(data.spends.length==0){
					$("#container_month_chart_right").empty();//清空原有的元素
					var ele=$("<span></span>").append(currentTime+"支出信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart_right");
					return;
				}
				else{
					// 绘制饼图
					var chart = {
						plotBackgroundColor : null,
						plotBorderWidth : null,
						plotShadow : false
					};
					var title = {
						text : currentTime+' 各支出类别占有比例'
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
							},
						showInLegend: true//显示图例
						}
					};
					// 版权信息
					var credits = {
						text : 'financialCount.com'
					};
					//根据获得的数据
					var spendArray=spendArrayInMonthAndCategory(data);
					var series = [ {
						type : 'pie',//饼图
						name : '支出类别金额比例',
						data : spendArray
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
			},
			error : function() {// alert("fail");
			}
		});
	};
	//圆环图--支出 
	function MonthInCategoryCountPieCircleRoundSpend(currentTime){
		var uid=$("#uid").val();
		$.ajax({
			url : "/financialManage/shouzhiRecord/monthInCategoryCountSpend.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				if(data.spends.length==0){
					$("#container_month_chart_right").empty();//清空原有的元素
					var ele=$("<span></span>").append(currentTime+"支出信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart_right");
					return;
				}
				else{
					var spendArray =[];//外面的数组
					//计算收入的总额
					var allMoney=0;
					for(var i=0;i<data.spends.length;i++){
						allMoney=data.spends[i].moneyName;
					}
					for(var i=0;i<data.spends.length;i++){
						if(i==0){
							//默认是选中状态
							var a={'name': data.spends[i].categoryName,'y': data.spends[i].moneyName/allMoney,'sliced': true,'selected': true};
							spendArray.push(a);
						}
						else{
							spendArray.push([data.spends[i].categoryName,data.spends[i].moneyName/allMoney]);
						}
					}
					//绘图
					$('#container_month_chart_right').highcharts({
				        chart: {
				            plotBackgroundColor: null,
				            plotBorderWidth: null,
				            plotShadow: false,
//				            spacing : [100, 0 , 40, 0]
				        },
				        title: {
				            floating:true,
				            text: currentTime+'各支出类别<br/>占有比例'
				        },
				        tooltip: {
				            pointFormat: data.spends[0].categoryName+': <b>'+ (data.spends[0].moneyName/allMoney).toFixed(2)+'%</b>'
				        },
				        plotOptions: {
				            pie: {
				                allowPointSelect: true,
				                cursor: 'pointer',
				                dataLabels: {
				                    enabled: true,
				                    //消费类型，消费金额的百分比【保留两位小数】
				                    format: '<b>{point.name}</b>: {point.percentage:.2f} %',
				                    style: {
				                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
				                    }
				                },
				                point: {
				                },
				            }
				        },
				        series: [{
				            type: 'pie',
				            innerSize: '80%',
				            name: '消费金额',
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
				}
			},
			error : function() {// alert("fail");
			}
		});
	};
	//圆环图--收入
	function MonthInCategoryCountPieCircleRoundIncome(currentTime){
		var uid=$("#uid").val();
		$.ajax({
			url : "/financialManage/shouzhiRecord/monthInCategoryCountIncome.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				if(data.incomes.length==0){
					//清空原有的元素
					$("#container_month_chart_left").empty();
					var ele=$("<span></span>").append(currentTime+"收入信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart_left");
					return;
				}
				else{
					var incomeArray =[];//外面的数组
					//计算收入的总额
					var allMoney=0;
					for(var i=0;i<data.incomes.length;i++){
						allMoney=data.incomes[i].moneyName;
					}
					for(var i=0;i<data.incomes.length;i++){
						if(i==0){
							//默认是选中状态
							var a={'name': data.incomes[i].categoryName,'y': data.incomes[i].moneyName/allMoney,'sliced': true,'selected': true};
							incomeArray.push(a);
						}
						else{
							incomeArray.push([data.incomes[i].categoryName,data.incomes[i].moneyName/allMoney]);
						}
					}
					//绘图
					$('#container_month_chart_left').highcharts({
				        chart: {
				            plotBackgroundColor: null,
				            plotBorderWidth: null,
				            plotShadow: false,
//				            spacing : [100, 0 , 40, 0]
				        },
				        title: {
				            floating:true,
				            text: currentTime+'各收入类别<br/>占有比例'
				        },
				        tooltip: {
				            pointFormat: data.incomes[0].categoryName+': <b>'+ (data.incomes[0].moneyName/allMoney).toFixed(2)+'%</b>'
				        },
				        plotOptions: {
				            pie: {
				                allowPointSelect: true,
				                cursor: 'pointer',
				                dataLabels: {
				                    enabled: true,
				                    //收入类型，收入金额的百分比【保留两位小数】
				                    format: '<b>{point.name}</b>: {point.percentage:.2f} %',
				                    style: {
				                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
				                    }
				                },
				                point: {
				                },
				            }
				        },
				        series: [{
				            type: 'pie',
				            innerSize: '80%',
				            name: '收入金额',
				            data: incomeArray
				        }]
				    }, function(c) {
				        // 环形图圆心
				        var centerY = c.series[0].center[1],
				            titleHeight = parseInt(c.title.styles.fontSize);
				        c.setTitle({
				            y:centerY + titleHeight/2
				        });
				        chart = c;
				    }
				);
			  }
			},
			error : function() {// alert("fail");
			}
		});
	};
	//扇形图--收入
	function MonthInCategoryCountPieShanIncome(currentTime){
		var uid=$("#uid").val();
		$.ajax({
			url : "/financialManage/shouzhiRecord/monthInCategoryCountIncome.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				if(data.incomes.length==0){
					//清空原有的元素
					$("#container_month_chart_left").empty();
					var ele=$("<span></span>").append(currentTime+"收入信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart_left");
					return;
				}
				else{
					var chart = {
							plotBackgroundColor : null,
							plotBorderWidth : null,
							plotShadow : false
					};
					var title = {
						text : currentTime+' 各收入类别<br>占有比例',
						align: 'center',
			            verticalAlign: 'middle',
			            y: 50
					};
					var tooltip={
				            headerFormat: '{series.name}<br>',
				            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
				    };
				    var plotOptions={
			            pie: {
			                dataLabels: {
			                    enabled: true,
			                    distance: -50,
			                    style: {
			                        fontWeight: 'bold',
			                        color: 'white',
			                        textShadow: '0px 1px 2px black'
			                    }
			                },
			                startAngle: -90,
			                endAngle: 90,
			                center: ['50%', '75%']
			            }
				     };
					// 版权信息
					var credits = {
						text : 'financialCount.com'
					};
					//数据
					var incomeArray=incomeArrayInMonthAndCategory(data);
					var series = [ {
						type : 'pie',//饼图
						name : '收入类别金额比例',
						innerSize: '50%',
						//数组里面放的还是数组
						data : incomeArray
					} ];

					var json = {};
					json.chart = chart;
					json.title = title;
					json.tooltip = tooltip;
					json.series = series;
					json.plotOptions = plotOptions;
					json.credits=credits;
					$('#container_month_chart_left').highcharts(json);
				}
			},
			error : function() {// alert("fail");
			}
		});	
				
	};
	//扇形图--支出
	function MonthInCategoryCountPieShanSpend(currentTime){
		var uid=$("#uid").val();
		$.ajax({
			url : "/financialManage/shouzhiRecord/monthInCategoryCountSpend.action",
			type : "get",
			data : "currentTime=" + currentTime+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				if(data.spends.length==0){
					$("#container_month_chart_right").empty();//清空原有的元素
					var ele=$("<span></span>").append(currentTime+"支出信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_month_chart_right");
					return;
				}
				else{
					var chart = {
							plotBackgroundColor : null,
							plotBorderWidth : null,
							plotShadow : false
					};
					var title = {
						text : currentTime+' 各支出类别<br>占有比例',
						align: 'center',
			            verticalAlign: 'middle',
			            y: 50
					};
					var tooltip={
				            headerFormat: '{series.name}<br>',
				            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
				    };
				    var plotOptions={
			            pie: {
			                dataLabels: {
			                    enabled: true,
			                    distance: -50,
			                    style: {
			                        fontWeight: 'bold',
			                        color: 'white',
			                        textShadow: '0px 1px 2px black'
			                    }
			                },
			                startAngle: -90,
			                endAngle: 90,
			                center: ['50%', '75%']
			            }
				     };
					// 版权信息
					var credits = {
						text : 'financialCount.com'
					};
					//数据
					var spendArray=spendArrayInMonthAndCategory(data);
					var series = [ {
						type : 'pie',//饼图
						name : '支出类别金额比例',
						innerSize: '50%',
						data : spendArray
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
			},
			error : function() {// alert("fail");
			}
		});	
	};
});