//document.write("<script language=javascript src='js/financialCount.js'></script>");
$(function() {
	// financialCount页面加载时，进行绘制年度统计的表
	$(window).load(function() {
		
		$("#demo").Calculadora();//计算器
		// 页面加载时，绘制统计图
		//系统当前时间
		var myDate = new Date();//获取当前的时间
		var year = myDate.getFullYear();//获取当前的年份
		$("#ymnian").val(year);
		//折线图
		yearInMonthCount(year);
	
	});

	// 点击显示 YYYY年格式
	$("#ymnian").jeDate({
		isinitVal : false,
		format : "YYYY"
	});

	// 绘制年度统计报表【折线图】
	// (1)进入页面 (2)搜索时间按钮
	/*$("#financialYearCount").click(function() {
		var year = $("#ymnian").val();//年的时间
		// alert("year:"+year);
		if (year == null || year == "") {
			year = 2018;
			yearInMonthCount(year);//折线图
		}
	});*/

	$("#yearSelect").click(function() {
		var year = $("#ymnian").val();//获得年份
		var chart=$("#YearChart").val();//获得图的类型
		// alert("year:"+year);
		//1、为空时，不查询
//		if (year == null || year == "") {
//			return false;
//		} 
//		else {//不为空时，进行查询
			if (year == null || year == "") {
				var myDate = new Date();//获取当前的时间
				var year2 = myDate.getFullYear();//获取当前的年份
				//设置当前年份
				year=year2;
			}
//			 alert("year:"+year);
			if(chart=="折线图"){
				$("#container_year_chart").show();
				yearInMonthCount(year);//折线图
				$("#container_year_chart_left").hide();
				$("#container_year_chart_right").hide();
			}
			else if(chart=="柱形图"){
				$("#container_year_chart").show();
				yearInMonthCountColumn(year);//柱形图
				$("#container_year_chart_left").hide();
				$("#container_year_chart_right").hide();
			}
			else if(chart=="饼图"){
				$("#container_year_chart_left").show();
				$("#container_year_chart_right").show();
				yearInCategoryCount(year);//饼图	--收入
				yearInCategoryCountSpends(year);//饼图 --支出
				$("#container_year_chart").hide();
			}
			else if(chart=="条形图"){
				$("#container_year_chart").show();
				yearInMonthCountBar(year);//条形图
				$("#container_year_chart_left").hide();
				$("#container_year_chart_right").hide();
			}
			else if(chart=="面积图"){
//				alert("面积图");
				$("#container_year_chart").show();
				yearInMonthCountArea(year);//面积图
				$("#container_year_chart_left").hide();
				$("#container_year_chart_right").hide();
			}
			else if(chart=="金字塔形图"){
				$("#container_year_chart").show();
				yearInMonthCountColumnKing(year);
				$("#container_year_chart_left").hide();
				$("#container_year_chart_right").hide();
			}
			else if(chart=="圆环图"){
				$("#container_year_chart_left").show();
				$("#container_year_chart_right").show();
				yearInCategoryCountPieCircleRoundSpend(year);//支出 【存在bug】
				yearInCategoryCountPieCircleRoundIncome(year);//收入
				
				$("#container_year_chart").hide();
			}
			else if(chart=="雷达图"){
				$("#container_year_chart").show();
				yearInCategoryCountRadarMap(year);
				$("#container_year_chart_left").hide();
				$("#container_year_chart_right").hide();
			}
			else if(chart=="综合图"){
				$("#container_year_chart").show();
				yearInCategoryCountAllKind(year);
				$("#container_year_chart_left").hide();
				$("#container_year_chart_right").hide();
			}
			else{//扇形图  chart=="扇形图"
				$("#container_year_chart_left").show();
				$("#container_year_chart_right").show();
				yearInCategoryCountPieShanIncome(year);//收入
				yearInCategoryCountPieShanSpend(year);//支出
				$("#container_year_chart").hide();
			}
			$("#ymnian").val(year);
			// alert("执行完毕");
			return true;
//		}
	});
	
/*--------------------------------------------------------------------------------------------*/	
	// 绘制年度统计报表【折线图】
	function yearInMonthCount(year) {
		// alert("hahaha");
		var uid=$("#uid").val();
		$.ajax({
			url : "/financialManage/shouzhiRecord/yearInMonthCount.action",
			type : "get",
			data : "year=" + year+"&uid="+uid,
//			data : "year=" + year+"&uid=${sessionScope.user.uid}",
			// datatType:"json",//打错了
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				// alert("success");
//				alert(data.spends.length+":"+data.incomes.length);
				if(data.spends.length==0&&data.incomes.length==0){
					//清空原有的元素
					$("#container_year_chart").empty();
					var ele=$("<span></span>").append(year+"年收支信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_year_chart");
					return;
				}
				else{
					var title = {
						text : year + '年度收支情况'
					};
					var subtitle = {
						text : ''
					};
					// x坐标轴
					var xAxis = {
						categories : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月',
								'八月', '九月', '十月', '十一月', '十二月' ]
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
					var incomeArray = new Array(12);
					// 支出数组
					var spendArray = new Array(12);
					// 收入--初始化
					for (var i = 0; i < incomeArray.length; i++) {
						incomeArray[i] = 0;
//						incomeArray[i] = null;
					}
					// alert("收入长度length:"+data.incomes.length);
					// 将json中的值赋值到相应的数组中
					if (data.incomes != null) {
						for (var i = 0; i < data.incomes.length; i++) {
							var a = data.incomes[i].monthName - 1;// 月份所在下标
							incomeArray[a] = data.incomes[i].moneyName;
						}
					}
	
					// 支出 -- 初始化
					for (var i = 0; i < spendArray.length; i++) {
						spendArray[i] = 0;
//						spendArray[i] = null;
					}
					if (data.spends != null) {
						for (var i = 0; i < data.spends.length; i++) {
							var a = data.spends[i].monthName - 1;// 月份所在下标
							spendArray[a] = data.spends[i].moneyName;
						}
					}
					// alert("支出:"+spendArray+" 收入:"+incomeArray);
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
	
					$('#container_year_chart').highcharts(json);
				}
			},
			error : function() {
				// alert("fail");
			}
		});
	}
	
/*--------------------------------------------------------------------------------------------*/	
	// 绘制年度统计报表【饼图】   收入
	function yearInCategoryCount(year) {
		var uid=$("#uid").val();
//		alert(uid);
//		alert("饼图："+year);
		$.ajax({
				url : "/financialManage/shouzhiRecord/yearInCategoryCount.action",
				type : "get",
				data : "year=" + year+"&uid="+uid,
//				data : "year=" + year,
				dataType : "json",// 返回时的数据类型json
				success : function(data) {
//					 alert("success");
					if(data.incomes.length==0){
						//清空原有的元素
						$("#container_year_chart_left").empty();
						var ele=$("<span></span>").append(year+"年收入信息为空").attr("style","font-size:30px;color:red;");
						ele.appendTo("#container_year_chart_left");
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
							text : year+' 年各收入类别占有比例'
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
						//根据获得的数据进行
						//"incomes":[{"categoryName":0,"moneyName":973,"monthName":3},{"categoryName":0,"moneyName":223,"monthName":4}]
	//					var incomeArray = new Array();//外面的数组   //错误
						var incomeArray =[];//外面的数组
						//计算收入的总额
						var allMoney=0;
						for(var i=0;i<data.incomes.length;i++){
							allMoney+=data.incomes[i].moneyName;
						}
	//					alert("allMoney:"+allMoney);
	//					alert(data.incomes[0].categoryName);
						for(var i=0;i<data.incomes.length;i++){
							//alert(data.incomes[i].categoryName);
							//错误
							//incomeArray.push([data.incomes[i].categoryName,data.incomes[i].moneyName/allMoney]);
							incomeArray.push([data.incomes[i].categoryName,data.incomes[i].moneyName/allMoney]);
	//						incomeArray.push([data.incomes[i].categoryName,data.incomes[i].moneyName]);
							
							/*var sonArray=new Array(2);//里面的数组
							if(i==data.incomes.length-1){
								 var str={'name':data.incomes.categoryName,'y':data.incomes.moneyName/allMoney, 
								          'sliced': true,'selected': true};
								 var str2={name:data.incomes.categoryName,y:data.incomes.moneyName/allMoney, 
								          sliced: true,selected: true};
								 alert("str:"+str);
								 alert("str2:"+str2);
								incomeArray.push(str);
							}
							else{
	//							sonArray=[data.incomes.categoryName,data.incomes.moneyName/allMoney];//错误
	//							sonArray[0]=data.incomes.categoryName;
	//							sonArray[1]=data.incomes.moneyName/allMoney;
								incomeArray.push([data.incomes.categoryName,data.incomes.moneyName/allMoney]);
							}*/
						}
	//					alert("incomeArray:"+incomeArray);
						var series = [ {
							type : 'pie',//饼图
							name : '收入类别金额比例',
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
						$('#container_year_chart_left').highcharts(json);
					}
				},
				error : function() {
					// alert("fail");
				}
			});
	}
	
	/*--------------------------------------------------------------------------------------------*/	
	// 绘制年度统计报表【饼图】   支出
	function yearInCategoryCountSpends(year) {
		var uid=$("#uid").val();
		$.ajax({
				url : "/financialManage/shouzhiRecord/yearInCategoryCountSpends.action",
				type : "get",
				data : "year=" + year+"&uid="+uid,
//				data : "year=" + year,
				dataType : "json",// 返回时的数据类型json
				success : function(data) {
//					 alert("success");
					
					if(data.spends.length==0){
//						alert("empty");
						//清空原有的元素
						$("#container_year_chart_right").empty();
						var ele=$("<span></span>").append(year+"年支出信息为空").attr("style","font-size:30px;color:red;");
						ele.appendTo("#container_year_chart_right");
						return;
					}
					else{
//						alert("not empty");
						// 绘制饼图
						var chart = {
							plotBackgroundColor : null,
							plotBorderWidth : null,
							plotShadow : false
						};
						var title = {
							text : year+' 年各支出类别占有比例'
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
									format : '<b>{point.name}%</b>: {point.percentage:.1f} %',
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
	//					alert("credits"+credits);
						//根据获得的数据进行
						var spendArray =[];//外面的数组
						//计算收入的总额
						var allMoney=0;
						for(var i=0;i<data.spends.length;i++){
							allMoney+=data.spends[i].moneyName;
						}
						for(var i=0;i<data.spends.length;i++){
							spendArray.push([data.spends[i].categoryName,data.spends[i].moneyName/allMoney]);
						}
						var series = [ {
							type : 'pie',//饼图
							name : '支出类别金额比例',
							data : spendArray//数组里面放的还是数组
						} ];
//						progressCreate(data);//制作支出排行榜
						var json = {};
						json.chart = chart;
						json.title = title;
						json.tooltip = tooltip;
						json.series = series;
						json.plotOptions = plotOptions;
						json.credits=credits;
						$('#container_year_chart_right').highcharts(json);
					}
				},
				error : function() {
					// alert("fail");
				}
			});
	}
/*--------------------------------------------------------------------------------------------*/	
	// 绘制年度统计报表【柱形图 column】
	function yearInMonthCountColumn(year) {
		var uid=$("#uid").val();
		$.ajax({
			url : "/financialManage/shouzhiRecord/yearInMonthCount.action",
			type : "get",
			data : "year=" + year+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				// alert("success");
				if(data.spends.length==0&&data.incomes.length==0){
					//清空原有的元素
					$("#container_year_chart").empty();
					var ele=$("<span></span>").append(year+"年收支信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_year_chart");
					return;
				}
				else{
					 var chart = {
						  type: 'column'
					};
					var title = {
						text : year + '年度收支情况'
					};
					var subtitle = {
						text : ''
					};
					// x坐标轴
					var xAxis = {
						categories : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月',
								'八月', '九月', '十月', '十一月', '十二月' ],
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
	//					valueSuffix : '元',
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
					var incomeArray = new Array(12);
					// 支出数组
					var spendArray = new Array(12);
					// 收入--初始化
					for (var i = 0; i < incomeArray.length; i++) {
						incomeArray[i] = null;
						//incomeArray[i] = 0;
					}
					// alert("收入长度length:"+data.incomes.length);
					// 将json中的值赋值到相应的数组中
					if (data.incomes != null) {
						for (var i = 0; i < data.incomes.length; i++) {
							var a = data.incomes[i].monthName - 1;// 月份所在下标
							incomeArray[a] = data.incomes[i].moneyName;
						}
					}
					// 支出 -- 初始化
					for (var i = 0; i < spendArray.length; i++) {
						spendArray[i] = null;
						//spendArray[i] = 0;
					}
					if (data.spends != null) {
						for (var i = 0; i < data.spends.length; i++) {
							var a = data.spends[i].monthName - 1;// 月份所在下标
							spendArray[a] = data.spends[i].moneyName;
						}
					}
					// alert("支出:"+spendArray+" 收入:"+incomeArray);
					var series = [ {
						name : '收入',
						data : incomeArray,
						color : '#F01B2D'
					}, {
						name : '支出',
						data : spendArray,
						color : '#82A6F5'
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
					$('#container_year_chart').highcharts(json);
				}
			},
			error : function() {
				// alert("fail");
			}
		});
	}
/*--------------------------------------------------------------------------------------------*/
	// 绘制年度统计报表【条形图 bar】
	function yearInMonthCountBar(year) {
		// alert("hahaha");
		var uid=$("#uid").val();
		$.ajax({
			url : "/financialManage/shouzhiRecord/yearInMonthCount.action",
			type : "get",
//			data : "year=" + year,
			data : "year=" + year+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				// alert("success");
				if(data.spends.length==0&&data.incomes.length==0){
					//alert("empty");
					//清空原有的元素
					$("#container_year_chart").empty();
					var ele=$("<span></span>").append(year+"年收支信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_year_chart");
					return;
				}
				else{
					var chart = {
						      type: 'bar'
					};
					var title = {
						text : year + '年度收支情况'
					};
					var subtitle = {
						text : ''
					};
					// x坐标轴
					var xAxis = {
						categories : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月',
								'八月', '九月', '十月', '十一月', '十二月' ],
						title: {
							      text: null
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
	
	//				// 图例
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
					var incomeArray = new Array(12);
					// 支出数组
					var spendArray = new Array(12);
					// 收入--初始化
					for (var i = 0; i < incomeArray.length; i++) {
						incomeArray[i] = null;
					}
					// alert("收入长度length:"+data.incomes.length);
					// 将json中的值赋值到相应的数组中
					if (data.incomes != null) {
						for (var i = 0; i < data.incomes.length; i++) {
							var a = data.incomes[i].monthName - 1;// 月份所在下标
							incomeArray[a] = data.incomes[i].moneyName;
						}
					}
					// 支出 -- 初始化
					for (var i = 0; i < spendArray.length; i++) {
						spendArray[i] = null;
					}
					if (data.spends != null) {
						for (var i = 0; i < data.spends.length; i++) {
							var a = data.spends[i].monthName - 1;// 月份所在下标
							spendArray[a] = data.spends[i].moneyName;
						}
					}
					// alert("支出:"+spendArray+" 收入:"+incomeArray);
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
					$('#container_year_chart').highcharts(json);
					}
			},
			error : function() {
				// alert("fail");
			}
		});
	}
	/*--------------------------------------------------------------------------------------------*/	
	// 绘制年度统计报表【金字塔   柱形图 column】
	function yearInMonthCountColumnKing(year) {
		var uid=$("#uid").val();
		$.ajax({
			url : "/financialManage/shouzhiRecord/yearInMonthCount.action",
			type : "get",
//			data : "year=" + year,
			data : "year=" + year+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
				// alert("success");
				if(data.spends.length==0&&data.incomes.length==0){
					//alert("empty");
					//清空原有的元素
					$("#container_year_chart").empty();
					var ele=$("<span></span>").append(year+"年收支信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_year_chart");
					return;
				}
				else{
					var chart={
			                type: 'bar'
			         };
					var title = {
						text : year + '年度收支情况'
					};
					var subtitle = {
						text : ''
					};
					// x坐标轴
					var xAxis = [{
						categories : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月',
								'八月', '九月', '十月', '十一月', '十二月' ],
						reversed: false,
						labels: {
			                    step: 1
			                }
						},{ // mirror axis on right side
		                    opposite: true,
		                    reversed: false,
		                    categories: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月',
		      							'八月', '九月', '十月', '十一月', '十二月' ],
		                    linkedTo: 0,
		                    labels: {
		                        step: 1
				             }
					}];
					
					// 提示框
					var tooltip = {
				      formatter: function () {
		                    return '<b>' + this.series.name + '：' + this.point.category + '</b><br/>' +
		                        '金额: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
		                }
					};
					// 数据带有标签
					var plotOptions = {
							 series: {
				                    stacking: 'normal'
				                }
					};
					// 版权信息
					var credits = {
						text : 'financialCount.com'
					};
					// 创建 数据列series
					// 收入数组
					var incomeArray = new Array(12);
					// 支出数组
					var spendArray = new Array(12);
					// 收入--初始化
					for (var i = 0; i < incomeArray.length; i++) {
						incomeArray[i] = null;
						//incomeArray[i] = 0;
					}
					// alert("收入长度length:"+data.incomes.length);
					// 将json中的值赋值到相应的数组中
					var maxValue=0;//收入最大
					var minValue=0;//支出最大
					var allMax=0;//总的最大
					if (data.incomes != null) {
						for (var i = 0; i < data.incomes.length; i++) {
							var a = data.incomes[i].monthName - 1;// 月份所在下标
							incomeArray[a] = data.incomes[i].moneyName;
						}
						//计算收入最大值
						for (var i = 0; i < data.incomes.length; i++) {
							if(data.incomes[i].moneyName>=maxValue){
								maxValue=data.incomes[i].moneyName;
							}
						}
					}
					// 支出 -- 初始化
					for (var i = 0; i < spendArray.length; i++) {
						spendArray[i] = null;
						//spendArray[i] = 0;
					}
					if (data.spends != null) {
						for (var i = 0; i < data.spends.length; i++) {
							var a = data.spends[i].monthName - 1;// 月份所在下标
							spendArray[a] = -data.spends[i].moneyName;
						}
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
					// alert("支出:"+spendArray+" 收入:"+incomeArray);
					var series = [ {
						name : '收入',
						data : incomeArray
	//					color : '#FF6666'
					}, {
						name : '支出',
						data : spendArray
	//					color : '#7CB5EC'
					} ];
					var json = {};
					json.chart = chart; 
					json.title = title;
					json.subtitle = subtitle;
					json.xAxis = xAxis;
					json.yAxis = yAxis;
					json.tooltip = tooltip;
	//				json.legend = legend;
					json.credits = credits;
					json.series = series;
					json.plotOptions = plotOptions;
	
					$('#container_year_chart').highcharts(json);
				}
			},
			error : function() {
			}
		});
	}
/*--------------------------------------------------------------------------------------------*/	
	// 绘制年度统计报表【基础面积图 area】
	function yearInMonthCountArea(year) {
		var uid=$("#uid").val();
//		alert(uid);
		$.ajax({
			url : "/financialManage/shouzhiRecord/yearInMonthCount.action",
			type : "get",
			data : "year=" + year+"&uid="+uid,
			dataType : "json",// 返回时的数据类型json
			success : function(data) {
//				 alert("success");

				if(data.spends.length==0&&data.incomes.length==0){
					//alert("empty");
					//清空原有的元素
					$("#container_year_chart").empty();
					var ele=$("<span></span>").append(year+"年收支信息为空").attr("style","font-size:30px;color:red;");
					ele.appendTo("#container_year_chart");
					return;
				}
				else{
					var chart={
					            type: 'area'
					        };
			        var title={
			            text:year + '年度收支情况'
			        };
			        var subtitle={
			            text: '基础面积图'
			        };
			        var xAxis={
			        	title : {
								text : '月份(月)'
							},
			            allowDecimals: false,
			            labels: {
			                formatter: function () {
			                    return this.value+"月"; 
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
			                pointStart:1,
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
					var incomeArray = new Array(12);
					// 支出数组
					var spendArray = new Array(12);
					// 收入--初始化
					for (var i = 0; i < incomeArray.length; i++) {
	//					incomeArray[i] = null;
						incomeArray[i] = 0;
					}
					// alert("收入长度length:"+data.incomes.length);
					// 将json中的值赋值到相应的数组中
					if (data.incomes != null) {
						for (var i = 0; i < data.incomes.length; i++) {
							var a = data.incomes[i].monthName - 1;// 月份所在下标
							incomeArray[a] = data.incomes[i].moneyName;
						}
					}
	
					// 支出 -- 初始化
					for (var i = 0; i < spendArray.length; i++) {
	//					spendArray[i] = null;
						spendArray[i] = 0;
					}
					if (data.spends != null) {
						for (var i = 0; i < data.spends.length; i++) {
							var a = data.spends[i].monthName - 1;// 月份所在下标
							spendArray[a] = data.spends[i].moneyName;
						}
					}
					
			      
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
	
					$('#container_year_chart').highcharts(json);
				}
			},
			error : function() {
				alert("fail");
			}
		});
	}	

/*--------------------------------------------------------------------------------------------*/	
	// 绘制年度统计报表【饼图--扇形图  】 收入
	function yearInCategoryCountPieShanIncome(year) {
		var uid=$("#uid").val();
//		alert(uid);
		$.ajax({
				url : "/financialManage/shouzhiRecord/yearInCategoryCount.action",
				type : "get",
				data : "year=" + year+"&uid="+uid,
				dataType : "json",// 返回时的数据类型json
				success : function(data) {
//					 alert("success");
					if(data.incomes.length==0){
						//alert("empty");
						//清空原有的元素
						$("#container_year_chart_left").empty();
						var ele=$("<span></span>").append(year+"年收入信息为空").attr("style","font-size:30px;color:red;");
						ele.appendTo("#container_year_chart_left");
						return;
					}
					else{
						var chart = {
							plotBackgroundColor : null,
							plotBorderWidth : null,
							plotShadow : false
						};
						var title = {
							text : year+' 年各收入类别<br>占有比例',
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
						var incomeArray =[];//外面的数组
						//计算收入的总额
						var allMoney=0;
						for(var i=0;i<data.incomes.length;i++){
							allMoney+=data.incomes[i].moneyName;
						}
						for(var i=0;i<data.incomes.length;i++){
							incomeArray.push([data.incomes[i].categoryName,data.incomes[i].moneyName/allMoney]);
						}
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
						$('#container_year_chart_left').highcharts(json);
					}
				},
				error : function() {
					// alert("fail");
				}
			});
	}
	
	/*--------------------------------------------------------------------------------------------*/	
	// 绘制年度统计报表【饼图--扇形图  】 支出
	var chart=null;
	function yearInCategoryCountPieShanSpend(year) {
		var uid=$("#uid").val();
//		alert(uid);
		$.ajax({
				url : "/financialManage/shouzhiRecord/yearInCategoryCountSpends.action",
				type : "get",
				data : "year=" + year+"&uid="+uid,
				dataType : "json",// 返回时的数据类型json
				success : function(data) {
//					 alert("success");
					if(data.spends.length==0){
						//alert("empty");
						//清空原有的元素
						$("#container_year_chart_right").empty();
						var ele=$("<span></span>").append(year+"年支出信息为空").attr("style","font-size:30px;color:red;");
						ele.appendTo("#container_year_chart_right");
						return;
					}
					else{
						var chart = {
							plotBackgroundColor : null,
							plotBorderWidth : null,
							plotShadow : false
						};
						var title = {
							text : year+' 年各支出类别<br>占有比例',
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
						var spendArray =[];//外面的数组
						//计算支出的总额
						var allMoney=0;
						for(var i=0;i<data.spends.length;i++){
							allMoney+=data.spends[i].moneyName;
						}
						for(var i=0;i<data.spends.length;i++){
							spendArray.push([data.spends[i].categoryName,data.spends[i].moneyName/allMoney]);
						}
						var series = [ {
							type : 'pie',//饼图
							name : '支出类别金额比例',
							innerSize: '50%',
							//数组里面放的还是数组
							data : spendArray
						} ];
	
						var json = {};
						json.chart = chart;
						json.title = title;
						json.tooltip = tooltip;
						json.series = series;
						json.plotOptions = plotOptions;
						json.credits=credits;
						$('#container_year_chart_right').highcharts(json);
					}
				},
				error : function() {
					// alert("fail");
				}
			});
	}
	
/*--------------------------------------------------------------------------------------------*/	
	// 绘制年度统计报表【饼图--圆环图 】 支出
	function yearInCategoryCountPieCircleRoundSpend(year) {//支出
		var uid=$("#uid").val();
		$.ajax({
				url : "/financialManage/shouzhiRecord/yearInCategoryCountSpends.action",
				type : "get",
				data : "year=" + year+"&uid="+uid,
				dataType : "json",// 返回时的数据类型json
				success : function(data) {
//					alert("success");
					if(data.spends.length==0){
						//alert("empty");
						//清空原有的元素
						$("#container_year_chart_right").empty();
						var ele=$("<span></span>").append(year+"年支出信息为空").attr("style","font-size:30px;color:red;");
						ele.appendTo("#container_year_chart_right");
						return;
					}
					else{
						var spendArray =[];//外面的数组
						//计算收入的总额
						var allMoney=0;
						for(var i=0;i<data.spends.length;i++){
							allMoney+=data.spends[i].moneyName;
						}
						for(var i=0;i<data.spends.length;i++){
	//						alert(data.spends[i].moneyName/allMoney);
							//尝试类型转换失败
	//						var num=(data.spends[i].moneyName/allMoney).toFixed(2);
	//						alert((data.spends[i].moneyName/allMoney).toFixed(2));
	//						spendArray.push([data.spends[i].categoryName,num]);
							
							//此处写成 i=0让电脑卡机了
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
						$('#container_year_chart_right').highcharts({
					        chart: {
					            plotBackgroundColor: null,
					            plotBorderWidth: null,
					            plotShadow: false,
	//				            spacing : [100, 0 , 40, 0]
					        },
					        //'<b>'+data.spends[0].categoryName+'</b>:'+ (data.spends[0].moneyName/allMoney).toFixed(2)+'%'
					        title: {
					            floating:true,
					            text: year+'年各支出类别<br/>占有比例'
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
					    }
						
						);
						
					}
				},
				error : function() {
					// alert("fail");
				}
			});
	}

	/*--------------------------------------------------------------------------------------------*/	
	// 绘制年度统计报表【饼图--圆环图 】 收入
	function yearInCategoryCountPieCircleRoundIncome(year) {//收入
		var uid=$("#uid").val();
		$.ajax({
				url : "/financialManage/shouzhiRecord/yearInCategoryCount.action",
				type : "get",
				data : "year=" + year+"&uid="+uid,
				dataType : "json",// 返回时的数据类型json
				success : function(data) {
//					alert("success");
					if(data.incomes.length==0){
						//alert("empty");
						//清空原有的元素
						$("#container_year_chart_left").empty();
						var ele=$("<span></span>").append(year+"年收入信息为空").attr("style","font-size:30px;color:red;");
						ele.appendTo("#container_year_chart_left");
						return;
					}
					else{
						var incomeArray =[];//外面的数组
						//计算收入的总额
						var allMoney=0;
						for(var i=0;i<data.incomes.length;i++){
							allMoney+=data.incomes[i].moneyName;
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
						$('#container_year_chart_left').highcharts({
					        chart: {
					            plotBackgroundColor: null,
					            plotBorderWidth: null,
					            plotShadow: false,
	//				            spacing : [100, 0 , 40, 0]
					        },
					        title: {
					            floating:true,
					            //'<b>{point.name}</b>: {point.percentage:.2f} %'
					            text: year+'年各收入类别<br/>占有比例'
					        },
					        tooltip: {
	//				            pointFormat:'{series.name}: <b>{point.percentage:.1f}%</b>'
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
				error : function() {
					// alert("fail");
				}
			});
	}
	
/*--------------------------------------------------------------------------------------------*/	
// 绘制年度统计报表【雷达图 】 
	function yearInCategoryCountRadarMap(year) {
		var uid=$("#uid").val();
//		alert("雷达图");
		$.ajax({
				url : "/financialManage/shouzhiRecord/yearInMonthCount.action",
				type : "get",
				data : "year=" + year+"&uid="+uid,
				dataType : "json",// 返回时的数据类型json
				success : function(data) {
//					alert("success");
					if(data.spends.length==0&&data.incomes.length==0){
						//清空原有的元素
						$("#container_year_chart").empty();
						var ele=$("<span></span>").append(year+"年收支信息为空").attr("style","font-size:30px;color:red;");
						ele.appendTo("#container_year_chart");
						return;
					}
					else{
						// 创建 数据列series
						// 收入数组
						var incomeArray = new Array(12);
						// 支出数组
						var spendArray = new Array(12);
						// 收入--初始化
						for (var i = 0; i < incomeArray.length; i++) {
							incomeArray[i] = 0;
						}
						// 将json中的值赋值到相应的数组中
						if (data.incomes != null) {
							for (var i = 0; i < data.incomes.length; i++) {
								var a = data.incomes[i].monthName - 1;// 月份所在下标
								incomeArray[a] = data.incomes[i].moneyName;
							}
						}
		
						// 支出 -- 初始化
						for (var i = 0; i < spendArray.length; i++) {
							spendArray[i] = 0;
						}
						if (data.spends != null) {
							for (var i = 0; i < data.spends.length; i++) {
								var a = data.spends[i].monthName - 1;// 月份所在下标
								spendArray[a] = data.spends[i].moneyName;
							}
						}
						  $('#container_year_chart').highcharts({
						        chart: {
						            polar: true,
						            type: 'line'
						        },
						        title: {
						            text: year + '年度收支情况',
						            x: -80
						        },
						        pane: {
						            size: '95%'
						        },
						        xAxis: {
						            categories: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月',
													'八月', '九月', '十月', '十一月', '十二月' ],
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
				error : function() {
					// alert("fail");
				}
			});
	}
	
/*--------------------------------------------------------------------------------------------*/	
	// 绘制年度统计报表【综合图 】 
		function yearInCategoryCountAllKind(year) {
			var uid=$("#uid").val();
			$.ajax({
					url : "/financialManage/shouzhiRecord/yearInMonthCount.action",
					type : "get",
					data : "year=" + year+"&uid="+uid,
					dataType : "json",// 返回时的数据类型json
					success : function(data) {
//						alert("success");
						if(data.spends.length==0&&data.incomes.length==0){
							//清空原有的元素
							$("#container_year_chart").empty();
							var ele=$("<span></span>").append(year+"年收支信息为空").attr("style","font-size:30px;color:red;");
							ele.appendTo("#container_year_chart");
							return;
						}
						else{
							// 创建 数据列series
							// 收入数组
							var incomeArray = new Array(12);
							// 支出数组
							var spendArray = new Array(12);
							// 收入--初始化
							for (var i = 0; i < incomeArray.length; i++) {
								incomeArray[i] = 0;
							}
							// 将json中的值赋值到相应的数组中
							if (data.incomes != null) {
								for (var i = 0; i < data.incomes.length; i++) {
									var a = data.incomes[i].monthName - 1;// 月份所在下标
									incomeArray[a] = data.incomes[i].moneyName;
								}
							}
			
							// 支出 -- 初始化
							for (var i = 0; i < spendArray.length; i++) {
								spendArray[i] = 0;
							}
							if (data.spends != null) {
								for (var i = 0; i < data.spends.length; i++) {
									var a = data.spends[i].monthName - 1;// 月份所在下标
									spendArray[a] = data.spends[i].moneyName;
								}
							}
							
							//计算平均值
							var average=[];//平局值
							for (var i = 0; i < 12; i++) {
								average[i]=(spendArray[i]+incomeArray[i])/2;
							}
							
							
							//计算收支总额
							var dataList=[];
							var spendAll=0;
							for(var i=0;i<data.spends.length;i++){
								spendAll+=data.spends[i].moneyName;
							}
							dataList.push({'name':"支出",'y':spendAll,'color':Highcharts.getOptions().colors[1]});
							var incomeAll=0;
							for(var i=0;i<data.incomes.length;i++){
								incomeAll+=data.incomes[i].moneyName;
							}
							dataList.push({'name':"收入",'y':incomeAll,'color':Highcharts.getOptions().colors[0]});
							
							
//							container_year_chart
							 $('#container_year_chart').highcharts({
							        title: {
							            text: year+'年收支综合占比图'
							        },
							        xAxis: {
							        	categories : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月',
														'八月', '九月', '十月', '十一月', '十二月' ]
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
							            data: incomeArray//12个月的收入
							        }, {
							            type: 'column',
							            name: '支出',
							            data: spendArray//12个月的支出
							        }, {
							            type: 'spline',
							            name: '收支平均值',
							            data: average,//12个月的收入，支出的平均值
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
					error : function() {
						// alert("fail");
					}
				});
		}
	
});