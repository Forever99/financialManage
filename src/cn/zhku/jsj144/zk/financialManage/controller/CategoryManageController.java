package cn.zhku.jsj144.zk.financialManage.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.ShouzhiCategory;
import cn.zhku.jsj144.zk.financialManage.pojo.User;
import cn.zhku.jsj144.zk.financialManage.service.CategoryManageService;

@Controller
@RequestMapping("/categoryManage")
public class CategoryManageController {

	@Autowired
	private CategoryManageService categoryManageService;
	
	//分页查询收支类别
	@RequestMapping("/findCategorys.action")
	public String findCategorys(ShouzhiCategory shouzhiCategory,Integer currentPage,Model model){//无条件分页查询+有条件分页查询
		//查询条件：收支类型  +收支子类型      +  当前页 
		//当前页，默认情况下，currentPage=0   提交过来是第1页  
		
		model.addAttribute("findShouzhiCategory", shouzhiCategory);//返回查询条件
		
		PageBean<ShouzhiCategory> pageBean=categoryManageService.findCategorys(shouzhiCategory,currentPage);//分页查询收支类别
		
		if(pageBean.getPageList().size()==0){//确保为空
			pageBean.setPageList(null);
		}
		model.addAttribute("pageBean", pageBean);//分页查询结果
		
		return "/admin/categoryManage.jsp";//收支分类结果
	}
	
	//ajax判断当前子类型是否存在
	@RequestMapping("/ajaxFindCategory.action")
	@ResponseBody
	public String ajaxFindCategory(ShouzhiCategory shouzhiCategory){//@RequestBody 
		ShouzhiCategory findCategory=categoryManageService.findCategory(shouzhiCategory);//判断当前子类型是否存在
		if(findCategory!=null){//已经存在
			return "{\"name\":\"yes\"}";//json格式		
		}
		return "{\"name\":\"no\"}";//json格式	
	}
	
	//添加收支类型
	@RequestMapping("/addCategory.action")
	public String addCategory(ShouzhiCategory shouzhiCategory,Integer currentPage){//添加后，仍旧返回当前页
		categoryManageService.insertCategory(shouzhiCategory);
		return "redirect:/categoryManage/findCategorys.action?currentPage="+currentPage;//重定向
	}
	
	//编辑收支类型页面
	@RequestMapping("/toEditPage.action")
	@ResponseBody
	public String toEditPage(Integer szcid){
		ShouzhiCategory shouzhiCategory=categoryManageService.queryShouzhiCategoryById(szcid);//通过id查询当前收支类型信息
		Map<String,Object> map=new HashMap<String,Object>();//数据放到map中
		map.put("shouzhiCategory", shouzhiCategory);
		map.put("old_son_category", shouzhiCategory.getSon_category());//保存原来的收支子类型名
		String js = JSON.toJSONString(map);//返回json串
		System.out.println("js:------"+js);
		return js;
	}
	
	//编辑收支类型信息
	@RequestMapping("/editShouzhiCategory.action")
	public String editShouzhiCategory(ShouzhiCategory shouzhiCategory,Integer currentPage2){
		categoryManageService.editShouzhiCategory(shouzhiCategory);
		return "redirect:/categoryManage/findCategorys.action?currentPage="+currentPage2;//当前页，在分页的时候进行了保存
	}
	
	//ajax判断是否可以删除当前收支子类型
	@RequestMapping("/ajaxConfirmDeleteShouzhiCategory.action")
	@ResponseBody
	public String ajaxConfirmDeleteShouzhiCategory(int szcid){  //注意，当前收支子类型存在外键时，不能进行删除
		//收支记录表 存在数据，都不能进行删除
		int count=categoryManageService.countShouzhiRecord(szcid);//收支记录
		if(count==0){
			//到了这里，说明可以删除数据
			return "{\"name\":\"yes\"}";//json格式
		}
		//到了这里说明不可以删除数据
		return "{\"name\":\"no\"}";//json格式
	}
	
	//删除收支类型信息
	@RequestMapping("/deleteShouzhiCategory.action")
	public String deleteShouzhiCategory(int szcid,Integer currentPage2){
		categoryManageService.deleteShouzhiCategory(szcid);//删除收支子类型
		
		//如果当前页，只有一条记录，删除后，应该返回上一页
		//每页记录是是10条，查询用户的总记录数
		int pageRecord=10;
		int count=categoryManageService.countShouzhiCategorys();//当前所有收支子类型记录数
		int allPage=0;//当前总页数
		if(count%pageRecord==0){
			allPage=count/pageRecord;
		}
		else{
			allPage=count/pageRecord+1;
		}
		allPage=allPage-1;
		
		if(currentPage2>allPage){
			currentPage2=currentPage2-1;//上一页
		}
		
		return "redirect:/categoryManage/findCategorys.action?currentPage="+currentPage2;//当前页，在分页的时候进行了保存
	}
	
	
}
