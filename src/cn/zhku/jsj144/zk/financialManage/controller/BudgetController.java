package cn.zhku.jsj144.zk.financialManage.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.zhku.jsj144.zk.financialManage.pojo.Budget;
import cn.zhku.jsj144.zk.financialManage.pojo.User;
import cn.zhku.jsj144.zk.financialManage.service.BudgetService;

@Controller

@RequestMapping("/budget")//访问路径：/budget/xxx
public class BudgetController {
	
	@Autowired
	private BudgetService budgetService;
	
	//根据当前时间，以及当前用户id，查询预算，进行显示预算相关的数据
	@RequestMapping("/findBudget.action")
	public String findBudget(HttpServletRequest request,Model model){
		String current=getCurrentTime();//当前月份
		User user=(User) request.getSession().getAttribute("user");
		int uid=user.getUid();//用户id
		Budget budget=new Budget();
		budget.setUser_id(uid);
		budget.setWtime(current);
		
		//查找当前月份是否存在预算
		Budget findBudget=budgetService.findBudget(budget);
		model.addAttribute("budget", findBudget);
		return "/jsp/financialBudget.jsp";
	}
	
	
	//添加预算
	@RequestMapping("/addBudget.action")
	@ResponseBody
	public String addBudget(Budget budget){
		//当前月份
		budget.setWtime(getCurrentTime());//格式化时间  当前月份
		budgetService.addBudget(budget);//添加预算
		return "OK";
	}
	
	//编辑预算
	@RequestMapping("/editBudget.action")
	@ResponseBody
	public String editBudget(Budget budget){
		budgetService.editBudget(budget);//编辑预算
		return "OK";
	}
	
	//删除预算
	@RequestMapping("/deleteBudget.action")
	@ResponseBody
	public String deleteBudget(int wid){
		budgetService.deleteBudget(wid);
		return "OK";
	}
	//获取当前时间
	public String getCurrentTime(){
		Date time=new Date();
		DateFormat dFormat = new SimpleDateFormat("yyyy-MM"); 
		String current = dFormat.format(time);
		return current;
		
	}
	
}
