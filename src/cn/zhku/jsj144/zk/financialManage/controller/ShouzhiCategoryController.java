package cn.zhku.jsj144.zk.financialManage.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.zhku.jsj144.zk.financialManage.pojo.ShouzhiCategory;
import cn.zhku.jsj144.zk.financialManage.service.ShouzhiCategoryService;

@Controller
@RequestMapping("/shouzhiCategory")   //访问路径是  /shouzhiCategory/xxx
public class ShouzhiCategoryController {

	@Autowired
	private ShouzhiCategoryService shouzhiCategoryService;
	
	//添加收支类型
	@RequestMapping("addShouzhiCategory.action")
	@ResponseBody
	public String addShouzhiCategory(ShouzhiCategory shouzhiCategory){
		shouzhiCategoryService.addShouzhiCategory(shouzhiCategory);
		return "OK";
	}
	
	//ajax请求    收支子类型是否存在
	@RequestMapping("findsonCategoryByNameAndAjax.action")
	@ResponseBody
	public String findsonCategoryByNameAndAjax(String son_category){
		ShouzhiCategory result = shouzhiCategoryService.findCategoryBySonCategory(son_category);
		if(result!=null){
			return "{\"name\":\"exit\"}";//json格式
		}
		else{
			return "{\"name\":\"notexit\"}";//不存在
		}
	}
}
