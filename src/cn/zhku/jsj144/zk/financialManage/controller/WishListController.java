package cn.zhku.jsj144.zk.financialManage.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;

import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.User;
import cn.zhku.jsj144.zk.financialManage.pojo.WishList;
import cn.zhku.jsj144.zk.financialManage.service.WishListService;

@Controller
@RequestMapping("/wishlist")   //访问路径是  /wishlist/xxx
public class WishListController {

	//注入WishListService
	@Autowired
	private WishListService wishListService;
	
	
	//查询所有心愿单
	@RequestMapping("/findAllWishList.action")
	public String findAllWishList(HttpServletRequest request,Integer currentPage,Model model){//分页查询currentPage
		User user=(User) request.getSession().getAttribute("user");
		
		PageBean<WishList> pageBean=wishListService.findAllWishList(user.getUid(),currentPage);
		
		if(pageBean.getPageList().size()==0){//确保为空
			pageBean.setPageList(null);
		}
		model.addAttribute("pageBean", pageBean);//分页查询结果
//		List<WishList> wishs=wishListService.findAllWishList(user.getUid(),currentPage);
//		model.addAttribute("wishs",wishs);
		
		return "/jsp/wishlist.jsp";
	}
	
	//添加心愿单
	@RequestMapping("/addWish.action")
	@ResponseBody
	public String addWish(WishList wishList){
		//获得yyyy-MM-dd格式的时间
//		Date dt = new Date();
//		String currentTime = null;
//		DateFormat dFormat = new SimpleDateFormat("yyyy-MM-dd"); 
//		currentTime = dFormat.format(dt);
//		System.out.println(currentTime);
		
		String currentTime = wishList.getWdate();
		String wid=null;//心愿单id
		//获取某人，某天的心愿单个数
		int count=wishListService.CountWishByTimeAndId(wishList);
		count=count+1;
		if(count+1<10){
			wid="心愿单"+currentTime+"-0"+count;
		}
		else{
			wid="心愿单"+currentTime+"-"+count;
		}
		String state="未完成";
		wishList.setWid(wid);
		wishList.setState(state);
		wishList.setWdate(currentTime);
		
		wishListService.addWish(wishList);//添加心愿单
		return "OK";
//		return "/wishlist/findAllWishList.action";//重新查询
	}
	
	//去心愿单页面，根据id查询心愿单信息
	@RequestMapping("/toEdit.action")
	@ResponseBody
	public String toEdit(Long id){
		//失败原因：mybatis中没有写返回值
		WishList findWishlist=wishListService.findWishById(id.intValue());//id为int类型
		String jsonString=JSON.toJSONString(findWishlist);//对象转为json
		System.out.println("jsonString:"+jsonString);
		return jsonString;
	}
	
	//编辑心愿单
	@RequestMapping("/editWish.action")
	@ResponseBody
	public void editWish(WishList wishList){
		String wid=null;//心愿单id
		String currentTime=wishList.getWdate();
		//获取某人，某天的心愿单个数
		int count=wishListService.CountWishByTimeAndId(wishList);
		count=count+1;
		if(count+1<10){
			wid="心愿单"+currentTime+"-0"+count;
		}
		else{
			wid="心愿单"+currentTime+"-"+count;
		}
		wishList.setWid(wid);
		wishListService.editWish(wishList);
		return;
	}
	
	//删除心愿单
	@RequestMapping("/deleteWish.action")
	@ResponseBody
	public void deleteWish(int id){
		wishListService.deleteWish(id);
		return;
	}
	
	
}
