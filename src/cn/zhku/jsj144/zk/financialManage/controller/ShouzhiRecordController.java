package cn.zhku.jsj144.zk.financialManage.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import cn.zhku.jsj144.zk.financialManage.pojo.News;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.ShouzhiCategory;
import cn.zhku.jsj144.zk.financialManage.pojo.ShouzhiRecord;
import cn.zhku.jsj144.zk.financialManage.pojo.User;
import cn.zhku.jsj144.zk.financialManage.service.NewsService;
import cn.zhku.jsj144.zk.financialManage.service.ShouzhiCategoryService;
import cn.zhku.jsj144.zk.financialManage.service.ShouzhiRecordService;

@Controller
@RequestMapping("/shouzhiRecord")   //访问路径是  /shouzhiRecord/xxx
public class ShouzhiRecordController {

	//注入shouzhiRecordService
	@Autowired
	private ShouzhiRecordService shouzhiRecordService;
	
	@Autowired
	private ShouzhiCategoryService shouzhiCategoryService;//注入shouzhiCategoryService
	
	@Autowired
	private NewsService newsService;
	//登录之后，跳转到账单明细
	//账单明细      +分页查询  +多条件查询
	@RequestMapping(value="findShouzhiRecord.action")
	public String findShouzhiRecord(ShouzhiRecord shouzhiRecord,HttpServletRequest request) throws UnsupportedEncodingException{
		
		//获取当前页  和   用户名
		int currentPage=0;
		//使用错误   request.getAttribute("currentPage")!=null
		if(request.getParameter("currentPage")!=null){
			currentPage=Integer.parseInt((String) request.getParameter("currentPage"));
		}
		//错误 User user=(User) request.getAttribute("user");
		User user=(User) request.getSession().getAttribute("user");
		if(user==null){
			return "/index.jsp";//登录页面
		}
		//System.out.println("当前用户未空吗？---"+user.getUid());
		
		//保存查询条件
		if(shouzhiRecord!=null){
			if(shouzhiRecord.getSzr_date()!=null){
//				System.out.println("日期-----："+shouzhiRecord.getSzr_date());
//				request.getSession().setAttribute("date_condition", shouzhiRecord.getSzr_date());
				request.setAttribute("date_condition", shouzhiRecord.getSzr_date());
			}
			if(shouzhiRecord.getSzr_comment()!=null){
//			if(szr_comment!=null){
//				System.out.println("备注-----："+shouzhiRecord.getSzr_comment());
				String com=new String((shouzhiRecord.getSzr_comment()).getBytes("ISO-8859-1"),"utf-8");
//				System.out.println("备注222-----："+com);
//				request.getSession().setAttribute("comment_condition", com);
				request.setAttribute("comment_condition", com);
				shouzhiRecord.setSzr_comment(com);//重新赋值
			}
		}
		
		//查询账单明细
		PageBean<ShouzhiRecord> pageBean= shouzhiRecordService.findShouzhiRecord(currentPage,user,shouzhiRecord);
//		System.out.println("pageBean.getPageList().size():"+pageBean.getPageList().size());
		
//		String  szr_comment=null;
//		if(request.getParameter("szr_comment")!=null){
//			szr_comment=new String(request.getParameter("szr_comment").getBytes("ISO-8859-1"),"utf-8");//以此来转化编码，就会出现乱码问题。
//		}
		

		
		//查询收入子类型   --通过父分类，从而查询其下的所有子分类
		List<ShouzhiCategory> incomes=shouzhiCategoryService.findShouzhiCategoryByParent("收入");
		request.setAttribute("incomes", incomes);
		//查询支出子类型
		List<ShouzhiCategory> spends=shouzhiCategoryService.findShouzhiCategoryByParent("支出");
		request.setAttribute("spends", spends);
		
		//查出8条财务新闻，通过录入时间 和  访问量的多少来决定显示
		List<News> newsList=newsService.findNewsEightList();
		request.setAttribute("newsList", newsList);//财务新闻
		
		
		if(pageBean.getPageList().size()==0){//查询结果为null时，确保数据为空
			pageBean.setPageList(null);
		}
		request.setAttribute("pageBean", pageBean);//分页记录
		return "/jsp/main.jsp";//跳转到主页
	}
	
	//ajax异步请求，去修改信息页面，根据id获取所需要的参数，从而进行回显
	@RequestMapping("toEdit.action")
	@ResponseBody
	public String toEdit(Long id,HttpServletRequest request){
//		System.out.println("进入修改信息的页面........................................");
		//此处，注意id的类型！！！！！！！！！！
		User user = (User) request.getSession().getAttribute("user");
		if(user==null){
			return "/index.jsp";//登录页面
		}
		Map<String,Integer> map=new HashMap<String,Integer>();
		map.put("uid", user.getUid());//所属用户
		map.put("szrid", id.intValue());//所属收支记录
		//根据id查询收支记录信息
		ShouzhiRecord shouzhiRecord=shouzhiRecordService.findShouzhiRecordById(map);
		//数据库中时间：为String类型之后，省去了对于时间的管理
		
		//Date类型变为  String类型数据
	/*	Date szr_date = shouzhiRecord.getSzr_date();
		System.out.println("时间：-------"+szr_date);
		String formatDate=null;
	    DateFormat dFormat = new SimpleDateFormat("yyyy-MM-dd"); //HH表示24小时制；  
	    formatDate = dFormat.format(szr_date);  
	    System.out.println("格式化之后的时间：------------"+formatDate);  */
	    
	    
		//获得该类型的父类型
		String parent_category = shouzhiRecord.getShouzhiCategory().getParent_category();
//		System.out.println("父类型是：---------------"+parent_category);
		//通过父类型，从而查询出该父类型的所有子类型，从而进行显示
		List<String> son=shouzhiCategoryService.findSonCategoryByParent(parent_category);
		
		//如何保存数据类型，从而显示到页面中
		Map<String,Object> jsonMap = new HashMap<String,Object>();
		jsonMap.put("shouzhiRecord", shouzhiRecord);//一个shouzhiRecord对象
		jsonMap.put("son", son);//一个list对象
		//jsonMap.put("formatDate",formatDate);//保存格式化之后的时间对象
		
		//fastjson将map对象转为json格式字符串
		String jsonString = JSON.toJSONString(jsonMap);
		
		//调试结果
		System.out.println("jsonString:\n"+jsonString);
		
		//当前类别  --无效
		//1）异步请求，设置request无效!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//2）尝试设置session    存在延迟效应，仍旧失败
		//3）在ajax获得data后，通过 js添加标签完成！
		
		//request.setAttribute("currentCategory", shouzhiRecord.getShouzhiCategory().getSon_category());
/*		request.getSession().setAttribute("currentCategory", shouzhiRecord.getShouzhiCategory().getSon_category());
		List<ShouzhiCategory> list=new ArrayList<ShouzhiCategory>();
		for (String one : son) {
			ShouzhiCategory shouzhiCategory=new ShouzhiCategory();
			shouzhiCategory.setSon_category(one);
			list.add(shouzhiCategory);
		}
		//request.setAttribute("sonCategory", list);//所有类别   保存在request中
		request.getSession().setAttribute("sonCategory", list);*/
		
		//{"shouzhiRecord":
		//{"shouzhiCategory":{"parent_category":"支出","son_category":"伙食费","szcid":2},
		//"szr_comment":"午餐","szr_date":1519920000000,"szr_num":-10,"szrid":2,"user_id":1},
		//"son":["伙食费","住宿费","交通费","通讯费"]}
		return jsonString;
	}
	
	//修改用户收支信息
	@RequestMapping("edit.action")
	@ResponseBody
	public String editShouzhiRecord(ShouzhiRecord shouzhiRecord,HttpServletRequest request){
		//System.out.println("-----修改用户信息成功-----");
		User user=(User)request.getSession().getAttribute("user");
		if(user==null){
			return "/index.jsp";//登录页面
		}
		shouzhiRecord.setUser_id(user.getUid());
		//根据收支子类型，获得收支分类id  对象
		ShouzhiCategory shouzhiCategory=shouzhiCategoryService.findCategoryBySonCategory(shouzhiRecord.getShouzhiCategory().getSon_category());
		shouzhiRecord.setShouzhiCategory(shouzhiCategory);
		
		//加一道判断机制
		//为收入时，确保金额为为整数
		if("收入"==shouzhiCategory.getParent_category()){
			int num=shouzhiRecord.getSzr_num();
			if(num<0){//输入有误，所以变为正数
				shouzhiRecord.setSzr_num(-num);
			}
		}
		//为支出时，确保金额为负数
		else{
			int num=shouzhiRecord.getSzr_num();
			if(num>0){//输入有误，所以变为负数
				shouzhiRecord.setSzr_num(-num);
			}
		}
		
		//修改用户收支信息
		shouzhiRecordService.editShouzhiRecord(shouzhiRecord);
		//return "ok";
		return "OK";
	}
	
	//删除用户收支信息（一条）
	@RequestMapping("deleteOne.action")
	@ResponseBody
	public String deleteOneShouzhiRecord(int id){
		//关于id的类型需要进行进一步的思考
		shouzhiRecordService.deleteOneShouzhiRecord(id);
		return "OK";
	}
	
	//批量删除用户收支信息（批量，多条）
	@RequestMapping("deleteBatch.action")
	@ResponseBody
	public String deleteBatchShouzhiRecord(String id){//id的字符串集合
		shouzhiRecordService.deleteBatchShouzhiRecord(id);
		return "OK";
	}
	
	//添加收支记录信息（收入 或者  支出）   -->通过jquery来实现    --失败
	////添加收支记录信息（收入 或者  支出）   -->通过form表单实现
	//addShouzhiRecord.action
	@RequestMapping("addShouzhiRecord.action")
//	@ResponseBody
	public String addShouzhiRecord(ShouzhiRecord shouzhiRecord,HttpServletRequest request) throws IOException{
		
		//判断是收入还是，支出
		//如果是支出，金额保证为负数
		int szcid = shouzhiRecord.getShouzhiCategory().getSzcid();//通过id来查询是收入，还是支出
		String cat=shouzhiRecordService.findParentCategoryById(szcid);//通过收支类别id 查询是收入 还是 支出
//		System.out.println("cat:----"+cat);
		if("支出".equals(cat)){//保证为负数
			int num=shouzhiRecord.getSzr_num();
			if(num>=0){
				shouzhiRecord.setSzr_num(-num);//保证为负数
			}
//			System.out.println("支出:----");
		}
		else{//保证为正数
			int num=shouzhiRecord.getSzr_num();
			if(num<=0){
				shouzhiRecord.setSzr_num(-num);//保证为正数
			}
//			System.out.println("收入:----");
		}
		shouzhiRecordService.addShouzhiRecord(shouzhiRecord);
		
		/*response.setContentType("text/html;charset=gb2312");
		PrintWriter out = response.getWriter();
		out.print("<script language=\"javascript\">alert('添加收支信息成功');window.location.href='/financialManage/shouzhiRecord/findShouzhiRecord.action'</script>");*/

		
		//request.getSession().setAttribute("add_income_category", "add_income_category");
		
		return "redirect:/shouzhiRecord/findShouzhiRecord.action";
		
		//return "OK";    //jquery实现失败
		//return "redirect:/shouzhiRecord/findShouzhiRecord.action";//重新查询
	}
}

