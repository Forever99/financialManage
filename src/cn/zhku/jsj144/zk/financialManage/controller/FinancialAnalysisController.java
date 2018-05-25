package cn.zhku.jsj144.zk.financialManage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import cn.zhku.jsj144.zk.financialManage.pojo.DayCount;
import cn.zhku.jsj144.zk.financialManage.pojo.MonthAnalysis;
import cn.zhku.jsj144.zk.financialManage.service.FinancialAnalysisService;
import cn.zhku.jsj144.zk.financialManage.service.ShouzhiRecordService;

@Controller
@RequestMapping("/financialAnalysis")
public class FinancialAnalysisController {

	@Autowired
	private FinancialAnalysisService financialAnalysisService;//统计，分析当前月的收支情况
	
	@Autowired
	private ShouzhiRecordService shouzhiRecordService;//统计，分析  当前月，当前时间内的各类别情况【复用原有代码】
	
	@RequestMapping("/toFinancialAnalysis.action")
	public String toFinancialAnalysis(){//去财务分析页面
		return "/jsp/financialAnalysis.jsp";
	}
	
	@RequestMapping("/monthAnalysis.action")
	@ResponseBody
	public String monthAnalysis(String currentTime,String lastTime,int uid){//月分析
		
		//本月数据
		Map<String,String> paramMap=new HashMap<String,String>();//请求参数
		paramMap.put("currentTime", currentTime);
		paramMap.put("uid", uid+"");
		int incomeRecordCount=financialAnalysisService.findMonthincomeRecordCount(paramMap);//收入记录
		int spendsRecordCount=financialAnalysisService.findMonthspendsRecordCount(paramMap);//支出记录
		int incomeMoney=financialAnalysisService.findMonthincomeMoney(paramMap);//收入金额
		int spendsMoney=financialAnalysisService.findMonthspendsMoney(paramMap);//支出金额
		
		
//		System.out.println("incomeRecordCount:"+incomeRecordCount);
//		System.out.println("spendsRecordCount:"+spendsRecordCount);
//		System.out.println("incomeMoney:"+incomeMoney);
//		System.out.println("spendsMoney:"+spendsMoney);
		
		int allMoney=incomeMoney+spendsMoney;//总金额
//		System.out.println("allMoney:"+allMoney);
		
		
		MonthAnalysis ms=new MonthAnalysis();//封装该月份的数据
		ms.setIncomeMoney(incomeMoney);
		ms.setIncomeRecordCount(incomeRecordCount);
		ms.setSpendsMoney(spendsMoney);
		ms.setSpendsRecordCount(spendsRecordCount);
		ms.setAllMoney(allMoney);
		
		//上月数据
		Map<String,String> paramMap2=new HashMap<String,String>();//请求参数
		paramMap2.put("currentTime", lastTime);
		paramMap2.put("uid", uid+"");
		int incomeRecordCount2=financialAnalysisService.findMonthincomeRecordCount(paramMap2);//收入记录
		int spendsRecordCount2=financialAnalysisService.findMonthspendsRecordCount(paramMap2);//支出记录
		int incomeMoney2=financialAnalysisService.findMonthincomeMoney(paramMap2);//收入金额
		int spendsMoney2=financialAnalysisService.findMonthspendsMoney(paramMap2);//支出金额
		
//		System.out.println("incomeRecordCount2:"+incomeRecordCount2);
//		System.out.println("spendsRecordCount2:"+spendsRecordCount2);
//		System.out.println("incomeMoney2:"+incomeMoney2);
//		System.out.println("spendsMoney2:"+spendsMoney2);
		
		int allMoney2=incomeMoney2+spendsMoney2;//总金额
//		System.out.println("allMoney2:"+allMoney2);
		
		MonthAnalysis msLast=new MonthAnalysis();//封装该月份的数据
		msLast.setIncomeMoney(incomeMoney2);
		msLast.setIncomeRecordCount(incomeRecordCount2);
		msLast.setSpendsMoney(spendsMoney2);
		msLast.setSpendsRecordCount(spendsRecordCount2);
		msLast.setAllMoney(allMoney2);
		
		Map<String,Object> param=new HashMap<String,Object>();
		param.put("current", ms);//本月数据
		param.put("last", msLast);//上月数据
		
		String jsonString=JSON.toJSONString(param);
		System.out.println("json数据："+jsonString);
		return jsonString;
	}
	
	@RequestMapping("/monthCurrentDayAnalysis.action")
	@ResponseBody
	public String monthCurrentDayAnalysis(String currentTimeDay,String lastTimeDay,String uid){//月的前时间内的分析
		//类型名  以及  金额
//		System.out.println("执行代码。。。。。。。。。。。。。。。。。。。。。");
		//本月数据
		int last = currentTimeDay.lastIndexOf("-");//xxxx-xx-xx 年-月-日
		String currentStart=currentTimeDay.substring(0, last)+"-01";//xxxx-xx-01
//		System.out.println("currentStart:-------------------"+currentStart);
		//当前月的起始时间
		Map<String,String> currentParamMap=new HashMap<String,String>();
		currentParamMap.put("start", currentStart);
		currentParamMap.put("end", currentTimeDay);
		currentParamMap.put("user_id",uid);
		List<DayCount> incomes=shouzhiRecordService.findDayInTimeCountIncomes(currentParamMap);//收入类型  及其 金额
		List<DayCount> spends=shouzhiRecordService.findDayInTimeCountSpends(currentParamMap);//支出类型     及其  金额
		Map<String,Object> currentMap=new HashMap<String,Object>();
		currentMap.put("incomes", incomes);
		currentMap.put("spends", spends);
		System.out.println("incomes:"+incomes);
		System.out.println("spends:"+spends);
		//上月数据
		int last2 = lastTimeDay.lastIndexOf("-");//xxxx-xx-xx 年-月-日
		String currentStart2=lastTimeDay.substring(0, last2)+"-01";//xxxx-xx-01
//		System.out.println("currentEnd2:-------------------"+currentStart2);
		//当前月的起始时间
		Map<String,String> currentParamMap2=new HashMap<String,String>();
		currentParamMap2.put("start", currentStart2);
		currentParamMap2.put("end", lastTimeDay);
		currentParamMap2.put("user_id",uid);
		List<DayCount> incomes2=shouzhiRecordService.findDayInTimeCountIncomes(currentParamMap2);//收入类型  及其 金额
		List<DayCount> spends2=shouzhiRecordService.findDayInTimeCountSpends(currentParamMap2);//支出类型     及其  金额
		Map<String,Object> lastMap=new HashMap<String,Object>();
		lastMap.put("incomes", incomes2);
		lastMap.put("spends", spends2);
		System.out.println("incomes2:"+incomes2);
		System.out.println("spends2:"+spends2);
		//保存本月数据，以及上月数据
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("current", currentMap);
		map.put("last", lastMap);
		
		//转为json数据
		String jsonString = JSON.toJSONString(map);
		System.out.println("当前月，上月数据：jsonString:\n"+jsonString);
		return jsonString;
	}
}
