package cn.zhku.jsj144.zk.financialManage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonAnyFormatVisitor;

import cn.zhku.jsj144.zk.financialManage.pojo.Admin;
import cn.zhku.jsj144.zk.financialManage.pojo.PageBean;
import cn.zhku.jsj144.zk.financialManage.pojo.ShouzhiRecord;
import cn.zhku.jsj144.zk.financialManage.pojo.User;
import cn.zhku.jsj144.zk.financialManage.service.AdminService;
import cn.zhku.jsj144.zk.financialManage.service.UserService;

@Controller
@RequestMapping("/userManage")
public class UserManageController {//用户管理

	@Autowired
	private UserService userService;//普通用户
	@Autowired
	private AdminService adminService;//后台管理员
	
	@RequestMapping("/login.action")
	public String login(Admin admin,HttpServletRequest request){//登录
		Admin findAdmin=adminService.findAdmin(admin);//后台登录
		if(findAdmin==null){
			request.setAttribute("msg", "登录失败,账号或密码错误");
			return "/admin/index.jsp";
		}
		request.getSession().setAttribute("admin", findAdmin);//保存到到session域对象中
		
		return "/userManage/findUsers.action";//分页查询显示用户列表
	}
	
	@RequestMapping("/logout.action")
	public String logout(HttpSession session){//退出登录
		session.removeAttribute("admin");//删除
		return "/admin/index.jsp";
	}
	
	
	
	@RequestMapping("/findUsers.action")
	public String findUsers(User user,Integer currentPage,Model model){//无条件分页查询+有条件分页查询
		//查询条件：用户民+邮箱+手机号   +  当前页 
		//当前页，默认情况下，currentPage=0   提交过来是第1页  

		//保存查询条件
		/*
		if(user!=null){
			if(user.getUsername()!=""){
				model.addAttribute("username_condition", user.getUsername());
			}
			if(user.getEmail()!=""){
				model.addAttribute("email_condition", user.getEmail());
			}
			if(user.getPhone()!=""){
				model.addAttribute("phone_condition", user.getPhone());
			}
		}
		*/
		model.addAttribute("findUser", user);
		
		PageBean<User> pageBean=userService.findUsers(user,currentPage);//分页查询用户列表
		if(pageBean.getPageList().size()==0){//确保为空
			pageBean.setPageList(null);
		}
		model.addAttribute("pageBean", pageBean);//分页查询结果
		
		return "/admin/main.jsp";//主页结果
	}
	
	
	
	//添加用户
	@RequestMapping("/addUser.action")
	public String addUser(User user,HttpServletRequest request){  //当前用户名不存在时，才可以进行用户的添加[前端进行校验]
		
		//插入时，添加自增主键，所以此时的User中是有主键id的，即：有完整的user表的信息
		userService.insertUser(user);
		return "redirect:/userManage/findUsers.action";//重定向
	}
	
	//编辑用户信息页面
	@RequestMapping("/toEditPage.action")
	@ResponseBody
	public String toEditPage(Integer uid){//Integer uid   String uid
//		Long id=Long.parseLong(uid);//类型
		User user=userService.queryUserById(uid);//id.intValue()
		
//		model.addAttribute("user", user);
		
		Map<String,Object> map=new HashMap<String,Object>();//数据放到map中
		map.put("user", user);
		map.put("old_username", user.getUsername());//保存原来的用户名
		
		String js = JSON.toJSONString(map);//返回json串
		System.out.println("js:------"+js);
		
		
		return js;//返回数据类型写错
		//return "js";写错
	}
	
	
	//编辑用户信息
	@RequestMapping("/editUser.action")
//	@ResponseBody
	public String editUser(User user,Integer currentPage2){
//		System.out.println("当前页："+currentPage2);
		userService.editUserAll(user);//编辑全部用户信息
//		return "ok";
//		return "redirect:/userManage/findUsers.action";
		return "redirect:/userManage/findUsers.action?currentPage="+currentPage2;//当前页，在分页的时候进行了保存
	}
	
	
	//ajax判断是否可以删除当前用户
	@RequestMapping("/ajaxConfirmDeleteUser.action")
	@ResponseBody
	public String ajaxConfirmDeleteUser(int uid){  //注意，当前用户存在外键时，不能进行删除
		//预算表  心愿单表   备忘录表   收支记录表 
		//任何一个表中，存在数据，都不能进行删除
		int count1=adminService.countShouzhiRecord(uid);//收支记录
		int count2=0;
		int count3=0;
		int count4=0;
		
		if(count1==0){
			count2=adminService.countBudget(uid);//预算记录
			if(count2==0){
				count3=adminService.countWishList(uid);//心愿单记录
				if(count3==0){
					count4=adminService.countMemorandum(uid);//备忘录记录
					if(count4==0){
						//到了这里，说明可以删除数据
						return "{\"name\":\"yes\"}";//json格式		
					}
				}
			}
		}
		//到了这里说明不可以删除数据
		return "{\"name\":\"no\"}";//json格式
	}
	
	//删除用户信息
	@RequestMapping("/deleteUser.action")
	public String deleteUser(int uid,Integer currentPage2){
		userService.deleteUser(uid);//删除用户
		
		//如果当前页，只有一条记录，删除后，应该返回上一页
		//每页记录是是10条，查询用户的总记录数
		int pageRecord=10;
		int count=userService.countUser();//当前所有用户总记录数
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
		
		return "redirect:/userManage/findUsers.action?currentPage="+currentPage2;//当前页，在分页的时候进行了保存
	}
	
}
