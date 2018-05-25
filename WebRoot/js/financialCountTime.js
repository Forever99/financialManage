$(function() {
	// 点击显示 YYYY-MM-DD年月格式
	
	//这里是日期联动的关键        
	function endDates() {
	    //将结束日期的事件改成 false 即可
	    end.trigger = false;
	    $("#dayInputEnd").jeDate(end);
	}
	
	//开始时间
	var start = {
		    format: 'YYYY-MM-DD',
		    minDate: '2014-06-16 23:59:59', //设定最小日期为当前日期
		    isinitVal:true,//初始值
		    maxDate: $.nowDate({DD:0}), //最大日期
//		    choosefun:function(obj){
//		    	alert("你好："+obj.val);
////		    	end.minDate =$('#dayInputStart').val();
//		        end.minDate = obj.val; //开始日选好后，重置结束日的最小日期
//		        endDates();
//		    },
		    okfun: function(val){
		        end.minDate = obj.val; //开始日选好后，重置结束日的最小日期
		        endDates();
		   }
	};
	
	//结束时间
	var end = {
	    format: 'YYYY-MM-DD',
	    minDate: $.nowDate({DD:0}), //设定最小日期为当前日期
	    maxDate: '2099-06-16 23:59:59', //最大日期
//	    choosefun:function(obj){
//	    	start.maxDate = obj.val; //将结束日的初始值设定为开始日的最大日期
////	    	start.maxDate = obj.val; //将结束日的初始值设定为开始日的最大日期
//	    },
	    okfun: function(obj){
	        start.maxDate = obj.val; //将结束日的初始值设定为开始日的最大日期
	    }
	};
	
	$('#dayInputStart').jeDate(start);
	$('#dayInputEnd').jeDate(end);
	
//	$.jeDate('#dayInputStart',start);
//	$.jeDate('#dayInputEnd',end);
/*--------------------------------------------------------------------------------------------*/
	
	// financialCount页面加载时，进行绘制时间统计的表
	$(window).load(function() {
		var start=null;
		var end=null;
		//默认开始时间
		var year=new Date().getFullYear();//年
		var month=new Date().getMonth()+1;//月
		//上一个月的数据
		if(month==1){
			year=year-1;
			start=year+"-12"+"-01";
			end=year+"-12"+"-31";
		}
		else{
			month=month-1;
			var day=howDay(month,year);
			start=year+"-"+month+"-01";
			end=year+"-"+month+"-"+day;
		}

		var chartName="柱形图";
		//折线图
		dayInTimeCount(start,end,chartName);
		//回显时间
//		$('#dayInputStart').val(start);
//		$('#dayInputEnd').val(end);
		
	});
	
	//判断该月是有28，或是29，或是30，或是31天。
	function howDay(month,year){
		month=parseInt(month);//String-->number
		switch(month){//通过月份
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
			  if(year%400==0||(year%4==0&&year%100!=0)){
				  day=29;//29天【闰年】
			  }
			  else{
				  day=28;//28天【平年】
			  }
			  break;
		}
		return day;
	}
	
	
	//点击时，进行查询
	$("#daySelect").click(function() {
		var start=$('#dayInputStart').val();
		var end=$('#dayInputEnd').val();
		var chartName=$('#timeChart').val();//图类型
		
		//为空时，获得系统时间
		if (start == null ||start==""|| end == null||end=="") {
			alert("请输入起止时间");
			return false;
		}
		//生成对应类型的图
		dayInTimeCount(start,end,chartName);
//		$("#chooseInput").val(start,end,data);
		return true;
	});
	
	/*-------------------------------------------------------------------------------*/
	//每天收入类型参数构造【初始值为0时】
	function dayIncomeArrayZero(data){
		var incomeArray = new Array(data.incomes.length);
		// 收入--初始化
		for (var i = 0; i < incomeArray.length; i++) {
			incomeArray[i] = 0;
		}
		// 将json中的值赋值到相应的数组中
		if (data.incomes != null) {
			for (var i = 0; i < data.incomes.length; i++) {
				incomeArray[i] = data.incomes[i].moneyName;
			}
		}
		return incomeArray;
	}
	
	//每天收入类型参数构造【初始值为null时】
	function dayIncomeArrayNull(data){
		var incomeArray = new Array(data.incomes.length);
		// 收入--初始化
		for (var i = 0; i < incomeArray.length; i++) {
			incomeArray[i] = null;
		}
		// 将json中的值赋值到相应的数组中
		if (data.incomes != null) {
			for (var i = 0; i < data.incomes.length; i++) {
				incomeArray[i] = data.incomes[i].moneyName;
			}
		}
		return incomeArray;
	}
	//每天支出类型参数构造【初始值为0时】
	function daySpendsArrayZero(data){
		// 支出数组
		var spendArray = new Array(data.spends.length);
		// 支出 -- 初始化
		for (var i = 0; i < spendArray.length; i++) {
			spendArray[i] = 0;
		}
		if (data.spends != null) {
			for (var i = 0; i < data.spends.length; i++) {
				spendArray[i] = -data.spends[i].moneyName;//支出也为整数形式表现
			}
		}
		return spendArray;
	}
	//每天支出类型参数构造【初始值为null时】
	function daySpendsArrayNull(data){
		// 支出数组
		var spendArray = new Array(data.spends.length);
		// 支出 -- 初始化
		for (var i = 0; i < spendArray.length; i++) {
			spendArray[i] = null;
		}
		if (data.spends != null) {
			for (var i = 0; i < data.spends.length; i++) {
				spendArray[i] = -data.spends[i].moneyName;//支出也为整数形式表现
			}
		}
		return spendArray;
	}
//	-------------------------------------------------------------------------------
	//计算各种收入类型在，在总金额中的比例
	function incomeArrayInTimeAndCategory(data){
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
	//计算各种支出类型在，在总金额中的比例
	function spendArrayInTimeAndCategory(data){
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
	function incomesNull(start,end){//空值时，清空输入原有的元素
		//清空原有的元素
		$("#container_day_chart_left").empty();
		var ele=$("<span></span>").append(start+"至"+end+"收入信息为空").attr("style","font-size:30px;color:red;");
		ele.appendTo("#container_day_chart_left");
		return;
	};

	function spendsNull(start,end){//空值时，清空支出原有的元素
		
		$("#container_day_chart_right").empty();
		var ele=$("<span></span>").append(start+"至"+end+"支出信息为空").attr("style","font-size:30px;color:red;");
		ele.appendTo("#container_day_chart_right");
		return;
	};
	/*-------------------------------------------------------------------------------*/
	//收入坐标轴构建
	function xyAxisIncomeCreate(data){
		var arr=[];
		for(var i=0;i<data.incomes.length;i++){
			arr[i]=data.incomes[i].categoryName;
		}
		return arr;
	};
	//支出坐标轴构建
	function xyAxisSpendsCreate(data){
		var arr=[];
		for(var i=0;i<data.spends.length;i++){
			arr[i]=data.spends[i].categoryName;
		}
		return arr;
	};
	/*-------------------------------------------------------------------------------*/
	
	// 绘制时间段统计报表【折线图】
	function dayInTimeCount(start,end,chartName) {
		var uid=$("#uid").val();
//		alert(uid+"success11");
		$.ajax({
			url : "/financialManage/shouzhiRecord/dayInTimeCount.action",
			type : "get",
			data : "start=" + start+"&end="+end+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
//				alert("success");
				//根据不同的图类型，生成不同的图表
				if(chartName=="柱形图"){
					dayInTimeCountColumnIncomes(start,end,data);//柱形图
					dayInTimeCountColumnSpends(start,end,data);//柱形图
				}
				else if(chartName=="折线图"){
//					alert("success11");
					dayInTimeCountLineIncomes(start,end,data);
					dayInTimeCountLineSpends(start,end,data);
				}
				else if(chartName=="饼图"){
					dayInTimeCountPieIncomes(start,end,data);//饼图	--收入
					dayInTimeCountPieSpends(start,end,data);//饼图 --支出
				}
				else if(chartName=="条形图"){
					dayInTimeCounBarIncomes(start,end,data);//条形图
					dayInTimeCounBarSpends(start,end,data);
				}
				else if(chartName=="圆环图"){
					dayInTimeCountPieCircleRoundIncomes(start,end,data);//收入
					dayInTimeCountPieCircleRoundSpends(start,end,data);//支出 
				}
				else{//扇形图  chartName=="扇形图"
					dayInTimeCountPieShanIncomes(start,end,data);//收入
					dayInTimeCountPieShanSpends(start,end,data);//支出
				}
			},
			error : function() {// alert("fail");
			}
		});
	}
	
	//收入折线图绘制
	function dayInTimeCountLineIncomes(start,end,data){
		if(data.incomes.length==0){
			incomesNull(start,end);//空值提醒
		}
		else{
			var arr=xyAxisIncomeCreate(data);//收入坐标轴构建
			var title = {
				text : start+"至"+end + '收入情况'
			};
			var subtitle = {
				text : ''
			};
			// x坐标轴
			var xAxis = {
				categories :arr//收入坐标构建
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
			var incomeArray=dayIncomeArrayZero(data);	
//			alert(incomeArray);
//			alert(arr);
			var series = [ {
				name : '收入',
				data : incomeArray,
				color : '#FF6666'
			}];
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
			$('#container_day_chart_left').highcharts(json);
			return;
		}
	};
	
	//支出折线图绘制
	function dayInTimeCountLineSpends(start,end,data){
		if(data.spends.length==0){
			spendsNull(start,end);//空值提醒
		}
		else{
			var arr=xyAxisSpendsCreate(data);//支出坐标轴构建
			var title = {
				text : start+"至"+end + '支出情况'
			};
			var subtitle = {
				text : ''
			};
			// x坐标轴
			var xAxis = {
				categories :arr//支出坐标构建
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
			// 支出数组
			var spendArray=daySpendsArrayZero(data);
			var series = [ {
				name : '支出',
				data : spendArray,
				color : '#FF6666'
			}];
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
			$('#container_day_chart_right').highcharts(json);
		}
	};
	
	
	
	//柱形图--收入
	function dayInTimeCountColumnIncomes(start,end,data){
		// alert("success");
		if(data.incomes.length==0){
			incomesNull(start,end);//清空元素
		}
		else
		{
			var chart = {
				  type: 'column'
			};
			var title = {
				text :start+"至"+end+ '收入情况'
			};
			var subtitle = {
				text : ''
			};
			var arr=xyAxisIncomeCreate(data);//收入坐标轴构建
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
			var incomeArray=dayIncomeArrayNull(data);
			var series = [ {
				name : '收入',
				data : incomeArray,
				color : '#25C6FC'
			}];
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
			$('#container_day_chart_left').highcharts(json);
		}
	};
	//柱形图--支出
	function dayInTimeCountColumnSpends(start,end,data){
		if(data.spends.length==0){
			spendsNull(start,end);//空值提醒
		}
		else{
			 var chart = {
				  type: 'column'
			};
			var title = {
				text :start+"至"+end+ '支出情况'
			};
			var subtitle = {
				text : ''
			};
			var arr=xyAxisSpendsCreate(data);//支出坐标轴构建
//			alert(arr);
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
			// 支出数组
			var spendArray=daySpendsArrayNull(data);
			var series = [ {
				name : '支出',
				data : spendArray,
				color : '#25C6FC'
			}];
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
			$('#container_day_chart_right').highcharts(json);
		}
	};
	//饼图	--收入
	function dayInTimeCountPieIncomes(start,end,data){
		if(data.incomes.length==0){
			incomesNull(start,end);//空值提醒
		}
		else{
			var chart = {
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false
			};
			var title = {
				text : start+"至"+end+' 各收入类别占有比例'
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
			var incomeArray=incomeArrayInTimeAndCategory(data);//收入比例
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
			$('#container_day_chart_left').highcharts(json);
		}
	};
	//饼图 --支出
	function dayInTimeCountPieSpends(start,end,data){
		if(data.spends.length==0){
			spendsNull(start,end);//空值提醒
		}
		else{
			var chart = {
				plotBackgroundColor : null,
				plotBorderWidth : null,
				plotShadow : false
			};
			var title = {
				text : start+"至"+end+' 各支出类别占有比例'
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
			var spendArray=spendArrayInTimeAndCategory(data);//支出比例
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
			$('#container_day_chart_right').highcharts(json);
		}
	};
	//条形图--收入
	function dayInTimeCounBarIncomes(start,end,data){
		if(data.incomes.length==0){
			incomesNull(start,end);//空值提醒
		}
		else{
//			alert('bar');
			var arr=xyAxisIncomeCreate(data);//收入坐标轴构建
			var chart = {
				      type: 'bar'
			};
			var title = {
				text : start+"至"+end+ '收入情况'
			};
			var subtitle = {
				text : ''
			};
			// x坐标轴
			var xAxis = {
				categories : arr,
				title: {
					      text: '收入类型'
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
			var incomeArray=dayIncomeArrayNull(data);
//			alert(incomeArray);
			var series = [ {
				name : '收入',
				data : incomeArray,
				color : '#25C6FC'
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
			$('#container_day_chart_left').highcharts(json);
		}
	};
	//条形图--支出
	function dayInTimeCounBarSpends(start,end,data){
		if(data.spends.length==0){
			spendsNull(start,end);//空值提醒
		}
		else{
			var arr=xyAxisSpendsCreate(data);//支出坐标轴构建
			var chart = {
				      type: 'bar'
			};
			var title = {
				text : start+"至"+end+ '支出情况'
			};
			var subtitle = {
				text : ''
			};
			// x坐标轴
			var xAxis = {
				categories : arr,
				title: {
					      text: '支出类型'
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
			// 支出数组
			var spendArray=daySpendsArrayNull(data);
			var series = [ {
				name : '支出',
				data : spendArray,
				color : '#25C6FC'
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
			$('#container_day_chart_right').highcharts(json);
		}
	};
	
	//圆环图--收入
	function dayInTimeCountPieCircleRoundIncomes(start,end,data){
		if(data.incomes.length==0){
			incomesNull(start,end);//空值提醒
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
			$('#container_day_chart_left').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false,
//		            spacing : [100, 0 , 40, 0]
		        },
		        title: {
		            floating:true,
		            text: "  "+start+"至"+end+'<br/>各收入类别<br/>占有比例'
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
		            innerSize: '85%',
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
	};
	//圆环图--支出
	function dayInTimeCountPieCircleRoundSpends(start,end,data){
		if(data.spends.length==0){
			spendsNull(start,end);//空值提醒
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
			$('#container_day_chart_right').highcharts({
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false,
//		            spacing : [100, 0 , 40, 0]
		        },
		        title: {
		            floating:true,
		            text: start+"至"+end+'<br/>各支出类别<br/>占有比例'
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
		            innerSize: '85%',
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
	};
	//扇形图--收入
	function dayInTimeCountPieShanIncomes(start,end,data){
		if(data.incomes.length==0){
			incomesNull(start,end);//空值提醒
		}
		else{
			var chart = {
					plotBackgroundColor : null,
					plotBorderWidth : null,
					plotShadow : false
			};
			var title = {
				text : start+"至"+end+'<br/> 各收入类别占有比例',
			};
			var subtitle={
				text:"收入类别",
				align: 'center',
			    verticalAlign: 'middle',
			    y: 80  
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
			var incomeArray=incomeArrayInTimeAndCategory(data);//收入比例
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
			json.subtitle=subtitle;
			$('#container_day_chart_left').highcharts(json);
		}
	};
	//扇形图--支出
	function dayInTimeCountPieShanSpends(start,end,data){
		if(data.spends.length==0){
			spendsNull(start,end);//空值提醒
		}
		else{
			var chart = {
					plotBackgroundColor : null,
					plotBorderWidth : null,
					plotShadow : false
			};
			var title = {
				text : start+"至"+end+' <br>各支出类别占有比例',
				
			};
			var subtitle={
					text:"支出类别",
					align: 'center',
				    verticalAlign: 'middle',
				    y: 80  
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
			var spendArray=spendArrayInTimeAndCategory(data);//支出比例
			
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
			json.subtitle=subtitle;
			$('#container_day_chart_right').highcharts(json);
		}
	};

});