package cn.zhku.jsj144.zk.financialManage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import cn.zhku.jsj144.zk.financialManage.pojo.DayCount;
import cn.zhku.jsj144.zk.financialManage.pojo.MonthCount;
import cn.zhku.jsj144.zk.financialManage.pojo.User;
import cn.zhku.jsj144.zk.financialManage.service.ShouzhiRecordService;

@Controller
public class FinancialCountController {//财务统计
	
	@Autowired
	private ShouzhiRecordService shouzhiRecordService;
	
	@RequestMapping("/toFinancialCount.action")
	public String toFinancialCount(){//去财务统计页面
		return "/jsp/financialCount.jsp";
	}
	
	//每个月的收入，支出统计
	@RequestMapping("/shouzhiRecord/yearInMonthCount.action")
	@ResponseBody    //json格式数据
	public String yearInMonthCount(String year,String uid){
		System.out.println("------------每个月的收入，支出统计------------");
		//通过year和用户id进行查询，该用户，这一年，每个月的收支情况
		Map<String,String> paramMap=new HashMap<String,String>();
		paramMap.put("year", year);
//		User user = (User) request.getSession().getAttribute("user");
//		paramMap.put("user_id",user.getUid()+"");
		paramMap.put("user_id",uid);
		
		//每个月的收入，支出统计      每个月的收入 -->月 ：金额
		List<MonthCount> incomes=shouzhiRecordService.findYearInMonthCountIncome(paramMap);
		//每个月的收入，支出统计     每个月的支出 -->月 ：金额
		List<MonthCount> spends=shouzhiRecordService.findYearInMonthCountSpend(paramMap);
		
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("incomes", incomes);
		map.put("spends", spends);
		//转为json数据
		String jsonString = JSON.toJSONString(map);
		System.out.println("每个月的收支统计结果：jsonString:\n"+jsonString);
		
		return jsonString;//返回主页
	}

	//一年（12个月）的不同类型的收入统计
	@RequestMapping("/shouzhiRecord/yearInCategoryCount.action")
	@ResponseBody    //json格式数据
	public String yearInCategoryCount(String year,String uid){
		//通过year和用户id进行查询，该用户，这一年，每个月的收支情况
		Map<String,String> paramMap=new HashMap<String,String>();
		paramMap.put("year", year);
//		User user = (User) request.getSession().getAttribute("user");
//		paramMap.put("user_id",user.getUid()+"");
		paramMap.put("user_id",uid);
		
		//一年的，各种收入类别统计     
		List<MonthCount> incomes=shouzhiRecordService.findYearInCategoryCountIncome(paramMap);
		
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("incomes", incomes);
		//转为json数据
		String jsonString = JSON.toJSONString(map);
		System.out.println("各种类别的情况：jsonString:\n"+jsonString);
		
		return jsonString;//返回主页
	}
	
	
	//一年（12个月）的不同类型的支出统计
	@RequestMapping("/shouzhiRecord/yearInCategoryCountSpends.action")
	@ResponseBody    //json格式数据
	public String yearInCategoryCountSpends(String year,String uid){
		//通过year和用户id进行查询，该用户，这一年，每个月的收支情况
		Map<String,String> paramMap=new HashMap<String,String>();
		paramMap.put("year", year);
		paramMap.put("user_id",uid);
		
		//一年的，各种支出类别统计     
		List<MonthCount> spends=shouzhiRecordService.findYearInCategoryCountSpend(paramMap);
		
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("spends", spends);
		//转为json数据
		String jsonString = JSON.toJSONString(map);
		System.out.println("各种类别的情况：jsonString:\n"+jsonString);
		return jsonString;//返回主页
	}
	
	/*----------------------------------------------月             统               计----------------------------------------------------*/
	//每天的收入，支出统计【月统计】
	@RequestMapping("/shouzhiRecord/MonthInDayCount.action")
	@ResponseBody    //json格式数据
	public String MonthInDayCount(String currentTime,String uid){

		//处理currentTime
		String[] arr = currentTime.split("-");
		String year=arr[0];
		String month=arr[1];
		//通过year和用户id进行查询，该用户，这一年，每个月的收支情况
		Map<String,String> paramMap=new HashMap<String,String>();
		paramMap.put("year", year);
		paramMap.put("month", month);
		paramMap.put("user_id",uid);
		//每天的收入统计       ->天：金额
		List<DayCount> incomes=shouzhiRecordService.findMonthInDayCountIncome(paramMap);
		//每天的支出统计    -->天：金额
		List<DayCount> spends=shouzhiRecordService.findMonthInDayCountSpend(paramMap);
		
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("incomes", incomes);
		map.put("spends", spends);
		//转为json数据
		String jsonString = JSON.toJSONString(map);
		System.out.println("该月每天的收支统计结果：jsonString:\n"+jsonString);
		
		return jsonString;//返回主页
	}
	
		//一个月（n天）的不同类型的收入统计
		@RequestMapping("/shouzhiRecord/monthInCategoryCountIncome.action")
		@ResponseBody    //json格式数据
		public String monthInCategoryCountIncome(String currentTime,String uid){
			//处理currentTime
			String[] arr = currentTime.split("-");
			String year=arr[0];
			String month=arr[1];
			Map<String,String> paramMap=new HashMap<String,String>();
			paramMap.put("year", year);
			paramMap.put("month", month);
			paramMap.put("user_id",uid);
			//一个月的，各种收入类别统计     
			List<DayCount> incomes=shouzhiRecordService.findMonthInCategoryCountIncome(paramMap);
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("incomes", incomes);
			//转为json数据
			String jsonString = JSON.toJSONString(map);
			System.out.println("每天各种收入类别的情况：jsonString:\n"+jsonString);
			return jsonString;//返回主页
		}	
		
		/*  财务预算模块需要使用*/
		//一个月（n天）的不同类型的收入，以及支出统计
		@RequestMapping("/shouzhiRecord/monthInCategoryCountSpend.action")
		@ResponseBody    //json格式数据
		public String monthInCategoryCountSpend(String currentTime,String uid){
			//处理currentTime
			String[] arr = currentTime.split("-");
			String year=arr[0];
			String month=arr[1];
			Map<String,String> paramMap=new HashMap<String,String>();
			paramMap.put("year", year);
			paramMap.put("month", month);
			paramMap.put("user_id",uid);
			//一个月，各种支出类别统计     
			List<DayCount> spends=shouzhiRecordService.findMonthInCategoryCountSpend(paramMap);
			//一个月的，各种收入类别统计     
			List<DayCount> incomes=shouzhiRecordService.findMonthInCategoryCountIncome(paramMap);
			
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("incomes", incomes);
			map.put("spends", spends);
			//转为json数据
			String jsonString = JSON.toJSONString(map);
			System.out.println("每天各种收入，以及支出类别的情况：jsonString:\n"+jsonString);
			return jsonString;//返回主页
		}	
		
		//一个月（n天）的不同类型的收入，支出统计
		@RequestMapping("/shouzhiRecord/monthInCategoryCountAll.action")
		@ResponseBody    //json格式数据
		public String monthInCategoryCountAll(String currentTime,String uid){
			//处理currentTime
			String[] arr = currentTime.split("-");
			String year=arr[0];
			String month=arr[1];
			Map<String,String> paramMap=new HashMap<String,String>();
			paramMap.put("year", year);
			paramMap.put("month", month);
			paramMap.put("user_id",uid);
			//一个月，各种支出类别统计     
			List<DayCount> spends=shouzhiRecordService.findMonthInCategoryCountSpend(paramMap);
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("spends", spends);
			//转为json数据
			String jsonString = JSON.toJSONString(map);
			System.out.println("每天各种支出类别的情况：jsonString:\n"+jsonString);
			return jsonString;//返回主页
		}	
		
		
		/*-------------------------时        间            统         计-------------------------------------*/
		//某个时间段的不同类型的收入，支出统计
		@RequestMapping("/shouzhiRecord/dayInTimeCount.action")
		@ResponseBody    //json格式数据
		public String dayInTimeCount(String start,String end,String uid){
			Map<String,String> paramMap=new HashMap<String,String>();
			paramMap.put("start", start);
			paramMap.put("end", end);
			paramMap.put("user_id",uid);
			List<DayCount> incomes=shouzhiRecordService.findDayInTimeCountIncomes(paramMap);//收入
			List<DayCount> spends=shouzhiRecordService.findDayInTimeCountSpends(paramMap);//支出
			
			Map<String,Object> map=new HashMap<String,Object>();
			map.put("incomes", incomes);
			map.put("spends", spends);
			
			//转为json数据
			String jsonString = JSON.toJSONString(map);
			System.out.println("不同时间段的，各种收支类别的情况：jsonString:\n"+jsonString);
			return jsonString;//返回主页
		}	
}
